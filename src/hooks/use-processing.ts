"use client";

import { useState, useRef, useCallback } from "react";
import type { AppState, CompressResult, FileInfo } from "@/types/file";
import type { PresetId } from "@/types/preset";

interface UseProcessingOptions {
  fileInfo: FileInfo | null;
  preset: PresetId;
  quality: number;
  onComplete: (result: CompressResult) => void;
}

export function useProcessing({ fileInfo, preset, quality, onComplete }: UseProcessingOptions) {
  const [appState, setAppState]   = useState<AppState>("idle");
  const [progress, setProgress]   = useState(0);
  const [statusMsg, setStatusMsg] = useState("");
  const [error, setError]         = useState<string | null>(null);
  const abortRef = useRef(false);

  const start = useCallback(async () => {
    if (!fileInfo) return;
    abortRef.current = false;
    setError(null);
    setProgress(0);

    try {
      if (fileInfo.isVideo) {
        setAppState("loading-ffmpeg");
        setStatusMsg("Loading FFmpeg (~20 MB, cached after first use)...");

        const { compressVideo } = await import("@/features/compressor/compress-video");
        const result = await compressVideo(
          await urlToFile(fileInfo.url, fileInfo.name, fileInfo.type),
          preset,
          quality,
          (p) => { setProgress(p); if (p > 15) { setAppState("processing"); setStatusMsg("Compressing video..."); } },
          () => { setAppState("loading-ffmpeg"); setStatusMsg("Loading FFmpeg (~20 MB, cached after first use)..."); }
        );
        if (!abortRef.current) { onComplete(result); setAppState("done"); }

      } else {
        setAppState("processing");
        setStatusMsg("Compressing image...");

        const { compressImage } = await import("@/features/compressor/compress-image");
        const file = await urlToFile(fileInfo.url, fileInfo.name, fileInfo.type);
        const result = await compressImage(file, preset, quality, (p) => setProgress(p));
        if (!abortRef.current) { onComplete(result); setAppState("done"); }
      }
    } catch (err) {
      console.error("Compression failed:", err);
      setError(err instanceof Error ? err.message : "Compression failed. Please try again.");
      setAppState("error");
    }
  }, [fileInfo, preset, quality, onComplete]);

  const reset = useCallback(() => {
    abortRef.current = true;
    setAppState("idle");
    setProgress(0);
    setStatusMsg("");
    setError(null);
  }, []);

  const circumference    = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return { appState, setAppState, progress, statusMsg, error, start, reset, circumference, strokeDashoffset };
}

/** Convert an object URL back to a File object */
async function urlToFile(url: string, name: string, type: string): Promise<File> {
  const res  = await fetch(url);
  const blob = await res.blob();
  return new File([blob], name, { type });
}
