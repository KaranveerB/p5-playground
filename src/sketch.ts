import { P5CanvasInstance } from "@p5-wrapper/react";

function lsjCurveX(p5: P5CanvasInstance, alpha: number, delta: number, t: number): number {
  return p5.sin(alpha * t + delta);
}

function lsjCurveY(p5: P5CanvasInstance, beta: number, t: number): number {
  return p5.sin(beta * t);
}

export function sketch(p5: P5CanvasInstance) {
  const width: number = 1000;
  const height: number = 600;

  p5.setup = () => p5.createCanvas(width, height, p5.WEBGL);

  p5.draw = () => {
    p5.background(250);
    let scaleValue = 100;
    let frameTimeScale = 0.3;
    let iTimeScale = 2;
    p5.rotateY(p5.frameCount * 0.01);
    for(let i = 0; i < 170; i++) {
      let t = p5.radians((p5.frameCount * frameTimeScale) + (i * iTimeScale))
      p5.push()
      p5.translate(
        lsjCurveX(p5, 5, p5.PI / 2, t) * scaleValue,
        lsjCurveY(p5, 4, t) * scaleValue,
        lsjCurveY(p5, 1, t) * scaleValue,
      );
      p5.sphere(8, 6, 4);
      p5.pop()
    }
  }

}