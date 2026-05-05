"use client";

import { formatBytes } from "@/lib/format-size";
import { useResult } from "@/features/result/use-result";
import type { FileInfo } from "@/types/file";

interface Props { fileInfo: FileInfo; resultSize: number; onReset: () => void; }

export default function ResultPanel({ fileInfo, resultSize, onReset }: Props) {
  const { downloadUrl, downloadName, reductionPercent, reductionBarWidth, handleReset } =
    useResult({ fileInfo, resultSize, onReset });

  return (
    <div className="scale-in space-y-3">
      {/* Before / After */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="grid grid-cols-2" style={{ borderBottom: "1px solid var(--border)" }}>
          {[
            { label: "Before", size: fileInfo.size, dim: true },
            { label: "After",  size: resultSize,    dim: false },
          ].map(({ label, size, dim }, i) => (
            <div key={label} className="p-5" style={i === 0 ? { borderRight: "1px solid var(--border)" } : {}}>
              <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
                {label}
              </p>
              <div
                className="w-full h-24 rounded-xl mb-3 flex items-center justify-center overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                {fileInfo.isVideo ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={dim ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.3)"} strokeWidth="1.5">
                    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={fileInfo.url} alt={label} className="w-full h-full object-cover"
                    style={!dim ? { filter: "contrast(1.02) saturate(1.02)" } : {}} />
                )}
              </div>
              <p className="text-sm font-semibold" style={{ color: dim ? "var(--fg-2)" : "var(--fg)", fontFamily: "var(--font-geist-mono)" }}>
                {formatBytes(size)}
              </p>
              <p style={{ fontSize: 10, color: "var(--fg-3)", marginTop: 2 }}>{label === "Before" ? "Original" : "Compressed"}</p>
            </div>
          ))}
        </div>

        {/* Reduction bar */}
        <div className="px-5 py-4">
          <div className="flex justify-between items-center mb-2">
            <span style={{ fontSize: 11, color: "var(--fg-3)" }}>Size reduction</span>
            <span className="font-bold" style={{ fontSize: 13, color: "var(--fg)", fontFamily: "var(--font-geist-mono)" }}>
              −{reductionPercent}%
            </span>
          </div>
          <div className="h-px w-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-full transition-all duration-1000" style={{ width: reductionBarWidth, background: "rgba(255,255,255,0.45)" }} />
          </div>
          <div className="flex justify-between mt-2">
            <span style={{ fontSize: 10, color: "var(--fg-4)", fontFamily: "var(--font-geist-mono)" }}>{formatBytes(fileInfo.size)}</span>
            <span style={{ fontSize: 10, color: "var(--fg-3)", fontFamily: "var(--font-geist-mono)" }}>{formatBytes(resultSize)}</span>
          </div>
        </div>
      </div>

      {/* Privacy note */}
      <div
        className="flex items-center justify-center gap-2 py-2.5 rounded-xl"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--fg-3)" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-geist-mono)" }}>
          Processed locally · No data uploaded
        </span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={downloadUrl}
          download={downloadName}
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold text-black bg-white transition-all duration-200 active:scale-95"
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 28px rgba(255,255,255,0.18)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download
        </a>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 active:scale-95"
          style={{ border: "1px solid var(--border)", color: "var(--fg-2)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-hi)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--fg)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--fg-2)"; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.5" />
          </svg>
          Try Again
        </button>
      </div>
    </div>
  );
}
