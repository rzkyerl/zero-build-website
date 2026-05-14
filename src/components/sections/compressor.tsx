"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import UploadBox from "@/components/sections/upload-box";
import PresetSelector from "@/components/sections/preset-selector";
import Processing from "@/components/sections/processing";
import ResultPanel from "@/components/sections/result-panel";
import { useFile } from "@/hooks/use-file";
import { useProcessing } from "@/hooks/use-processing";
import { useUpload } from "@/features/uploader/use-upload";
import type { CompressResult } from "@/types/file";
import type { PresetId } from "@/types/preset";

/* ── Disclaimer box shown before upload ─────────────────── */
function Disclaimer() {
  const items = [
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
        </svg>
      ),
      label: "Photo",
      specs: [
        { k: "Input",   v: "JPG, PNG, WebP" },
        { k: "Output",  v: "JPG / WebP / PNG" },
        { k: "Max",     v: "20 MB" },
        { k: "Speed",   v: "Instant" },
      ],
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      ),
      label: "Video",
      specs: [
        { k: "Input",   v: "MP4" },
        { k: "Output",  v: "MP4 · H.264" },
        { k: "Max",     v: "100 MB" },
        { k: "Speed",   v: "~30s–2 min" },
        { k: "Engine",  v: "Secure cloud API" },
      ],
    },
  ];

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--fg-3)" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Before you start
        </span>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-2" style={{ background: "var(--bg)" }}>
        {items.map((item, col) => (
          <div
            key={item.label}
            className="px-5 py-4"
            style={col === 0 ? { borderRight: "1px solid var(--border)" } : {}}
          >
            {/* Type label */}
            <div
              className="flex items-center gap-2 mb-4"
              style={{ color: "var(--fg-2)" }}
            >
              {item.icon}
              <span className="text-xs font-semibold">{item.label}</span>
            </div>

            {/* Spec rows */}
            <div className="space-y-2">
              {item.specs.map(({ k, v }) => (
                <div key={k} className="flex items-baseline justify-between gap-3">
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.05em", flexShrink: 0 }}>
                    {k}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--fg-2)", textAlign: "right", lineHeight: 1.4 }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div
        className="px-5 py-3 flex items-center justify-between gap-4"
        style={{ borderTop: "1px solid var(--border)", background: "rgba(255,255,255,0.015)" }}
      >
        <p style={{ fontSize: 11, color: "var(--fg-3)", lineHeight: 1.5 }}>
          Photos compressed locally — videos via secure cloud. No account needed.
        </p>
        <a
          href="#download"
          onClick={(e) => { e.preventDefault(); document.getElementById("download")?.scrollIntoView({ behavior: "smooth" }); }}
          className="flex-shrink-0 text-xs font-medium transition-colors duration-150"
          style={{ color: "var(--fg-3)", textDecoration: "underline", textUnderlineOffset: 3 }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--fg-2)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--fg-3)")}
        >
          Get Android app →
        </a>
      </div>
    </div>
  );
}

/* ── Error state ─────────────────────────────────────────── */
function ErrorState({ message, onReset }: { message: string; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center scale-in">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.15)" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,100,100,0.7)" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p className="text-sm font-medium mb-2" style={{ color: "var(--fg-2)" }}>Compression failed</p>
      <p className="text-xs mb-6 max-w-xs leading-relaxed" style={{ color: "var(--fg-3)" }}>{message}</p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-95"
        style={{ border: "1px solid var(--border)", color: "var(--fg-2)" }}
      >
        Try Again
      </button>
    </div>
  );
}

import type { ImageFormat } from "@/features/compressor/compress-image";

/* ── Main compressor ─────────────────────────────────────── */
export default function Compressor() {
  const [dragOver, setDragOver] = useState(false);
  const [preset, setPreset]     = useState<PresetId>("smart");
  const [quality, setQuality]   = useState(75);
  const [format, setFormat]     = useState<ImageFormat>("jpeg");
  const [result, setResult]     = useState<CompressResult | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { fileInfo, setFileInfo, clearFile } = useFile();

  const handleComplete = useCallback((r: CompressResult) => setResult(r), []);

  const { appState, setAppState, progress, statusMsg, error, timeLeft, start, reset, circumference, strokeDashoffset } =
    useProcessing({ fileInfo, preset, quality, format, onComplete: handleComplete });

  const { onDrop, onInputChange } = useUpload({
    onFile: (info) => { setFileInfo(info); setAppState("file-selected"); setResult(null); },
    onError: (msg) => alert(msg),
  });

  const handleReset = () => {
    if (result) URL.revokeObjectURL(result.url);
    clearFile();
    reset();
    setResult(null);
  };

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        setTimeout(() => {
          e.target.querySelectorAll<HTMLElement>(".mask").forEach((m, i) => setTimeout(() => m.classList.add("in"), i * 80));
          e.target.querySelectorAll<HTMLElement>(".fade-up").forEach((m, i) => setTimeout(() => m.classList.add("in"), 80 + i * 60));
        }, 50);
        obs.unobserve(e.target);
      }),
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const isProcessing = appState === "processing" || appState === "loading-ffmpeg";

  return (
    <section id="upload" ref={sectionRef} style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", contentVisibility: "auto", containIntrinsicSize: "0 900px" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-24">

        {/* Section header */}
        <div className="flex items-start justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                02 — Compressor
              </span>
            </div>
            <h2 className="mask font-bold" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--fg)" }}>
              <span className="mask__inner">Start Compressing</span>
            </h2>
          </div>
          <p className="fade-up hidden md:block max-w-xs text-sm leading-relaxed" style={{ color: "var(--fg-2)", paddingTop: 4 }}>
            Hybrid compression — photos run in your browser, videos via secure cloud. No account, no limits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Left — tool */}
          <div className="fade-up d2 space-y-3">

            {/* Disclaimer — only show when idle */}
            {(appState === "idle" || appState === "file-selected") && (
              <Disclaimer />
            )}

            {(appState === "idle" || appState === "file-selected") && (
              <>
                <UploadBox
                  fileInfo={fileInfo}
                  onDrop={onDrop}
                  onInputChange={onInputChange}
                  onClear={() => { clearFile(); reset(); }}
                  dragOver={dragOver}
                  onDragOver={() => setDragOver(true)}
                  onDragLeave={() => setDragOver(false)}
                />
                <PresetSelector
                  selected={preset}
                  quality={quality}
                  format={format}
                  isVideo={fileInfo?.isVideo}
                  onSelect={setPreset}
                  onQualityChange={setQuality}
                  onFormatChange={setFormat}
                />
                <button
                  onClick={start}
                  disabled={!fileInfo}
                  className="w-full py-4 rounded-2xl text-sm font-semibold transition-all duration-300 active:scale-[0.98] disabled:opacity-25 disabled:cursor-not-allowed"
                  style={{
                    background: fileInfo ? "var(--fg)" : "rgba(255,255,255,0.05)",
                    color: fileInfo ? "#000" : "var(--fg-3)",
                    border: fileInfo ? "none" : "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) => { if (!fileInfo) return; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 32px rgba(255,255,255,0.18)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
                >
                  Optimize Now
                </button>
              </>
            )}

            {isProcessing && (
              <Processing
                progress={progress}
                circumference={circumference}
                strokeDashoffset={strokeDashoffset}
                statusMsg={statusMsg}
                isLoadingFFmpeg={appState === "loading-ffmpeg"}
                timeLeft={timeLeft}
                isVideo={fileInfo?.isVideo}
              />
            )}

            {appState === "error" && (
              <ErrorState message={error ?? "Unknown error"} onReset={handleReset} />
            )}

            {appState === "done" && fileInfo && result && (
              <ResultPanel fileInfo={fileInfo} result={result} onReset={handleReset} />
            )}
          </div>

          {/* Right — how it works */}
          <div className="fade-up d3 hidden lg:block">
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
              <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>
                How it works
              </p>
              <div className="space-y-0">
                {[
                  { n: "01", title: "Upload", desc: "Drop a JPG, PNG, WebP, or MP4 file. Photos never leave your device." },
                  { n: "02", title: "Select Preset", desc: "Choose Instagram, WhatsApp, Smart Auto, or set a custom target size." },
                  { n: "03", title: "Optimize", desc: "Photos: Canvas API in your browser. Videos: processed via secure cloud API." },
                  { n: "04", title: "Download", desc: "Save the compressed file to your device. Done." },
                ].map((step) => (
                  <div key={step.n} className="flex gap-5 py-5 group" style={{ borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.1em", paddingTop: 2, flexShrink: 0 }}>
                      {step.n}
                    </span>
                    <div>
                      <div className="text-sm font-semibold mb-1 transition-colors duration-200 group-hover:text-white" style={{ color: "var(--fg-2)" }}>
                        {step.title}
                      </div>
                      <div className="text-xs leading-relaxed" style={{ color: "var(--fg-3)" }}>
                        {step.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
