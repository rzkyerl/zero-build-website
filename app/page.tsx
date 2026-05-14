import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import MarqueeStrip from "@/components/sections/marquee-strip";
import BelowFold from "@/components/sections/below-fold";

// Tell Next.js this page is fully static — eliminates cold-start TTFB
export const dynamic = "force-static";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Zero",
    url: "https://www.zero-build.site",
    description:
      "Compress photos instantly in your browser — no upload, fully private. Videos processed via secure cloud. Optimized presets for Instagram, WhatsApp, and more.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Photo compression in browser",
      "Video compression via cloud",
      "Instagram preset",
      "WhatsApp preset",
      "Custom target size",
      "No account required",
      "No upload for photos",
    ],
    creator: {
      "@type": "Organization",
      name: "CTRLBuild",
      url: "https://www.zero-build.site",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MarqueeStrip />
        <BelowFold />
      </main>
      <Footer />
    </>
  );
}
