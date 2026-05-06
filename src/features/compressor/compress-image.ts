import type { PresetId } from "@/types/preset";
import type { CompressResult } from "@/types/file";

/** Quality map per preset (0–1 scale for Canvas) */
const PRESET_QUALITY: Record<string, number> = {
  instagram: 0.88,
  whatsapp:  0.72,
  smart:     0.82,
};

export type ImageFormat = "jpeg" | "webp" | "png";

/**
 * Compress an image file using Canvas API.
 * Supports JPEG, WebP, and PNG output.
 * PNG is lossless — quality param has no effect on file size for PNG.
 */
export async function compressImage(
  file: File,
  preset: PresetId,
  customQuality: number,          // 10–100
  onProgress?: (p: number) => void,
  outputFormat: ImageFormat = "jpeg"
): Promise<CompressResult> {
  onProgress?.(10);

  const bitmap = await createImageBitmap(file);
  onProgress?.(30);

  // Quality only applies to JPEG and WebP (PNG is lossless)
  let quality: number | undefined;
  if (outputFormat !== "png") {
    if (preset === "custom") {
      const targetRatio = Math.max(0.05, Math.min(0.95, customQuality / 100));
      quality = Math.pow(targetRatio, 0.55);
    } else {
      quality = PRESET_QUALITY[preset] ?? 0.82;
    }
  }

  // Max dimension per preset
  const customMaxDim = Math.round(800 + (customQuality / 90) * 3296);
  const MAX_DIM: Record<string, number> = {
    instagram: 1920,
    whatsapp:  1600,
    smart:     2560,
    custom:    customMaxDim,
  };
  const maxDim = MAX_DIM[preset] ?? 2560;

  let { width, height } = bitmap;
  if (width > maxDim || height > maxDim) {
    const ratio = Math.min(maxDim / width, maxDim / height);
    width  = Math.round(width  * ratio);
    height = Math.round(height * ratio);
  }

  onProgress?.(50);

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  onProgress?.(75);

  const mimeType = `image/${outputFormat}`;
  const blob = await canvas.convertToBlob({
    type: mimeType,
    ...(quality !== undefined ? { quality } : {}),
  });

  onProgress?.(100);

  return {
    url:      URL.createObjectURL(blob),
    size:     blob.size,
    format:   outputFormat,
    mimeType,
  };
}
