"use client";

import { PRESETS } from "@/lib/constants";
import type { PresetId } from "@/types/preset";
import type { ImageFormat } from "@/features/compressor/compress-image";

interface Props {
  selected: PresetId;
  quality: number;
  format: ImageFormat;
  isVideo?: boolean;
  onSelect: (id: PresetId) => void;
  onQualityChange: (v: number) => void;
  onFormatChange: (f: ImageFormat) => void;
}

const FORMATS: { id: ImageFormat; label: string; note: string }[] = [
  { id: "jpeg", label: "JPEG", note: "Smallest size" },
  { id: "webp", label: "WebP", note: "Best quality/size" },
  { id: "png",  label: "PNG",  note: "Lossless" },
];

export default function PresetSelector({
  selected, quality, format, isVideo,
  onSelect, onQualityChange, onFormatChange,
}: Props) {
  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>
        Preset
      </p>

      {/* Preset grid */}
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((p) => {
          const active = selected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className="text-left px-4 py-3 rounded-xl transition-all duration-200 active:scale-[0.97]"
              style={{
                border: `1px solid ${active ? "rgba(255,255,255,0.18)" : "var(--border)"}`,
                background: active ? "rgba(255,255,255,0.07)" : "transparent",
              }}
              onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; }}
            >
              <div className="text-sm font-medium mb-0.5" style={{ color: active ? "var(--fg)" : "var(--fg-2)" }}>
                {p.label}
              </div>
              <div className="text-xs" style={{ color: "var(--fg-3)", fontFamily: "var(--font-geist-mono)" }}>
                {p.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom quality slider */}
      {selected === "custom" && (
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs" style={{ color: "var(--fg-3)" }}>Target size</span>
            <span className="text-sm font-semibold tabular-nums" style={{ color: "var(--fg)", fontFamily: "var(--font-geist-mono)" }}>
              ~{quality}% of original
            </span>
          </div>
          <input
            type="range" min={10} max={90} value={quality}
            onChange={(e) => onQualityChange(Number(e.target.value))}
            className="w-full h-px appearance-none rounded-full"
            style={{
              background: `linear-gradient(to right, rgba(255,255,255,0.55) ${quality}%, rgba(255,255,255,0.1) ${quality}%)`,
              outline: "none", cursor: "pointer",
            }}
          />
          <div className="flex justify-between mt-2">
            <span style={{ fontSize: 10, color: "var(--fg-4)", fontFamily: "var(--font-geist-mono)" }}>10% (smallest)</span>
            <span style={{ fontSize: 10, color: "var(--fg-4)", fontFamily: "var(--font-geist-mono)" }}>90% (largest)</span>
          </div>
        </div>
      )}

      {/* Output format — photos only */}
      {!isVideo && (
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
            Output Format
          </p>
          <div className="grid grid-cols-3 gap-2">
            {FORMATS.map((f) => {
              const active = format === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => onFormatChange(f.id)}
                  className="text-left px-3 py-2.5 rounded-xl transition-all duration-200 active:scale-[0.97]"
                  style={{
                    border: `1px solid ${active ? "rgba(255,255,255,0.18)" : "var(--border)"}`,
                    background: active ? "rgba(255,255,255,0.07)" : "transparent",
                  }}
                  onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
                  onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; }}
                >
                  <div className="text-xs font-semibold mb-0.5" style={{ color: active ? "var(--fg)" : "var(--fg-2)" }}>
                    {f.label}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--fg-3)", fontFamily: "var(--font-geist-mono)" }}>
                    {f.note}
                  </div>
                </button>
              );
            })}
          </div>
          {format === "png" && (
            <p style={{ fontSize: 10, color: "var(--fg-3)", marginTop: 8, lineHeight: 1.5 }}>
              PNG is lossless — file size depends on image complexity, not quality setting.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
