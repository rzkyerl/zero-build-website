import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import MarqueeStrip from "@/components/sections/marquee-strip";
import Compressor from "@/components/sections/compressor";
import Features from "@/components/sections/features";
import About from "@/components/sections/about";
import Download from "@/components/sections/download";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MarqueeStrip />
        <Compressor />
        <Features />
        <About />
        <Download />
      </main>
      <Footer />
    </>
  );
}
