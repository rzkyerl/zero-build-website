"use client";

import dynamic from "next/dynamic";

// Below-fold sections — lazy loaded to keep initial JS bundle small
const Compressor = dynamic(() => import("@/components/sections/compressor"), { ssr: false });
const Features   = dynamic(() => import("@/components/sections/features"),   { ssr: false });
const About      = dynamic(() => import("@/components/sections/about"),      { ssr: false });
const Download   = dynamic(() => import("@/components/sections/download"),   { ssr: false });

export default function BelowFold() {
  return (
    <>
      <Compressor />
      <Features />
      <About />
      <Download />
    </>
  );
}
