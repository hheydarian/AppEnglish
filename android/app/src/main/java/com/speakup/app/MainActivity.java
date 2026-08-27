package com.speakup.app;

import android.os.Bundle;
import android.webkit.WebSettings;

import com.getcapacitor.BridgeActivity;

/**
 * SpeakUp MainActivity — WebView hardening (OWASP MASVS-PLATFORM-WEBVIEW).
 *
 * Locks down every dangerous WebView file/URL switch before the Capacitor
 * bridge loads the bundled app:
 *   - allowFileAccessFromFileURLs / allowUniversalAccessFromFileURLs = false
 *     → JS running in the WebView can NEVER read local device files.
 *   - allowContentAccess = false
 *     → content:// URIs are refused, blocking data exfiltration via providers.
 */
public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        bridge.getWebView().post(() -> {
            WebSettings ws = bridge.getWebView().getSettings();
            ws.setAllowFileAccess(false);
            ws.setAllowFileAccessFromFileURLs(false);
            ws.setAllowUniversalAccessFromFileURLs(false);
            ws.setAllowContentAccess(false);
        });
    }
}
