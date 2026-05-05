"use client";

import { useRef } from "react";
import { ACCEPTED_TYPES } from "@/lib/constants";
import { formatBytes } from "@/lib/format-size";
import type { FileInfo } from "@/types/file";

interface UploadBoxProps {
  fileInfo: FileInfo | null;
  onDrop: (e: React.DragEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  dragOver: boolean;
  onDragOver: () => void;
  onDragLeave: () => void;
}

export default function UploadBox({
  fileInfo,
  onDrop,
  onInputChange,
  onClear,
  dragOver,
  onDragOver,
  onDragLeave,
}: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer group ${
        dragOver ? "drag-over" : ""
      }`}
      style={{
        borderColor: dragOver
          ? "rgba(255,255,255,0.3)"
          : fileInfo
          ? "rgba(255,255,255,0.1)"
          : "rgba(255,255,255,0.06)",
        background: dragOver
          ? "rgba(255,255,255,0.03)"
          : fileInfo
          ? "rgba(255,255,255,0.02)"
          : "rgba(255,255,255,0.01)",
      }}
      onDragOver={(e) => { e.preventDefault(); onDragOver(); }}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      onMouseEnter={(e) => {
        if (!fileInfo && !dragOver) {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)";
          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.02)";
        }
      }}
      onMouseLeave={(e) => {
        if (!fileInfo && !dragOver) {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.01)";
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        className="hidden"
        onChange={onInputChange}
      />

      {!fileInfo ? (
        <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p className="text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
            Drop your file here
          </p>
          <p className="text-xs mb-4" style={{ color: "#333" }}>
            or click to browse
          </p>
          <p
            className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
            style={{ color: "#2a2a2a", border: "1px solid #1a1a1a" }}
          >
            JPG · PNG · WebP · MP4
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-4 p-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {fileInfo.isVideo ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: "rgba(255,255,255,0.7)" }}>
              {fileInfo.name}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#444" }}>
              {formatBytes(fileInfo.size)}
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.04)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)")}
            aria-label="Remove file"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
