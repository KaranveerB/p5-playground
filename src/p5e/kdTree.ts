import { Vector } from "p5";
import { unreachable, DrawContext, randInt, Drawable } from "./../util";

export class KDTreeNode {
  point: Vector;
  left: KDTreeNode | null;
  right: KDTreeNode | null;

  constructor(point: Vector) {
    this.point = point;
    this.left = null;
    this.right = null;
  }
}

export class KDTree implements Drawable {
  root: KDTreeNode | null;
  constructor(
    public min_x: number = 0,
    public min_y: number = 0,
    public max_x: number = 100,
    public max_y: number = 100,
  ) {
    this.root = null;
  }

  build(points: Vector[]) {
    this.root = this.buildRecursive(points, 0);
  }

  private vec_getter(depth: number): (v: Vector) => number {
    let m = depth % 2;
    switch (m) {
      case 0:
        return (v: Vector): number => v.x;
      case 1:
        return (v: Vector): number => v.y;
      default:
        unreachable();
    }
  }

  private buildRecursive(points: Vector[], depth: number): KDTreeNode | null {
    if (points.length === 0) {
      return null;
    }

    let axis = this.vec_getter(depth);
    points.sort((a, b) => axis(a) - axis(b));

    const medianIndex = Math.floor(points.length / 2);
    const medianPoint = points[medianIndex];

    const node = new KDTreeNode(medianPoint);

    node.left = this.buildRecursive(points.slice(0, medianIndex), depth + 1);
    node.right = this.buildRecursive(points.slice(medianIndex + 1), depth + 1);

    return node;
  }

  insert(point: Vector) {
    this.root = this.insertRecursive(this.root, point, 0);
  }

  private insertRecursive(
    node: KDTreeNode | null,
    point: Vector,
    depth: number,
  ) {
    if (node === null) {
      return new KDTreeNode(point);
    }

    const axis = this.vec_getter(depth);

    if (axis(point) < axis(node.point)) {
      node.left = this.insertRecursive(node.left, point, depth + 1);
    } else {
      node.right = this.insertRecursive(node.right, point, depth + 1);
    }
    return node;
  }

  public width(): number {
    return this.max_x - this.min_x;
  }

  public height(): number {
    return this.max_y - this.min_y;
  }

  drawNode(
    ctx: DrawContext,
    node: KDTreeNode | null,
    min_x: number,
    min_y: number,
    max_x: number,
    max_y: number,
    depth: number = 0,
  ) {
    if (node === null) {
      return;
    }
    const p = node.point;
    ctx.p5.ellipse(ctx.xm * p.x, ctx.ym * p.y, 1.5);
    if (depth % 2 == 0) {
      ctx.p5.line(ctx.xm * p.x, ctx.ym * min_y, ctx.xm * p.x, ctx.ym * max_y);
      if (node.left)
        this.drawNode(ctx, node.left, min_x, min_y, p.x, max_y, depth + 1);
      if (node.right)
        this.drawNode(ctx, node.right, p.x, min_y, max_x, max_y, depth + 1);
    } else {
      ctx.p5.line(ctx.xm * min_x, ctx.ym * p.y, ctx.xm * max_x, ctx.ym * p.y);
      if (node.left)
        this.drawNode(ctx, node.left, min_x, min_y, max_x, p.y, depth + 1);
      if (node.right)
        this.drawNode(ctx, node.right, min_x, p.y, max_x, max_y, depth + 1);
    }
  }

  public draw(ctx: DrawContext) {
    ctx.p5.noFill();
    ctx.p5.strokeWeight(0.3);
    ctx.p5.rect(
      ctx.xm * this.min_x,
      ctx.ym * this.min_y,
      ctx.xm * this.width(),
      ctx.ym * this.height(),
    );
    ctx.p5.fill(255)
    this.drawNode(
      ctx,
      this.root,
      this.min_x,
      this.min_y,
      this.max_x,
      this.max_y,
    );
  }
}

export function fillKDTree(kdTree: KDTree, numPoints: number) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const x = randInt(kdTree.min_x, kdTree.max_x);
    const y = randInt(kdTree.min_y, kdTree.max_y);
    points.push(new Vector(x, y));
  }
  points.forEach((point) => {
    kdTree.insert(point);
  });
}
