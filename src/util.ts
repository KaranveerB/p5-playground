import { P5CanvasInstance } from "@p5-wrapper/react";

export function unreachable(): never {
  throw new Error("unreachable");
}

export type DrawContext = { p5: P5CanvasInstance; xm: number; ym: number };

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


