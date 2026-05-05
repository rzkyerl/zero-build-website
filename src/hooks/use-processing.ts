"use client";

import { useState, useRef, useCallback } from "react";
import type { AppState } from "@/types/file";

interface UseProcessingOptions {
  onComplete: (resultSize: number) => void;
  calcSize: () => number;
}

export function useProcessing({ onComplete, calcSize }: UseProcessingOptions) {
  const [appState, setAppState] = useState<AppState>("idle");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    setAppState("processing");
    setProgress(0);

    let p = 0;
    intervalRef.current = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current!);
        const size = calcSize();
        setTimeout(() => {
          onComplete(size);
          setAppState("done");
        }, 300);
      }
      setProgress(Math.min(p, 100));
    }, 120);
  }, [calcSize, onComplete]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setAppState("idle");
    setProgress(0);
  }, []);

  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return { appState, setAppState, progress, start, reset, circumference, strokeDashoffset };
}
