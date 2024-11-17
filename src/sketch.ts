import { P5CanvasInstance } from "@p5-wrapper/react";

const width: number = 1080 / 2;
const height: number = 1500 / 2;

// half width/height. Useful because origin is (0, 0)
const hw: number = width / 2;
const hh: number = height / 2;

// z-axis vanishing point
const vp: number = -6000;

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function lsjCurveX(
  p5: P5CanvasInstance,
  alpha: number,
  delta: number,
  t: number,
): number {
  return p5.sin(alpha * t + delta);
}

function lsjCurveY(p5: P5CanvasInstance, beta: number, t: number): number {
  return p5.sin(beta * t);
}

function distantLine(
  p5: P5CanvasInstance,
  x: number,
  y: number,
  z: number,
  dist: number,
) {
  let x2 = x,
    y2 = y,
    z2 = z + dist;
  p5.line(x, y, z, x2, y2, z2);
}

class Star {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public trail: number,
    public speed: number,
    public weight: number,
  ) {}
}

function genStar(out_of_range: boolean = false) {
  let z = out_of_range ? 0 : rand(-8000, 0);
  return new Star(
    rand(-hw, hw),
    rand(-hh, hh),
    z,
    rand(1000, 5000),
    rand(5, 100),
    rand(1, 10) / 10,
  );
}

export function sketch(p5: P5CanvasInstance) {
  p5.setup = () => {
    p5.createCanvas(width, height, p5.WEBGL);
  };

  let stars: Star[] = [];
  for (let i = 0; i < 40; i++) {
    stars.push(genStar());
  }

  p5.draw = () => {
    p5.translate(0, 0, 0);
    p5.background(30);

    p5.stroke(255);
    const sym_xm: number[] = [1, -1, 1, -1];
    const sym_ym: number[] = [1, 1, -1, -1];

    for (let i = 0; i < 4; i++) {
      const xm = sym_xm[i];
      const ym = sym_ym[i];

      distantLine(p5, xm * hw, 1.2 * ym * hh, 1000, 10000);
    }

    p5.strokeWeight(1);
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.z -= star.speed;
      if (star.trail + star.z < vp) {
        stars[i] = genStar(true);
      }
      p5.strokeWeight(star.weight);
      distantLine(p5, star.x, star.y, star.z, star.trail);
      p5.push();
      p5.translate(star.x, star.y, star.z);
      p5.sphere(star.weight * 2.5);
      p5.pop();
    }

    p5.smooth();
  };
}
