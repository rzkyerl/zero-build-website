/** Merge class names (lightweight cx helper — no extra dep needed) */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
