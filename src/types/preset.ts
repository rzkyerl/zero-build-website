export type PresetId = "instagram" | "whatsapp" | "smart" | "custom";

export interface Preset {
  id: PresetId;
  label: string;
  desc: string;
}
