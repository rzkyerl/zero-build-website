import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Cursor from "@/components/ui/cursor";
import Noise from "@/components/ui/noise";
import PageLoader from "@/components/ui/page-loader";
import ScrollProgress from "@/components/ui/scroll-progress";
import SmoothScroll from "@/components/ui/smooth-scroll";
import ChatWidget from "@/components/ui/chat-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const BASE_URL = "https://www.zero-build.site";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Zero — Compress. Stay Sharp.",
    template: "%s | Zero",
  },
  description:
    "Compress photos instantly in your browser — no upload, fully private. Videos processed via secure cloud. Optimized presets for Instagram, WhatsApp, and more.",

  keywords: [
    "image compressor",
    "video compressor",
    "compress photo",
    "compress video",
    "instagram optimizer",
    "whatsapp video compress",
    "online image compression",
    "browser image compressor",
    "no upload compressor",
    "private media compressor",
    "reduce file size",
    "social media optimizer",
  ],

  authors: [{ name: "CTRLBuild", url: "https://www.zero-build.site" }],
  creator: "CTRLBuild",
  publisher: "CTRLBuild",

  // Open Graph
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Zero",
    title: "Zero — Compress. Stay Sharp.",
    description:
      "Compress photos instantly in your browser — no upload, fully private. Videos processed via secure cloud. Optimized for Instagram, WhatsApp, and more.",
    images: [
      {
        url: "/zero-logo.png",
        width: 512,
        height: 512,
        alt: "Zero — Media Compressor",
      },
    ],
    locale: "en_US",
  },

  // Twitter / X
  twitter: {
    card: "summary",
    title: "Zero — Compress. Stay Sharp.",
    description:
      "Compress photos instantly in your browser — no upload, fully private. Videos processed via secure cloud.",
    images: ["/zero-logo.png"],
    creator: "@ctrlbuild",
  },

  // Canonical & robots
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: [
      { url: "/zero-logo.png", type: "image/png" },
    ],
    apple: "/zero-logo.png",
    shortcut: "/zero-logo.png",
  },

  // App manifest
  manifest: "/manifest.json",

  // Category
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white">
        <SmoothScroll />
        <PageLoader />
        <ScrollProgress />
        <Noise />
        <Cursor />
        {children}
        <ChatWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
