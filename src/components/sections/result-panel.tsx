"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PrivacyBadge } from "@/components/ui/badge";
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
    <div className="animate-scale-in space-y-4">
      {/* Before / After card */}
      <Card padding="sm" className="overflow-hidden !p-0 rounded-2xl">
        <div className="grid grid-cols-2 divide-x" style={{ borderColor: "#2a2a2a" }}>
          {/* Before */}
          <div className="p-5">
            <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-3">Before</p>
            <div
              className="w-full h-28 rounded-xl mb-3 flex items-center justify-center overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              {fileInfo.isVideo ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={fileInfo.url} alt="Original" className="w-full h-full object-cover" />
              )}
            </div>
            <p className="text-white/80 font-semibold text-sm">{formatBytes(fileInfo.size)}</p>
            <p className="text-[#8a8a8a] text-xs mt-0.5">Original</p>
          </div>

          {/* After */}
          <div className="p-5">
            <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-3">After</p>
            <div
              className="w-full h-28 rounded-xl mb-3 flex items-center justify-center overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              {fileInfo.isVideo ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
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
            <p className="text-white font-semibold text-sm">{formatBytes(resultSize)}</p>
            <p className="text-[#8a8a8a] text-xs mt-0.5">Compressed</p>
          </div>
        </div>

        {/* Reduction bar */}
        <div className="px-5 pb-5 pt-4" style={{ borderTop: "1px solid #2a2a2a" }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-[#8a8a8a]">Size reduction</span>
            <span className="text-sm font-bold text-white">−{reductionPercent}%</span>
          </div>
          <div
            className="h-1.5 w-full rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full rounded-full bg-white transition-all duration-700"
              style={{ width: reductionBarWidth }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-white/20">{formatBytes(fileInfo.size)}</span>
            <span className="text-xs text-white/50">{formatBytes(resultSize)}</span>
          </div>
        </div>
      </Card>

      <PrivacyBadge />

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={downloadUrl}
          download={downloadName}
          className="flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-semibold text-black bg-white hover:bg-white/90 transition-all btn-glow active:scale-95"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download
        </a>
        <Button variant="ghost" size="md" onClick={handleReset} className="py-3.5">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
          </svg>
          Try Again
        </Button>
      </div>
    </div>
  );
}
