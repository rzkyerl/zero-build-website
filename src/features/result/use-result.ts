"use client";

import { useCallback } from "react";
import type { FileInfo } from "@/types/file";

interface UseResultOptions {
  fileInfo: FileInfo | null;
  resultSize: number;
  onReset: () => void;
}

export function useResult({ fileInfo, resultSize, onReset }: UseResultOptions) {
  const downloadUrl = fileInfo?.url ?? "#";
  const downloadName = fileInfo ? `zero_${fileInfo.name}` : "compressed";

  const reductionPercent =
    fileInfo && resultSize
      ? Math.round((1 - resultSize / fileInfo.size) * 100)
      : 0;

  const reductionBarWidth =
    fileInfo && resultSize
      ? `${(resultSize / fileInfo.size) * 100}%`
      : "0%";

  const handleReset = useCallback(() => {
    if (fileInfo?.url) URL.revokeObjectURL(fileInfo.url);
    onReset();
  }, [fileInfo, onReset]);

  return {
    downloadUrl,
    downloadName,
    reductionPercent,
    reductionBarWidth,
    handleReset,
  };
}
