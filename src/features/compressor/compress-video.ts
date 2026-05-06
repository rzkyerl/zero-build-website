import type { PresetId } from "@/types/preset";
import type { CompressResult } from "@/types/file";

/**
 * Compress a video file using ApyHub's API via our Next.js API route proxy.
 * Hybrid approach: images stay client-side, videos use cloud API.
 */
export async function compressVideo(
  file: File,
  preset: PresetId,
  customQuality: number,
  onProgress?: (p: number) => void,
): Promise<CompressResult> {
  onProgress?.(0);

  const formData = new FormData();
  formData.append("video", file);

  const compressionMap: Record<PresetId, number> = {
    instagram: 40,
    whatsapp:  60,
    smart:     45,
    // customQuality = target size % (e.g. 50 → output ~50% of original)
    // ApyHub compression_percentage maps directly to this
    custom:    customQuality,
  };
  formData.append("compression_percentage", String(compressionMap[preset]));

  onProgress?.(5);

  // Simulate smooth progress while waiting for the API (no real-time progress from ApyHub)
  // Estimate ~1 MB/s upload + ~10s processing as baseline, capped at 92%
  const fileSizeMB   = file.size / (1024 * 1024);
  const estimatedMs  = Math.max(8000, fileSizeMB * 1200 + 10000); // min 8s
  const startTime    = Date.now();
  let   animFrame: ReturnType<typeof setTimeout>;
  let   done        = false;

  const tick = () => {
    if (done) return;
    const elapsed  = Date.now() - startTime;
    const fraction = Math.min(elapsed / estimatedMs, 1);
    // Ease-out curve: fast start, slows near 92% ceiling
    const simulated = Math.round(5 + fraction * 87 * (1 - fraction * 0.3));
    onProgress?.(Math.min(simulated, 92));
    animFrame = setTimeout(tick, 400);
  };
  animFrame = setTimeout(tick, 400);

  try {
    const res = await fetch("/api/compress-video", {
      method: "POST",
      body: formData,
    });

    done = true;
    clearTimeout(animFrame);

    if (!res.ok) {
      // Try JSON first, fall back to text for HTML error pages
      const contentType = res.headers.get("content-type") ?? "";
      let message = "Compression failed.";
      if (contentType.includes("application/json")) {
        const err = await res.json().catch(() => null);
        message = err?.error ?? `Server error (${res.status})`;
      } else {
        const text = await res.text().catch(() => "");
        // Strip HTML tags if it's an HTML error page
        message = text.replace(/<[^>]+>/g, "").trim().slice(0, 200) || `Server error (${res.status})`;
      }
      throw new Error(message);
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
