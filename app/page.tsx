import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import MarqueeStrip from "@/components/sections/marquee-strip";
import BelowFold from "@/components/sections/below-fold";

// Tell Next.js this page is fully static — eliminates cold-start TTFB
export const dynamic = "force-static";

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Zero",
      alternateName: [
        "Zero Compress",
        "Zero Build",
        "Zero Photo Compressor",
        "Zero Video Compressor",
        "Compress Foto Online",
        "Compress Video Online",
      ],
      url: "https://www.zero-build.site",
      description:
        "Zero adalah aplikasi compress foto dan video gratis secara online. Compress foto langsung di browser tanpa upload — 100% privat. Compress video via secure cloud untuk kualitas maksimal. Preset siap untuk Instagram, WhatsApp, dan platform lainnya.",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web, Android, iOS",
      inLanguage: ["en", "id"],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Free online photo and video compressor",
      },
      featureList: [
        "Compress foto online gratis",
        "Compress video online gratis",
        "Compress gambar tanpa upload",
        "Photo compression in browser — no upload",
        "Video compression via secure cloud",
        "Compress foto untuk Instagram",
        "Compress foto untuk WhatsApp",
        "Compress video untuk WhatsApp",
        "Instagram photo preset",
        "WhatsApp video preset",
        "Custom target file size",
        "No account or login required",
        "No data collection — fully private",
        "Reduce image file size online",
        "Reduce video file size online",
      ],
      creator: {
        "@type": "Organization",
        name: "CTRLBuild",
        url: "https://www.zero-build.site",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Zero — Free Photo & Video Compressor",
      alternateName: "Zero Compress",
      url: "https://www.zero-build.site",
      description:
        "Compress foto dan video gratis, cepat, dan privat. Browser-based photo compressor dan cloud video compressor.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.zero-build.site/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <>
      {/* JSON-LD: WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd[0]) }}
      />
      {/* JSON-LD: WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd[1]) }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MarqueeStrip />
        <BelowFold />
      </main>
      {/* Accessible SEO content — visible to screen readers & crawlers, visually hidden */}
      <section
        aria-label="About Zero Compressor"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        <h2>Compress Foto Online Gratis</h2>
        <p>
          Zero adalah tools compress foto online gratis yang bekerja langsung di browser.
          Tidak perlu upload ke server — compress foto sepenuhnya privat dan instan.
          Cocok untuk compress foto Instagram, compress foto WhatsApp, dan semua platform media sosial.
        </p>
        <h2>Compress Video Online Gratis</h2>
        <p>
          Compress video secara online dengan kualitas terbaik menggunakan cloud processing.
          Zero mendukung compress video untuk WhatsApp, compress video untuk Instagram,
          dan reduce ukuran file video dengan cepat tanpa kehilangan kualitas berarti.
        </p>
        <h2>Compress Gambar Tanpa Upload</h2>
        <p>
          Compress gambar online tanpa perlu upload file ke server. Privasi terjaga 100%.
          Dukung format JPEG, PNG, dan WebP. Reduce file size foto secara otomatis.
        </p>
      </section>
      <Footer />
    </>
  );
}
