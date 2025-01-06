import { P5CanvasInstance } from "@p5-wrapper/react";
import p5, { Vector } from "p5";

import { KDTree, fillKDTree, drawKDTree } from "./p5-ds/kdTree";

const w: number = 1080 / 2;
const h: number = 1500 / 2;

// half width/height. Useful because origin is (0, 0)
const hw: number = w / 2;
const hh: number = h / 2;

// z-axis vanishing point
const vp: number = -6000;

export function sketch(p5: P5CanvasInstance) {
  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL);
  };

  const kdTree = new KDTree();
  fillKDTree(kdTree, 20); // Filling the KD-Tree with 20 random points

  p5.draw = () => {
    p5.translate(0, 0, 0);
    p5.background(30);

    p5.stroke(255);
    const sym_4 = [
      { xm: 1, ym: 1 },
      { xm: -1, ym: 1 },
      { xm: 1, ym: -1 },
      { xm: -1, ym: -1 },
    ];

    p5.stroke(255);
    p5.noFill();
    p5.push();
    const xm = 3;
    const ym = 3;
    p5.translate((-xm * kdTree.width()) / 2, (-ym * kdTree.height()) / 2);
    drawKDTree({ p5, xm: 3, ym: 3 }, kdTree);
    p5.pop();

    p5.smooth();
  };
}
