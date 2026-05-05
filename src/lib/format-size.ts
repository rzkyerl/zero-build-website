export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function reductionPercent(original: number, compressed: number): number {
  return Math.round((1 - compressed / original) * 100);
}
