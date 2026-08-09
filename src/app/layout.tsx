import type { Metadata, Viewport } from "next";
import { Vazirmatn, Geist_Mono } from "next/font/google";
import "./globals.css";

/**
 * Vazirmatn — modern Persian/Arabic-script font with full latin coverage.
 * Loaded via next/font so it self-hosts and works offline (Capacitor/APK-ready).
 */
const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SpeakUp — تمرین زبان با هوش مصنوعی",
    template: "%s | SpeakUp",
  },
  description:
    "اپلیکیشن هوشمند آموزش و تمرین زبان: مکالمه صوتی و متنی با هوش مصنوعی در سناریوهای واقعی، همراه با اصلاحات لحظه‌ای گرامر و تلفظ.",
  applicationName: "SpeakUp",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SpeakUp",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  // Mobile-first: prevent zoom, fit to viewport for Capacitor packaging.
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
