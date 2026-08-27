/**
 * SecureStorage — tamper-evident wrapper around localStorage.
 *
 * WHY (OWASP MASVS-STORAGE): on rooted devices, plain localStorage JSON is
 * trivially editable — a user can grant themselves 9999 points or forge a C2
 * certificate. This layer:
 *
 *   1. Obfuscates payloads (XOR stream keyed by a build-time secret + key id)
 *      so values are not human-readable / greppable in backups.
 *   2. Appends an HMAC-style checksum (FNV-1a based) over
 *      `<key>|<version>|<ciphertext>` — editing ANY byte invalidates it.
 *   3. On read, verifies integrity first; if the check fails or the payload is
 *      malformed, the value is treated as absent and wiped (fail-closed).
 *   4. Transparently migrates legacy plaintext values written by older builds.
 *
 * NOTE: this is client-side tamper *evidence*, not cryptographic secrecy —
 * a determined attacker with the APK can extract the XOR key. The real defense
 * for high-value data is server-side validation; this raises the bar for
 * casual cheat edits and satisfies MASVS-STORAGE-1 for offline-only progress.
 */

const KEY_ID = "v1";
/** Build-time obfuscation secret. Rotate when shipping a new major version. */
const SECRET = "SpeakUp::GM::7f3a91c4::do-not-ship-plaintext";

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                 */
/* -------------------------------------------------------------------------- */

/** FNV-1a 32-bit → hex string. Fast, dependency-free, stable across engines. */
function fnv1a(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

/**
 * Derive a per-key XOR pad from SECRET + storage key so that identical
 * plaintexts under different keys produce different ciphertexts.
 */
function padFor(key: string, length: number): Uint8Array {
  const out = new Uint8Array(length);
  let seedStr = fnv1a(`${SECRET}:${key}`);
  for (let i = 0; i < length; i++) {
    // Refresh the seed block every 8 bytes (hex chars consumed two at a time).
    if (i % 8 === 0) seedStr = fnv1a(`${seedStr}:${i}`);
    out[i] = parseInt(seedStr.slice((i % 8) * 2, (i % 8) * 2 + 2), 16) ^ SECRET.charCodeAt(i % SECRET.length);
  }
  return out;
}

function xor(key: string, text: string): string {
  const bytes = new TextEncoder().encode(text);
  const pad = padFor(key, bytes.length);
  const out = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) out[i] = bytes[i] ^ pad[i];
  // Binary-safe transport via percent-encoded latin1.
  let s = "";
  for (const b of out) s += String.fromCharCode(b);
  return encodeURIComponent(s);
}

function unxor(key: string, encoded: string): string | null {
  try {
    const raw = decodeURIComponent(encoded);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    const pad = padFor(key, bytes.length);
    const out = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) out[i] = bytes[i] ^ pad[i];
    return new TextDecoder().decode(out);
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*  Public API (createJSONStorage-compatible)                                  */
/* -------------------------------------------------------------------------- */

function storageAvailable(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

export function secureGetItem(name: string): string | null {
  if (!storageAvailable()) return null;
  const wrapped = window.localStorage.getItem(`sec:${name}`);
  if (!wrapped) {
    // Legacy migration: older builds wrote plaintext under `name`.
    const legacy = window.localStorage.getItem(name);
    if (legacy !== null) {
      try {
        // Validate as JSON before migrating — garbage never migrates.
        JSON.parse(legacy);
      } catch {
        window.localStorage.removeItem(name);
        return null;
      }
      secureSetItem(name, legacy); // re-wrap securely
      return legacy;
    }
    return null;
  }

  const sep = wrapped.indexOf("|");
  if (sep < 0) {
    window.localStorage.removeItem(`sec:${name}`);
    return null;
  }
  const mac = wrapped.slice(0, sep);
  const cipher = wrapped.slice(sep + 1);

  // Integrity check over key|version|ciphertext.
  if (fnv1a(`${name}|${KEY_ID}|${cipher}`) !== mac) {
    console.warn("[security] Tampered local storage detected — resetting:", name);
    window.localStorage.removeItem(`sec:${name}`);
    return null;
  }

  const plain = unxor(`${SECRET}:${name}`, cipher);
  if (plain === null) {
    window.localStorage.removeItem(`sec:${name}`);
    return null;
  }

  // Fail-closed: must be valid JSON (all Zustand persist payloads are).
  try {
    JSON.parse(plain);
  } catch {
    console.warn("[security] Corrupt payload discarded:", name);
    window.localStorage.removeItem(`sec:${name}`);
    return null;
  }
  return plain;
}

export function secureSetItem(name: string, value: string): void {
  if (!storageAvailable()) return;
  const cipher = xor(`${SECRET}:${name}`, value);
  const mac = fnv1a(`${name}|${KEY_ID}|${cipher}`);
  window.localStorage.setItem(`sec:${name}`, `${mac}|${cipher}`);
}

export function secureRemoveItem(name: string): void {
  if (!storageAvailable()) return;
  window.localStorage.removeItem(`sec:${name}`);
  window.localStorage.removeItem(name); // clean legacy remnants too
}

/**
 * Zustand `StateStorage` adapter — plug into createJSONStorage(() => secureStorage)
 * so every persisted store goes through the tamper-evident seal automatically.
 */
export const secureStorage = {
  getItem: secureGetItem,
  setItem: secureSetItem,
  removeItem: secureRemoveItem,
};
