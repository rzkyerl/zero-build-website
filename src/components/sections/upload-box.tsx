"use client";

import { useRef } from "react";
import { ACCEPTED_TYPES } from "@/lib/constants";
import { formatBytes } from "@/lib/format-size";
import type { FileInfo } from "@/types/file";

interface Props {
  fileInfo: FileInfo | null;
  onDrop: (e: React.DragEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  dragOver: boolean;
  onDragOver: () => void;
  onDragLeave: () => void;
}

export default function UploadBox({ fileInfo, onDrop, onInputChange, onClear, dragOver, onDragOver, onDragLeave }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`relative rounded-2xl border-2 border-dashed transition-all duration-250 ${dragOver ? "drag-active" : ""}`}
      style={{
        borderColor: dragOver ? "rgba(255,255,255,0.25)" : fileInfo ? "rgba(255,255,255,0.12)" : "var(--border)",
        background: dragOver ? "rgba(255,255,255,0.03)" : fileInfo ? "rgba(255,255,255,0.02)" : "transparent",
        cursor: "pointer",
      }}
      onDragOver={(e) => { e.preventDefault(); onDragOver(); }}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      onMouseEnter={(e) => {
        if (!fileInfo && !dragOver) (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.14)";
      }}
      onMouseLeave={(e) => {
        if (!fileInfo && !dragOver) (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
      }}
    >
      <input ref={inputRef} type="file" accept={ACCEPTED_TYPES} className="hidden" onChange={onInputChange} />

      {!fileInfo ? (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="text-sm font-medium mb-1" style={{ color: "var(--fg-2)" }}>Drop your file here</p>
          <p className="text-xs mb-4" style={{ color: "var(--fg-3)" }}>or click to browse</p>
          <p
            className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
            style={{ color: "var(--fg-3)", border: "1px solid var(--border)", fontFamily: "var(--font-geist-mono)" }}
          >
            JPG · PNG · WebP · MP4
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-4 p-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)" }}
          >
            {fileInfo.isVideo ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
                <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: "var(--fg)" }}>{fileInfo.name}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--fg-3)", fontFamily: "var(--font-geist-mono)" }}>{formatBytes(fileInfo.size)}</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-150"
            style={{ background: "rgba(255,255,255,0.04)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.09)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)")}
            aria-label="Remove file"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
