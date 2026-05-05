import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Compressor from "@/components/sections/compressor";
import Features from "@/components/sections/features";
import About from "@/components/sections/about";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Compressor />
        <Features />
        <About />
      </main>
      <Footer />
    </>
  );
}
