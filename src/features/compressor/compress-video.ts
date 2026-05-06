import type { PresetId } from "@/types/preset";
import type { CompressResult } from "@/types/file";

/**
 * Compress a video file by uploading directly to ApyHub from the browser.
 *
 * Why direct upload instead of proxying through /api/compress-video?
 * Vercel serverless functions have a 4.5 MB request body limit — video files
 * easily exceed this. By fetching the token from our API route and uploading
 * directly to ApyHub, we bypass Vercel's limit entirely.
 */
export async function compressVideo(
  file: File,
  preset: PresetId,
  customQuality: number,
  onProgress?: (p: number) => void,
): Promise<CompressResult> {
  onProgress?.(0);

  // Step 1: Get the ApyHub token from our API route (keeps it out of source code)
  const tokenRes = await fetch("/api/compress-token");
  if (!tokenRes.ok) {
    throw new Error("Compression service not configured.");
  }
  const { token } = await tokenRes.json();

  onProgress?.(3);

  // Step 2: Build form data
  const formData = new FormData();
  formData.append("video", file);

  const compressionMap: Record<PresetId, number> = {
    instagram: 40,
    whatsapp:  60,
    smart:     45,
    custom:    customQuality,
  };
  formData.append("compression_percentage", String(compressionMap[preset]));

  onProgress?.(5);

  // Step 3: Simulate smooth progress while waiting
  const fileSizeMB  = file.size / (1024 * 1024);
  const estimatedMs = Math.max(8000, fileSizeMB * 1200 + 10000);
  const startTime   = Date.now();
  let animFrame: ReturnType<typeof setTimeout>;
  let done = false;

  const tick = () => {
    if (done) return;
    const elapsed  = Date.now() - startTime;
    const fraction = Math.min(elapsed / estimatedMs, 1);
    const simulated = Math.round(5 + fraction * 87 * (1 - fraction * 0.3));
    onProgress?.(Math.min(simulated, 92));
    animFrame = setTimeout(tick, 400);
  };
  animFrame = setTimeout(tick, 400);

  try {
    // Step 4: Upload directly to ApyHub — no Vercel size limit
    const res = await fetch(
      "https://api.apyhub.com/compress/video/file?output=compressed.mp4",
      {
        method: "POST",
        headers: { "apy-token": token },
        body: formData,
      }
    );

    done = true;
    clearTimeout(animFrame);

    if (!res.ok) {
      const text = await res.text().catch(() => "Unknown error");
      throw new Error(`Compression failed (${res.status}): ${text}`);
    }

    onProgress?.(95);
    const blob = await res.blob();

    if (blob.size === 0) {
      throw new Error("Received empty file from compression service.");
    }

    onProgress?.(100);

    return {
      url:      URL.createObjectURL(blob),
      size:     blob.size,
      format:   "mp4",
      mimeType: "video/mp4",
    };
  } catch (err) {
    done = true;
    clearTimeout(animFrame);
    throw err;
  }
}
