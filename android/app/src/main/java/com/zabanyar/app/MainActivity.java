package com.zabanyar.app;

import android.os.Bundle;
import android.webkit.WebSettings;

import com.getcapacitor.BridgeActivity;

/**
 * ZabanYar MainActivity.
 *
 * Unlocks audio playback inside the WebView:
 *  - setMediaPlaybackRequiresUserGesture(false): allows programmatic audio
 *    (streamed TTS / SpeechSynthesis) to start without a prior touch.
 *  - setJavaScriptCanOpenWindowsAutomatically(true): lets the TTS/audio
 *    bridges open their playback surfaces freely.
 *
 * SECURITY NOTE (OWASP): file/URL access switches intentionally stay at
 * their safe defaults (false) — only the media-playback gate is lifted.
 */
public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (this.bridge != null && this.bridge.getWebView() != null) {
            WebSettings settings = this.bridge.getWebView().getSettings();
            settings.setMediaPlaybackRequiresUserGesture(false);
            settings.setJavaScriptCanOpenWindowsAutomatically(true);
        }
    }
}
