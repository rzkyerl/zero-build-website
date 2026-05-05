"use client";

import { PRESETS } from "@/lib/constants";
import type { PresetId } from "@/types/preset";

interface PresetSelectorProps {
  selected: PresetId;
  quality: number;
  onSelect: (id: PresetId) => void;
  onQualityChange: (value: number) => void;
}

export default function PresetSelector({
  selected,
  quality,
  onSelect,
  onQualityChange,
}: PresetSelectorProps) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#080808", border: "1px solid #161616" }}
    >
      <p
        className="text-[10px] tracking-[0.25em] uppercase font-medium mb-4"
        style={{ color: "#444" }}
      >
        Preset
      </p>

      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset.id)}
            className="text-left px-4 py-3 rounded-xl transition-all duration-200 active:scale-[0.97]"
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: selected === preset.id ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.04)",
              background:
                selected === preset.id
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(255,255,255,0.01)",
            }}
            onMouseEnter={(e) => {
              if (selected !== preset.id) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
              }
            }}
            onMouseLeave={(e) => {
              if (selected !== preset.id) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.01)";
              }
            }}
          >
            <div
              className="text-sm font-medium mb-0.5 transition-colors duration-200"
              style={{ color: selected === preset.id ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }}
            >
              {preset.label}
            </div>
            <div className="text-xs" style={{ color: "#333" }}>
              {preset.desc}
            </div>
          </button>
        ))}
      </div>

      {/* Custom quality slider */}
      {selected === "custom" && (
        <div
          className="mt-4 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs" style={{ color: "#444" }}>Quality</span>
            <span className="text-sm font-semibold tabular-nums" style={{ color: "rgba(255,255,255,0.7)" }}>
              {quality}%
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={quality}
            onChange={(e) => onQualityChange(Number(e.target.value))}
            className="w-full h-px rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgba(255,255,255,0.5) ${quality}%, rgba(255,255,255,0.08) ${quality}%)`,
              outline: "none",
            }}
          />
          <div className="flex justify-between mt-2">
            <span className="text-[10px]" style={{ color: "#2a2a2a" }}>Low</span>
            <span className="text-[10px]" style={{ color: "#2a2a2a" }}>High</span>
          </div>
        </div>
      )}
    </div>
  );
}
