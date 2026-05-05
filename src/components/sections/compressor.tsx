"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import UploadBox from "@/components/sections/upload-box";
import PresetSelector from "@/components/sections/preset-selector";
import Processing from "@/components/sections/processing";
import ResultPanel from "@/components/sections/result-panel";
import { useFile } from "@/hooks/use-file";
import { useProcessing } from "@/hooks/use-processing";
import { useUpload } from "@/features/uploader/use-upload";
import { calcResultSize } from "@/features/compressor/presets";
import type { PresetId } from "@/types/preset";

export default function Compressor() {
  const [dragOver, setDragOver] = useState(false);
  const [preset, setPreset] = useState<PresetId>("smart");
  const [quality, setQuality] = useState(75);
  const [resultSize, setResultSize] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { fileInfo, setFileInfo, clearFile } = useFile();
  const handleComplete = useCallback((size: number) => setResultSize(size), []);
  const calcSize = useCallback(() => fileInfo ? calcResultSize(fileInfo.size, preset, quality) : 0, [fileInfo, preset, quality]);

  const { appState, setAppState, progress, start, reset, circumference, strokeDashoffset } =
    useProcessing({ onComplete: handleComplete, calcSize });

  const { onDrop, onInputChange } = useUpload({
    onFile: (info) => { setFileInfo(info); setAppState("file-selected"); setResultSize(0); },
    onError: (msg) => alert(msg),
  });

  const handleReset = () => { clearFile(); reset(); setResultSize(0); };
  const handleClear = () => { clearFile(); reset(); };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        // Small delay so elements entering viewport mid-scroll animate properly
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
            Drop your file, pick a preset, and optimize in seconds. Everything runs locally.
          </p>
        </div>

        {/* Two-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Left — tool */}
          <div className="fade-up d2">
            {(appState === "idle" || appState === "file-selected") && (
              <div className="space-y-3">
                <UploadBox
                  fileInfo={fileInfo}
                  onDrop={onDrop}
                  onInputChange={onInputChange}
                  onClear={handleClear}
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
              </div>
            )}
            {appState === "processing" && (
              <Processing progress={progress} circumference={circumference} strokeDashoffset={strokeDashoffset} />
            )}
            {appState === "done" && fileInfo && (
              <ResultPanel fileInfo={fileInfo} resultSize={resultSize} onReset={handleReset} />
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
                  { n: "03", title: "Optimize", desc: "Compression runs locally in your browser using platform-tuned parameters." },
                  { n: "04", title: "Download", desc: "Save the compressed file directly to your device. Done." },
                ].map((step, i) => (
                  <div
                    key={step.n}
                    className="flex gap-5 py-5 group"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
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
