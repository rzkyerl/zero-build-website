import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/cursor";
import Noise from "@/components/ui/noise";
import PageLoader from "@/components/ui/page-loader";
import ScrollProgress from "@/components/ui/scroll-progress";
import SmoothScroll from "@/components/ui/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zero — Compress. Stay Sharp.",
  description:
    "Optimize your photos and videos for social media directly in your browser. No upload, no account, 100% private.",
  icons: {
    icon: "/zero-logo.png",
    apple: "/zero-logo.png",
  },
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
      </body>
    </html>
  );
}
