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
const vp: number = -2000;

export function sketch(p5: P5CanvasInstance) {
  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL);
  };

  const gen = () => {
    const kd_tree = new KDTree(0, 0, 100, 100, 10);
    fillKDTree(kd_tree, 20);
    kd_tree.precompute({ p5, xm: 3, ym: 3 });
    return kd_tree;
  };
  const xm = 3;
  const ym = 3;
  const x = -xm * 100 / 2;
  const y = -ym * 100 / 2;
  const kd_trees: Moving<KDTree> = new Moving(5, 10, vp, 750, x, y, gen);

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
    kd_trees.poll({ p5, xm: 3, ym: 3 });
    p5.pop();

    p5.smooth();
  };
}
