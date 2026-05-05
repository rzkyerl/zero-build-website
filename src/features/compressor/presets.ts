import { PRESETS, PRESET_REDUCTION_RATIO } from "@/lib/constants";
import type { PresetId } from "@/types/preset";

export { PRESETS };

/**
 * Calculate the simulated output size for a given preset and quality.
 * In a real implementation this would be replaced by actual codec output.
 */
export function calcResultSize(
  originalBytes: number,
  preset: PresetId,
  quality: number
): number {
  const ratio =
    preset === "custom"
      ? quality / 100
      : (PRESET_REDUCTION_RATIO[preset] ?? 0.3);

  return Math.round(originalBytes * ratio);
}
