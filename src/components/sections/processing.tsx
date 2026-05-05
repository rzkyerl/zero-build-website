"use client";

interface ProcessingProps {
  progress: number;
  circumference: number;
  strokeDashoffset: number;
}

export default function Processing({
  progress,
  circumference,
  strokeDashoffset,
}: ProcessingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative w-24 h-24 mb-8">
        {/* Pulse ring */}
        <div
          className="absolute inset-0 rounded-full animate-pulse-ring"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        {/* SVG progress ring */}
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 88 88">
          <circle
            cx="44"
            cy="44"
            r="36"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="4"
          />
          <circle
            cx="44"
            cy="44"
            r="36"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="progress-ring__circle"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-white">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      <p className="text-white/80 font-medium mb-1">Processing locally...</p>
      <p className="text-[#8a8a8a] text-sm">Your file never leaves your device</p>
    </div>
  );
}
