"use client";

interface ProcessingProps {
  progress: number;
  circumference: number;
  strokeDashoffset: number;
}

export default function Processing({ progress, circumference, strokeDashoffset }: ProcessingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
      <div className="relative w-28 h-28 mb-10">
        {/* Outer pulse rings */}
        <div
          className="absolute inset-0 rounded-full animate-pulse-ring"
          style={{ background: "rgba(255,255,255,0.03)" }}
        />
        <div
          className="absolute inset-0 rounded-full animate-pulse-ring"
          style={{ background: "rgba(255,255,255,0.02)", animationDelay: "0.5s" }}
        />

        {/* SVG progress ring */}
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 88 88">
          <circle
            cx="44" cy="44" r="36"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="2"
          />
          <circle
            cx="44" cy="44" r="36"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="progress-ring__circle"
          />
        </svg>

        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold tabular-nums" style={{ color: "rgba(255,255,255,0.7)" }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <p className="text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
        Processing locally...
      </p>
      <p className="text-xs" style={{ color: "#333" }}>
        Your file never leaves your device
      </p>
    </div>
  );
}
