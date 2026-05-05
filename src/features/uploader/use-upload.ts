"use client";

import { useCallback } from "react";
import { ACCEPTED_TYPES_ARRAY } from "@/lib/constants";
import type { FileInfo } from "@/types/file";

interface UseUploadOptions {
  onFile: (info: FileInfo) => void;
  onError?: (msg: string) => void;
}

export function useUpload({ onFile, onError }: UseUploadOptions) {
  const processFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_TYPES_ARRAY.includes(file.type)) {
        onError?.("Unsupported format. Please use JPG, PNG, WebP, or MP4.");
        return;
      }
      const url = URL.createObjectURL(file);
      onFile({
        name: file.name,
        size: file.size,
        type: file.type,
        url,
        isVideo: file.type.startsWith("video/"),
      });
    },
    [onFile, onError]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
      e.target.value = "";
    },
    [processFile]
  );

  return { onDrop, onInputChange, processFile };
}
