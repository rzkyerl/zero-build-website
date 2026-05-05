"use client";

import { formatBytes } from "@/lib/format-size";
import { useResult } from "@/features/result/use-result";
import type { FileInfo } from "@/types/file";

interface ResultPanelProps {
  fileInfo: FileInfo;
  resultSize: number;
  onReset: () => void;
}

export default function ResultPanel({ fileInfo, resultSize, onReset }: ResultPanelProps) {
  const { downloadUrl, downloadName, reductionPercent, reductionBarWidth, handleReset } =
    useResult({ fileInfo, resultSize, onReset });

  return (
    <div className="animate-scale-in space-y-3">
      {/* Before / After */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#080808", border: "1px solid #161616" }}
      >
        <div className="grid grid-cols-2" style={{ borderBottom: "1px solid #111" }}>
          {/* Before */}
          <div className="p-5" style={{ borderRight: "1px solid #111" }}>
            <p
              className="text-[10px] tracking-[0.25em] uppercase font-medium mb-3"
              style={{ color: "#333" }}
            >
              Before
            </p>
            <div
              className="w-full h-28 rounded-xl mb-3 flex items-center justify-center overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {fileInfo.isVideo ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={fileInfo.url} alt="Original" className="w-full h-full object-cover" />
              )}
            </div>
            <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
              {formatBytes(fileInfo.size)}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#2a2a2a" }}>Original</p>
          </div>

          {/* After */}
          <div className="p-5">
            <p
              className="text-[10px] tracking-[0.25em] uppercase font-medium mb-3"
              style={{ color: "#333" }}
            >
              After
            </p>
            <div
              className="w-full h-28 rounded-xl mb-3 flex items-center justify-center overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {fileInfo.isVideo ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={fileInfo.url}
                  alt="Compressed preview"
                  className="w-full h-full object-cover"
                  style={{ filter: "contrast(1.02) saturate(1.02)" }}
                />
              )}
            </div>
            <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>
              {formatBytes(resultSize)}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#2a2a2a" }}>Compressed</p>
          </div>
        </div>

        {/* Reduction bar */}
        <div className="px-5 py-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs" style={{ color: "#444" }}>Size reduction</span>
            <span className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.7)" }}>
              −{reductionPercent}%
            </span>
          </div>
          <div
            className="h-px w-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <div
              className="h-full transition-all duration-1000"
              style={{ width: reductionBarWidth, background: "rgba(255,255,255,0.4)" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px]" style={{ color: "#222" }}>{formatBytes(fileInfo.size)}</span>
            <span className="text-[10px]" style={{ color: "#444" }}>{formatBytes(resultSize)}</span>
          </div>
        </div>
      </div>

      {/* Privacy badge */}
      <div
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid #111", color: "#333" }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        Processed locally · No data uploaded
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={downloadUrl}
          download={downloadName}
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold text-black bg-white transition-all duration-200 active:scale-95"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(255,255,255,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download
        </a>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 active:scale-95"
          style={{ border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.06)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
          </svg>
          Try Again
        </button>
      </div>
    </div>
  );
}
