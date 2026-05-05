"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Container } from "@/components/ui/container";
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
  const calcSize = useCallback(() => {
    if (!fileInfo) return 0;
    return calcResultSize(fileInfo.size, preset, quality);
  }, [fileInfo, preset, quality]);

  const { appState, setAppState, progress, start, reset, circumference, strokeDashoffset } =
    useProcessing({ onComplete: handleComplete, calcSize });

  const { onDrop, onInputChange } = useUpload({
    onFile: (info) => {
      setFileInfo(info);
      setAppState("file-selected");
      setResultSize(0);
    },
    onError: (msg) => alert(msg),
  });

  const handleReset = () => { clearFile(); reset(); setResultSize(0); };
  const handleClear = () => { clearFile(); reset(); };

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="upload" ref={sectionRef} className="py-32 px-6">
      <Container size="md">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
            <span
              className="text-[10px] tracking-[0.3em] uppercase font-medium"
              style={{ color: "#444" }}
            >
              Compressor
            </span>
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Start Compressing
          </h2>
          <p className="text-sm" style={{ color: "#555" }}>
            Drop your file, pick a preset, and optimize in seconds.
          </p>
        </div>

        {/* Idle / File selected */}
        {(appState === "idle" || appState === "file-selected") && (
          <div className="space-y-3 reveal reveal-delay-1">
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
              className="w-full py-4 rounded-2xl text-sm font-semibold transition-all duration-300 active:scale-[0.98] disabled:opacity-20 disabled:cursor-not-allowed relative overflow-hidden group"
              style={{
                background: fileInfo ? "#fff" : "rgba(255,255,255,0.06)",
                color: fileInfo ? "#000" : "rgba(255,255,255,0.2)",
                border: fileInfo ? "none" : "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                if (!fileInfo) return;
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Optimize Now
            </button>
          </div>
        )}

        {/* Processing */}
        {appState === "processing" && (
          <Processing
            progress={progress}
            circumference={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        )}

        {/* Done */}
        {appState === "done" && fileInfo && (
          <ResultPanel
            fileInfo={fileInfo}
            resultSize={resultSize}
            onReset={handleReset}
          />
        )}
      </Container>
    </section>
  );
}
