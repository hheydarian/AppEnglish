/**
 * generate-launcher-icons.mjs
 *
 * Generates Android launcher icons (square + round) for all densities from
 * public/logo.jpg using sharp (already available via Next.js deps).
 *
 * Usage: node scripts/generate-launcher-icons.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SOURCE = path.resolve("public/logo.jpg");
const RES = path.resolve("android/app/src/main/res");

// Official Android launcher icon densities (dp → px @48dp baseline).
const DENSITIES = {
  "mipmap-mdpi": 48,
  "mipmap-hdpi": 72,
  "mipmap-xhdpi": 96,
  "mipmap-xxhdpi": 144,
  "mipmap-xxxhdpi": 192,
};

async function generate() {
  await mkdir(SOURCE, { recursive: true }).catch(() => {});
  const src = sharp(SOURCE).rotate(); // respect EXIF orientation

  for (const [dir, size] of Object.entries(DENSITIES)) {
    const outDir = path.join(RES, dir);
    await mkdir(outDir, { recursive: true });

    // Square launcher icon — cover-crop to square, then resize.
    const square = src
      .clone()
      .resize(size, size, { fit: "cover", position: "centre" })
      .png({ compressionLevel: 9 });
    await square.toFile(path.join(outDir, "ic_launcher.png"));

    // Round launcher icon — circle mask via SVG composite.
    const radius = size / 2;
    const circleMask = Buffer.from(
      `<svg width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius}" fill="#fff"/></svg>`
    );
    const round = await src
      .clone()
      .resize(size, size, { fit: "cover", position: "centre" })
      .composite([{ input: circleMask, blend: "dest-in" }])
      .png({ compressionLevel: 9 })
      .toBuffer();
    await sharp(round).toFile(path.join(outDir, "ic_launcher_round.png"));

    console.log(`✓ ${dir}: ic_launcher.png + ic_launcher_round.png (${size}px)`);
  }

  console.log("\n✅ All launcher icons generated from public/logo.jpg");
}

generate().catch((err) => {
  console.error("Icon generation failed:", err);
  process.exit(1);
});
