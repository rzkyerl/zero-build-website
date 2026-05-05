"use client";

import { useState, useEffect } from "react";
import type { FileInfo } from "@/types/file";

export function useFile() {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

  // Revoke object URL on unmount or when file changes
  useEffect(() => {
    return () => {
      if (fileInfo?.url) URL.revokeObjectURL(fileInfo.url);
    };
  }, [fileInfo]);

  const clearFile = () => {
    if (fileInfo?.url) URL.revokeObjectURL(fileInfo.url);
    setFileInfo(null);
  };

  return { fileInfo, setFileInfo, clearFile };
}
