// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LenisInstance = any;

declare global {
  interface Window {
    lenis?: LenisInstance;
  }
}

export {};
