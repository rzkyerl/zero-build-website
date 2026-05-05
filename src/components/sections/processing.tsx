"use client";

interface Props { progress: number; circumference: number; strokeDashoffset: number; }

export default function Processing({ progress, circumference, strokeDashoffset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 scale-in">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 rounded-full pulse-ring" style={{ background: "rgba(255,255,255,0.04)" }} />
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r="36" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          <circle
            cx="44" cy="44" r="36" fill="none"
            stroke="rgba(255,255,255,0.75)" strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="ring-circle"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 13, color: "var(--fg-2)" }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      <p className="text-sm font-medium mb-1.5" style={{ color: "var(--fg-2)" }}>Processing locally...</p>
      <p style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-geist-mono)" }}>
        Your file never leaves your device
      </p>
    </div>
  );
}
