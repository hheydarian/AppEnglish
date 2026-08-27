# ============================================================
# SpeakUp — ProGuard / R8 security rules (release hardening)
# ============================================================
#
# Goal: aggressive obfuscation & shrinking of app code while
# PRESERVING the Capacitor ↔ native JS bridge and WebView surface.
# If the bridge breaks, the white screen of death follows — keep it.

# ---------------- Capacitor bridge (MUST KEEP) ----------------

# Capacitor core: plugin/method annotations are resolved reflectively via
# the WebView bridge — never rename or strip members.
-keep class com.getcapacitor.** { *; }
-keep public class * extends com.getcapacitor.CapacitorPlugin
-keep public class * extends com.getcapacitor.Plugin
-keep @com.getcapacitor.annotation.CapacitorPlugin class *
-keepclassmembers class * {
    @com.getcapacitor.annotation.PluginMethod <methods>;
    @com.getcapacitor.annotation.PermissionCallback <methods>;
}
-keep class com.getcapacitor.annotation.** { *; }

# Cordova compatibility layer (used by capacitor-cordova-android-plugins).
-keep class org.apache.cordova.** { *; }
-dontwarn org.apache.cordova.**

# AndroidX / AppCompat — reflection inside support libs.
-keep class androidx.appcompat.** { *; }
-keep class androidx.core.** { *; }
-keep class androidx.coordinatorlayout.** { *; }
-keep class androidx.core.splashscreen.** { *; }
-dontwarn androidx.**

# Google services warnings are harmless when the file is absent.
-dontwarn com.google.android.gms.**
-dontwarn com.google.android.material.**

# ---------------- Aggressive obfuscation for our code --------------

# MainActivity is referenced from AndroidManifest by name — keep it.
-keep class com.speakup.app.MainActivity { *; }

# Strip every Log call at build time (MASVS-CODE: no sensitive logging).
-assumenosideeffects class android.util.Log {
    public static *** v(...);
    public static *** d(...);
    public static *** i(...);
    public static *** w(...);
    public static *** e(...);
    public static *** wtf(...);
}

# Remove println-based debug output too.
-assumenosideeffects class java.lang.System {
    public static void out(**);
    public static void err(**);
}

# Keep stack traces usable post-crash but hide original filenames.
-renamesourcefileattribute SourceFile
-keepattributes SourceFile,LineNumberTable

# Harder to decompile: repack into one shallow package + name mangling.
-repackageclasses 'speakup'
-allowaccessmodification
-overloadaggressively

# WebView JavaScript interfaces must retain their @JavascriptInterface methods.
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Reflection-safe defaults for Parcelable / Serializable / Enums.
-keepclassmembers class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator CREATOR;
}
-keepclassmembers class * implements java.io.Serializable {
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
}
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}
