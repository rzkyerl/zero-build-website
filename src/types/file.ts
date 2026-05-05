export interface FileInfo {
  name: string;
  size: number;
  type: string;
  url: string;
  isVideo: boolean;
}

export type AppState = "idle" | "file-selected" | "processing" | "done";
