import type { PresetId } from "@/types/preset";
import type { CompressResult } from "@/types/file";

/** Quality map per preset (0–1 scale for Canvas) */
const PRESET_QUALITY: Record<string, number> = {
  instagram: 0.88,
  whatsapp:  0.72,
  smart:     0.82,
};

/**
 * Compress an image file using Canvas API.
 * Output is always JPEG (universal support, good compression).
 * For WebP output, pass outputFormat = "webp".
 */
export async function compressImage(
  file: File,
  preset: PresetId,
  customQuality: number,          // 10–100
  onProgress?: (p: number) => void,
  outputFormat: "jpeg" | "webp" = "jpeg"
): Promise<CompressResult> {
  onProgress?.(10);

  const bitmap = await createImageBitmap(file);
  onProgress?.(30);

  // Determine canvas quality
  let quality: number;
  if (preset === "custom") {
    quality = customQuality / 100;
  } else {
    quality = PRESET_QUALITY[preset] ?? 0.82;
  }

  // For Instagram/WhatsApp, also cap max dimension to reduce file size
  const MAX_DIM: Record<string, number> = {
    instagram: 1920,
    whatsapp:  1600,
    smart:     2560,
    custom:    4096,
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
  const blob = await canvas.convertToBlob({ type: mimeType, quality });

  onProgress?.(100);

  return {
    url:      URL.createObjectURL(blob),
    size:     blob.size,
    format:   outputFormat,
    mimeType,
  };
}
