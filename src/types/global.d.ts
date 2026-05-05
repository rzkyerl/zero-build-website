declare global {
  interface Window {
    lenis?: {
      scrollTo(target: number | string | HTMLElement, opts?: { offset?: number; duration?: number }): void;
      raf(time: number): void;
      destroy(): void;
    };
  }
}

export {};
