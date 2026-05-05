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
  return (
    <div
      className="rounded-2xl p-5 space-y-4"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--fg-3)" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Before you start
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Image info */}
        <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-3">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--fg-2)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-xs font-semibold" style={{ color: "var(--fg-2)" }}>Photo</span>
          </div>
          <ul className="space-y-1.5">
            {[
              "Input: JPG, PNG, WebP",
              "Output: JPG (re-encoded)",
              "Max recommended: 20 MB",
              "Speed: instant",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span style={{ color: "var(--fg-3)", marginTop: 1 }}>·</span>
                <span style={{ fontSize: 11, color: "var(--fg-3)", lineHeight: 1.5 }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Video info */}
        <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2 mb-3">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--fg-2)" strokeWidth="1.5">
              <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <span className="text-xs font-semibold" style={{ color: "var(--fg-2)" }}>Video</span>
          </div>
          <ul className="space-y-1.5">
            {[
              "Input: MP4",
              "Output: MP4 (H.264)",
              "Max recommended: 100 MB",
              "Speed: ~1–3 min (browser)",
              "First run loads FFmpeg (~20 MB)",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span style={{ color: "var(--fg-3)", marginTop: 1 }}>·</span>
                <span style={{ fontSize: 11, color: "var(--fg-3)", lineHeight: 1.5 }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p style={{ fontSize: 11, color: "var(--fg-3)", lineHeight: 1.6 }}>
        All processing runs <span style={{ color: "var(--fg-2)" }}>entirely in your browser</span> — no files are uploaded to any server.
        For faster video compression, use the{" "}
        <a
          href="#download"
          onClick={(e) => { e.preventDefault(); document.getElementById("download")?.scrollIntoView({ behavior: "smooth" }); }}
          style={{ color: "var(--fg-2)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          Android app
        </a>.
      </p>
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

/* ── Main compressor ─────────────────────────────────────── */
export default function Compressor() {
  const [dragOver, setDragOver] = useState(false);
  const [preset, setPreset]     = useState<PresetId>("smart");
  const [quality, setQuality]   = useState(75);
  const [result, setResult]     = useState<CompressResult | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { fileInfo, setFileInfo, clearFile } = useFile();

  const handleComplete = useCallback((r: CompressResult) => setResult(r), []);

  const { appState, setAppState, progress, statusMsg, error, start, reset, circumference, strokeDashoffset } =
    useProcessing({ fileInfo, preset, quality, onComplete: handleComplete });

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
    <section id="upload" ref={sectionRef} style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
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
            Real compression — runs entirely in your browser. No uploads, no servers.
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
                  onSelect={setPreset}
                  onQualityChange={setQuality}
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
                  { n: "01", title: "Upload", desc: "Drop a JPG, PNG, WebP, or MP4 file. Nothing leaves your device." },
                  { n: "02", title: "Select Preset", desc: "Choose Instagram, WhatsApp, Smart Auto, or set a custom quality." },
                  { n: "03", title: "Optimize", desc: "Real compression runs in your browser — Canvas API for images, FFmpeg for video." },
                  { n: "04", title: "Download", desc: "Save the actually compressed file to your device. Done." },
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
