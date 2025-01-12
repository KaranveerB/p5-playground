import { P5CanvasInstance } from "@p5-wrapper/react";
import { Color } from "p5";

export function unreachable(): never {
  throw new Error("unreachable");
}

export type DrawContext = { p5: P5CanvasInstance; xm: number; ym: number };

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function gappedRandInt(min: number, max: number, gap: number): number {
  const mid = (max + min - gap) / 2;
  const val = randInt(min, max - gap);
  if (val > mid) {
    return val + gap;
  } else {
    return val;
  }
}

export interface Drawable {
  draw(ctx: DrawContext, fade: number): void;
}

export function drawTrail(
  p5: P5CanvasInstance,
  steps: number,
  x: number,
  y: number,
  trail_length: number,
  c1: Color,
  c2: Color,
  w1: number,
  w2: number,
): void {
  p5.push();
  const z_interval = trail_length / steps;
  for (let i = steps; i >= 0; i--) {
    const t = i / steps;
    const col = p5.lerpColor(c1, c2, t);
    const weight = p5.lerp(w1, w2, t);
    const z = z_interval * i;

    p5.stroke(col);
    p5.strokeWeight(weight);
    p5.line(x, y, z, x, y, z + z_interval);
  }
  p5.pop();
}

export function guassianRandom(): number {
  // Uses Box-Muller transform
  const u1 = Math.random();
  const u2 = Math.random();
  const r = Math.sqrt(-2 * Math.log(u1));
  const theta = 2 * Math.PI * u2;
  const val = 0.5 + (r * Math.sin(theta)) / 5;
  if (val < 0 || val > 1) {
    return guassianRandom();
  } else {
    return val;
  }
}

export function gappedGuassianRandom(
  min: number,
  max: number,
  gap: number,
): number {
  const mid = (max + min - gap) / 2;
  const rand = Math.round(guassianRandom() * (mid - min));
  const right = Math.random() > 0.5;
  if (right) {
    return max - rand;
  } else {
    return rand;
  }
}
