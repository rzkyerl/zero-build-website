import type { PresetId } from "@/types/preset";
import type { CompressResult } from "@/types/file";

/** FFmpeg preset params */
const PRESET_PARAMS: Record<string, { crf: number; audioBitrate: string; scale: string }> = {
  instagram: { crf: 23, audioBitrate: "192k", scale: "1920:-2" },
  whatsapp:  { crf: 28, audioBitrate: "128k", scale: "1280:-2" },
  smart:     { crf: 26, audioBitrate: "160k", scale: "1920:-2" },
  custom:    { crf: 26, audioBitrate: "128k", scale: "1920:-2" },
};

function crfFromQuality(quality: number): number {
  // quality 100 → crf 18 (best), quality 10 → crf 35 (worst)
  return Math.round(18 + (1 - quality / 100) * 17);
}

/**
 * Compress a video file using ffmpeg.wasm (single-thread, no SharedArrayBuffer).
 * Dynamically imports FFmpeg to avoid SSR issues.
 */
export async function compressVideo(
  file: File,
  preset: PresetId,
  customQuality: number,
  onProgress?: (p: number) => void,
  onLoadingFFmpeg?: () => void,
): Promise<CompressResult> {
  // Dynamic import — only loads when called (not on page load)
  const { FFmpeg } = await import("@ffmpeg/ffmpeg");
  const { fetchFile, toBlobURL } = await import("@ffmpeg/util");

  onLoadingFFmpeg?.();
  onProgress?.(0);

  const ffmpeg = new FFmpeg();

  // Load single-thread core (no SharedArrayBuffer needed → works on Safari/iOS)
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm";
  await ffmpeg.load({
    coreURL:  await toBlobURL(`${baseURL}/ffmpeg-core.js`,   "text/javascript"),
    wasmURL:  await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });

  onProgress?.(15);

  // Wire up progress
  ffmpeg.on("progress", ({ progress }) => {
    onProgress?.(15 + Math.round(progress * 80));
  });

  const inputName  = "input.mp4";
  const outputName = "output.mp4";

  await ffmpeg.writeFile(inputName, await fetchFile(file));
  onProgress?.(20);

  const params = PRESET_PARAMS[preset] ?? PRESET_PARAMS.smart;
  const crf = preset === "custom" ? crfFromQuality(customQuality) : params.crf;

  await ffmpeg.exec([
    "-i", inputName,
    "-c:v", "libx264",
    "-preset", "ultrafast",   // fastest encode, slightly larger file
    "-crf", String(crf),
    "-vf", `scale=${params.scale}`,
    "-c:a", "aac",
    "-b:a", params.audioBitrate,
    "-movflags", "+faststart",
    "-y",
    outputName,
  ]);

  onProgress?.(97);

  const data = await ffmpeg.readFile(outputName);
  // FileData = Uint8Array | string — always expect Uint8Array for binary output
  if (typeof data === "string") throw new Error("Unexpected string output from FFmpeg");
  // Copy to plain ArrayBuffer to satisfy Blob constructor type constraints
  const buffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
  const blob = new Blob([buffer], { type: "video/mp4" });

  ffmpeg.terminate();
  onProgress?.(100);

  return {
    url:      URL.createObjectURL(blob),
    size:     blob.size,
    format:   "mp4",
    mimeType: "video/mp4",
  };
}
