import { P5CanvasInstance } from "@p5-wrapper/react";
import p5, { Vector } from "p5";

import { KDTree, fillKDTree } from "./p5e/kdTree";
import { Moving } from "./p5e/moving";

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

  const xm = 3;
  const ym = 3;
  //p5.translate((-xm * kdTree.width()) / 2, (-ym * kdTree.height()) / 2);
  const x = -xm * kdTree.width() / 2;
  const y = -ym * kdTree.height() / 2;
  const gen = () => {
    const kdTree = new KDTree();
    fillKDTree(kdTree, 20);
    return kdTree;
  };
  const kdTrees: Moving<KDTree> = new Moving(10, 15, vp, 1000, x, y, gen);

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

    p5.push();
    //kdTree.draw({ p5, xm: 3, ym: 3 })
    kdTrees.poll({ p5, xm: 3, ym: 3 });
    p5.pop();

    p5.smooth();
  };
}
