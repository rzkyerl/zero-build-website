"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import UploadBox from "@/components/sections/upload-box";
import PresetSelector from "@/components/sections/preset-selector";
import Processing from "@/components/sections/processing";
import ResultPanel from "@/components/sections/result-panel";
import { useFile } from "@/hooks/use-file";
import { useProcessing } from "@/hooks/use-processing";
import { useUpload } from "@/features/uploader/use-upload";
import { calcResultSize } from "@/features/compressor/presets";
import type { PresetId } from "@/types/preset";

export default function Compressor() {
  const [dragOver, setDragOver] = useState(false);
  const [preset, setPreset] = useState<PresetId>("smart");
  const [quality, setQuality] = useState(75);
  const [resultSize, setResultSize] = useState(0);

  const { fileInfo, setFileInfo, clearFile } = useFile();

  const handleComplete = useCallback((size: number) => {
    setResultSize(size);
  }, []);

  const calcSize = useCallback(() => {
    if (!fileInfo) return 0;
    return calcResultSize(fileInfo.size, preset, quality);
  }, [fileInfo, preset, quality]);

  const { appState, setAppState, progress, start, reset, circumference, strokeDashoffset } =
    useProcessing({ onComplete: handleComplete, calcSize });

  const { onDrop, onInputChange } = useUpload({
    onFile: (info) => {
      setFileInfo(info);
      setAppState("file-selected");
      setResultSize(0);
    },
    onError: (msg) => alert(msg),
  });

  const handleReset = () => {
    clearFile();
    reset();
    setResultSize(0);
  };

  const handleClear = () => {
    clearFile();
    reset();
  };

  return (
    <section id="upload" className="py-24 px-6">
      <Container size="md">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Start Compressing</h2>
          <p className="text-[#8a8a8a] text-sm">
            Drop your file, pick a preset, and optimize in seconds.
          </p>
        </div>

        {/* Idle / File selected */}
        {(appState === "idle" || appState === "file-selected") && (
          <div className="space-y-4">
            <UploadBox
              fileInfo={fileInfo}
              onDrop={onDrop}
              onInputChange={onInputChange}
              onClear={handleClear}
              dragOver={dragOver}
              onDragOver={() => setDragOver(true)}
              onDragLeave={() => setDragOver(false)}
            />

            <PresetSelector
              selected={preset}
              quality={quality}
              onSelect={setPreset}
              onQualityChange={setQuality}
            />

            <Button
              variant="primary"
              size="lg"
              onClick={start}
              disabled={!fileInfo}
              className="w-full py-4"
            >
              Optimize Now
            </Button>
          </div>
        )}

        {/* Processing */}
        {appState === "processing" && (
          <Processing
            progress={progress}
            circumference={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        )}

        {/* Done */}
        {appState === "done" && fileInfo && (
          <ResultPanel
            fileInfo={fileInfo}
            resultSize={resultSize}
            onReset={handleReset}
          />
        )}
      </Container>
    </section>
  );
}
