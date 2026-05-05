"use client";

import { PRESETS } from "@/lib/constants";
import { Card } from "@/components/ui/card";
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
    <Card>
      <p className="text-xs text-[#8a8a8a] uppercase tracking-widest mb-4">Preset</p>

      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset.id)}
            className="text-left px-4 py-3 rounded-xl border transition-all duration-150 active:scale-95"
            style={{
              borderColor: selected === preset.id ? "rgba(255,255,255,0.3)" : "#2a2a2a",
              background:
                selected === preset.id
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(255,255,255,0.02)",
            }}
          >
            <div className="text-sm font-medium text-white/90 mb-0.5">{preset.label}</div>
            <div className="text-xs text-[#8a8a8a]">{preset.desc}</div>
          </button>
        ))}
      </div>

      {/* Custom quality slider */}
      {selected === "custom" && (
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid #2a2a2a" }}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-[#8a8a8a]">Quality</span>
            <span className="text-sm font-semibold text-white">{quality}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={quality}
            onChange={(e) => onQualityChange(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgba(255,255,255,0.8) ${quality}%, rgba(255,255,255,0.1) ${quality}%)`,
              outline: "none",
            }}
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-white/20">Low</span>
            <span className="text-xs text-white/20">High</span>
          </div>
        </div>
      )}
    </Card>
  );
}
