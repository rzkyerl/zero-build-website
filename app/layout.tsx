import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import ClientChrome from "@/components/ui/client-chrome";

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
    default: "Zero — Free Online Photo & Video Compressor",
    template: "%s | Zero",
  },
  description:
    "Compress foto dan video secara gratis, cepat, dan privat. Compress foto langsung di browser tanpa upload — compress video via cloud. Preset Instagram, WhatsApp, dan lebih banyak lagi.",

  keywords: [
    // Primary — exact match queries
    "compress foto",
    "compress foto online",
    "compress foto gratis",
    "compress video",
    "compress video online",
    "compress video gratis",
    "compress gambar",
    "compress gambar online",
    // English equivalents
    "compress photo",
    "compress photo online",
    "photo compressor",
    "compress photo for free",
    "video compressor",
    "compress video for free",
    "online video compressor",
    "image compressor",
    "online image compressor",
    "reduce image size",
    "reduce video size",
    "reduce file size",
    // Platform-specific
    "compress foto instagram",
    "compress foto whatsapp",
    "compress video whatsapp",
    "compress video instagram",
    "instagram image optimizer",
    "whatsapp photo compressor",
    // Tool/context
    "browser image compressor",
    "no upload compressor",
    "private photo compressor",
    "free media compressor",
    "zero compress",
    "zero build",
  ],

  authors: [{ name: "CTRLBuild", url: "https://www.zero-build.site" }],
  creator: "CTRLBuild",
  publisher: "CTRLBuild",

  // Open Graph
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Zero",
    title: "Zero — Free Online Photo & Video Compressor",
    description:
      "Compress foto dan video secara gratis — foto diproses langsung di browser (no upload), video via secure cloud. Preset siap untuk Instagram, WhatsApp, dan lebih banyak lagi.",
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
    title: "Zero — Free Online Photo & Video Compressor",
    description:
      "Compress foto gratis di browser — tanpa upload, 100% privat. Compress video via secure cloud. Cepat, tajam, siap untuk semua platform.",
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
        <ClientChrome />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
