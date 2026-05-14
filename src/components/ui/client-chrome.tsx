"use client";

import dynamic from "next/dynamic";

// All decorative/interactive chrome — client-only, never blocks SSR paint
const Cursor         = dynamic(() => import("@/components/ui/cursor"),          { ssr: false });
const PageLoader     = dynamic(() => import("@/components/ui/page-loader"),     { ssr: false });
const SmoothScroll   = dynamic(() => import("@/components/ui/smooth-scroll"),   { ssr: false });
const ChatWidget     = dynamic(() => import("@/components/ui/chat-widget"),     { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ui/scroll-progress"), { ssr: false });
const Noise          = dynamic(() => import("@/components/ui/noise"),           { ssr: false });

export default function ClientChrome() {
  return (
    <>
      <SmoothScroll />
      <PageLoader />
      <ScrollProgress />
      <Noise />
      <Cursor />
      <ChatWidget />
    </>
  );
}
