import type { Metadata, Viewport } from "next";
import { Vazirmatn, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
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
    default: "ZabanYar — تمرین زبان با هوش مصنوعی",
    template: "%s | ZabanYar",
  },
  description:
    "اپلیکیشن هوشمند آموزش و تمرین زبان انگلیسی از A0 تا C2: مکالمه صوتی با هوش مصنوعی، پادکست‌های دوزبانه، آزمون جامع استادی و گواهی تسلط.",
  applicationName: "ZabanYar",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ZabanYar",
  },
  icons: {
    icon: [{ url: "/logo.jpg", type: "image/jpeg" }],
    apple: [{ url: "/logo.jpg" }],
  },
  openGraph: {
    title: "ZabanYar — تمرین زبان با هوش مصنوعی",
    description:
      "مکالمه صوتی با AI، پادکست دوزبانه، آزمون استادی و گواهی CEFR — از الفبا تا تسلط کامل.",
    siteName: "ZabanYar",
    type: "website",
    images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "ZabanYar" }],
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
      data-scroll-behavior="smooth"
      className={`${vazirmatn.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Content-Security-Policy — mirrors the HTTP header set in next.config.ts.
          Critical inside the Capacitor WebView (static export ships no HTTP
          headers), where this meta tag is the only CSP enforcement surface.
        */}
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://api.openai.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
