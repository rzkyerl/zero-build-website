export interface FileInfo {
  name: string;
  size: number;
  type: string;
  url: string;
  isVideo: boolean;
}

export interface CompressResult {
  url: string;           // object URL of compressed output
  size: number;          // compressed file size in bytes
  format: string;        // e.g. "jpg", "webp", "mp4"
  mimeType: string;
}

export type AppState = "idle" | "file-selected" | "loading-ffmpeg" | "processing" | "done" | "error";
