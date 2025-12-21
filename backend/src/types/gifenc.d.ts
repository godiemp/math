declare module 'gifenc' {
  export interface GIFEncoderInstance {
    writeFrame(
      data: Uint8Array | number[],
      width: number,
      height: number,
      options?: {
        palette?: number[][];
        delay?: number;
        transparent?: number;
        dispose?: number;
      }
    ): void;
    finish(): void;
    bytes(): Uint8Array;
  }

  export function GIFEncoder(): GIFEncoderInstance;

  export function quantize(
    data: Uint8Array | number[],
    maxColors: number,
    options?: {
      format?: 'rgb565' | 'rgba4444' | 'rgb444';
      oneBitAlpha?: boolean | number;
    }
  ): number[][];

  export function applyPalette(
    data: Uint8Array | number[],
    palette: number[][],
    format?: 'rgb565' | 'rgba4444' | 'rgb444'
  ): Uint8Array;

  export function nearestColorIndex(
    palette: number[][],
    color: number[]
  ): number;

  export function nearestColorIndexWithDistance(
    palette: number[][],
    color: number[]
  ): [number, number];

  export function snapColorsToPalette(
    palette: number[][],
    knownColors: number[][],
    threshold?: number
  ): void;

  export function prequantize(
    data: Uint8Array | number[],
    options?: { roundRGB?: number; roundAlpha?: number; oneBitAlpha?: boolean | number }
  ): void;
}
