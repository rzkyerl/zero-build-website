"use client";

interface Props {
  progress: number;
  circumference: number;
  strokeDashoffset: number;
  statusMsg?: string;
  isLoadingFFmpeg?: boolean;
  timeLeft?: number | null;
  isVideo?: boolean;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

export default function Processing({
  progress,
  circumference,
  strokeDashoffset,
  statusMsg,
  isLoadingFFmpeg,
  timeLeft,
  isVideo,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 scale-in">
      {/* Progress ring */}
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 rounded-full pulse-ring" style={{ background: "rgba(255,255,255,0.04)" }} />
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r="36" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
          <circle
            cx="44" cy="44" r="36" fill="none"
            stroke="rgba(255,255,255,0.75)" strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isLoadingFFmpeg ? circumference : strokeDashoffset}
            className="ring-circle"
            style={isLoadingFFmpeg ? { animation: "spin-ring 1.5s linear infinite" } : {}}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {isLoadingFFmpeg ? (
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 9, color: "var(--fg-3)" }}>
              INIT
            </span>
          ) : (
            <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 13, color: "var(--fg-2)" }}>
              {Math.round(progress)}%
            </span>
          )}
        </div>
      </div>

      {/* Status message */}
      <p className="text-sm font-medium mb-2 text-center px-4" style={{ color: "var(--fg-2)" }}>
        {statusMsg || "Processing..."}
      </p>

      {/* Time remaining */}
      <div className="h-5 flex items-center justify-center">
        {timeLeft !== null && timeLeft !== undefined && timeLeft > 1 && progress < 99 ? (
          <p style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-geist-mono)" }}>
            ~{formatTime(timeLeft)} remaining
          </p>
        ) : (
          <p style={{ fontSize: 11, color: "var(--fg-3)", fontFamily: "var(--font-geist-mono)" }}>
            {isVideo ? "Processing via cloud" : "Your file never leaves your device"}
          </p>
        )}
      </div>

      <style>{`
        @keyframes spin-ring {
          from { stroke-dashoffset: ${circumference}; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
