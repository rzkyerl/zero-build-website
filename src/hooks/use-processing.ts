"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { AppState, CompressResult, FileInfo } from "@/types/file";
import type { PresetId } from "@/types/preset";

import type { ImageFormat } from "@/features/compressor/compress-image";

interface UseProcessingOptions {
  fileInfo: FileInfo | null;
  preset: PresetId;
  quality: number;
  format: ImageFormat;
  onComplete: (result: CompressResult) => void;
}

export function useProcessing({ fileInfo, preset, quality, format, onComplete }: UseProcessingOptions) {
  const [appState, setAppState]   = useState<AppState>("idle");
  const [progress, setProgress]   = useState(0);
  const [statusMsg, setStatusMsg] = useState("");
  const [error, setError]         = useState<string | null>(null);
  const [timeLeft, setTimeLeft]   = useState<number | null>(null); // seconds remaining

  const abortRef     = useRef(false);
  const startTimeRef = useRef<number>(0);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef  = useRef(0);

  // Keep progressRef in sync so the timer can read latest value
  useEffect(() => { progressRef.current = progress; }, [progress]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setTimeLeft(null);
  }, []);

  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed  = (Date.now() - startTimeRef.current) / 1000; // seconds
      const pct      = progressRef.current;
      if (pct <= 5 || pct >= 99) return;
      // Estimate total time from current rate, then compute remaining
      const totalEst = elapsed / (pct / 100);
      const remaining = Math.max(0, Math.round(totalEst - elapsed));
      setTimeLeft(remaining);
    }, 1000);
  }, []);

  const start = useCallback(async () => {
    if (!fileInfo) return;
    abortRef.current = false;
    setError(null);
    setProgress(0);
    setTimeLeft(null);

    try {
      if (fileInfo.isVideo) {
        setAppState("processing");
        setStatusMsg("Uploading & compressing video...");
        startTimer();

        const { compressVideo } = await import("@/features/compressor/compress-video");
        const result = await compressVideo(
          await urlToFile(fileInfo.url, fileInfo.name, fileInfo.type),
          preset,
          quality,
          (p) => {
            setProgress(p);
            if (p >= 95) setStatusMsg("Finalizing...");
            else if (p >= 10) setStatusMsg("Compressing video...");
          },
        );
        stopTimer();
        if (!abortRef.current) { onComplete(result); setAppState("done"); }

      } else {
        setAppState("processing");
        setStatusMsg("Compressing image...");
        startTimer();

        const { compressImage } = await import("@/features/compressor/compress-image");
        const file = await urlToFile(fileInfo.url, fileInfo.name, fileInfo.type);
        const result = await compressImage(file, preset, quality, (p) => setProgress(p), format);
        stopTimer();
        if (!abortRef.current) { onComplete(result); setAppState("done"); }
      }
    } catch (err) {
      stopTimer();
      console.error("Compression failed:", err);
      setError(err instanceof Error ? err.message : "Compression failed. Please try again.");
      setAppState("error");
    }
  }, [fileInfo, preset, quality, format, onComplete, startTimer, stopTimer]);

  const reset = useCallback(() => {
    abortRef.current = true;
    stopTimer();
    setAppState("idle");
    setProgress(0);
    setStatusMsg("");
    setError(null);
    setTimeLeft(null);
  }, [stopTimer]);

  const circumference    = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return { appState, setAppState, progress, statusMsg, error, timeLeft, start, reset, circumference, strokeDashoffset };
}

async function urlToFile(url: string, name: string, type: string): Promise<File> {
  const res  = await fetch(url);
  const blob = await res.blob();
  return new File([blob], name, { type });
}
