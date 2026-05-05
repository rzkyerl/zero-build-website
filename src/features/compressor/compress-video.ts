import type { PresetId } from "@/types/preset";

interface VideoParams {
  crf: number;
  bitrate: string;
  maxrate: string;
  bufsize: string;
  fps: number;
  audioBitrate: string;
}

const PRESET_PARAMS: Record<string, VideoParams> = {
  instagram: {
    crf: 18,
    bitrate: "6000k",
    maxrate: "8000k",
    bufsize: "16000k",
    fps: 30,
    audioBitrate: "192k",
  },
  whatsapp: {
    crf: 26,
    bitrate: "1500k",
    maxrate: "2000k",
    bufsize: "4000k",
    fps: 30,
    audioBitrate: "128k",
  },
  smart: {
    crf: 22,
    bitrate: "3000k",
    maxrate: "4000k",
    bufsize: "8000k",
    fps: 30,
    audioBitrate: "160k",
  },
};

/**
 * Returns video encoding params for a given preset.
 * For "custom", bitrate is derived from target size and duration.
 */
export function getVideoParams(
  preset: PresetId,
  customQuality?: number,
  fileSizeBytes?: number,
  durationSec?: number
): VideoParams {
  if (preset === "custom" && customQuality !== undefined && fileSizeBytes && durationSec) {
    const targetBytes = fileSizeBytes * (customQuality / 100);
    const totalKbps = (targetBytes * 8) / durationSec / 1000;
    const audioKbps = 128;
    const videoKbps = Math.min(50000, Math.max(100, totalKbps - audioKbps));
    return {
      crf: 23,
      bitrate: `${Math.round(videoKbps)}k`,
      maxrate: `${Math.round(videoKbps * 1.5)}k`,
      bufsize: `${Math.round(videoKbps * 3)}k`,
      fps: 30,
      audioBitrate: `${audioKbps}k`,
    };
  }
  return PRESET_PARAMS[preset] ?? PRESET_PARAMS.smart;
}

/**
 * Builds the FFmpeg argument string for video compression.
 * Placeholder — wire up to ffmpeg.wasm or a server action when ready.
 */
export function buildVideoCommand(
  inputPath: string,
  outputPath: string,
  params: VideoParams
): string {
  return [
    `-y -i ${inputPath}`,
    `-c:v libx264 -preset fast`,
    `-crf ${params.crf} -b:v ${params.bitrate} -maxrate ${params.maxrate} -bufsize ${params.bufsize}`,
    `-r ${params.fps}`,
    `-c:a aac -b:a ${params.audioBitrate}`,
    `-movflags +faststart`,
    outputPath,
  ].join(" ");
}
