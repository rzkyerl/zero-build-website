import type { PresetId } from "@/types/preset";

/**
 * Maps a preset to its FFmpeg q:v value.
 * Scale: 1 = best quality, 31 = worst.
 */
export function getImageQv(preset: PresetId, customQuality?: number): number {
  if (preset === "custom" && customQuality !== undefined) {
    // Linear map: quality 100% → q:v 1, quality 10% → q:v ~28
    return Math.round(1 + (1 - customQuality / 100) * 30);
  }
  const map: Record<string, number> = {
    instagram: 2,
    whatsapp: 4,
    smart: 3,
  };
  return map[preset] ?? 3;
}

/**
 * Builds the FFmpeg argument string for image compression.
 * Placeholder — wire up to ffmpeg.wasm or a server action when ready.
 */
export function buildImageCommand(
  inputPath: string,
  outputPath: string,
  qv: number
): string {
  return `-y -i ${inputPath} -q:v ${qv} ${outputPath}`;
}
