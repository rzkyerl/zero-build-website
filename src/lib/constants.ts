import type { Preset } from "@/types/preset";

export const ACCEPTED_TYPES =
  "image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm";

export const ACCEPTED_TYPES_ARRAY = ACCEPTED_TYPES.split(",");

export const PRESETS: Preset[] = [
  { id: "instagram", label: "Instagram Ready", desc: "Reels & Feed · H.264 CRF 18" },
  { id: "whatsapp", label: "WhatsApp Ready", desc: "Under 16 MB · CRF 26" },
  { id: "smart", label: "Smart Auto", desc: "Any platform · CRF 22" },
  { id: "custom", label: "Custom", desc: "Set target output size" },
];

/** Simulated output size ratio per preset (for demo purposes) */
export const PRESET_REDUCTION_RATIO: Record<string, number> = {
  instagram: 0.35,
  whatsapp: 0.18,
  smart: 0.28,
};
