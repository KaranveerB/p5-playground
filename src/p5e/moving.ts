import { Drawable, DrawContext } from "./../util"

export class Container<T extends Drawable> {
  constructor(
    public z: number,
    private data: T,
  ) {}

  public draw(ctx: DrawContext, fade: number) {
    this.data.draw(ctx, fade);
  }
}

export class Moving<T extends Drawable> {
  private data: Container<T>[] = [];
  private reset_val: number;

  constructor(
    count: number,
    private speed: number,
    private min: number,
    private max: number,
    private translate_x: number,
    private translate_y: number,
    private gen: () => T,
  ) {
    this.reset_val = max - min;
    const interval = (max - min) / count;
    for (var z = min; z <= max; z += interval) {
      this.data.push(new Container(z, gen()))
    }
  }

  public poll(ctx: DrawContext) {
    for (var i = 0; i < this.data.length; i++) {
      ctx.p5.push();
      const data = this.data[i]
      ctx.p5.translate(this.translate_x, this.translate_y, data.z)
      data.draw(ctx, 1 - data.z / this.min);
      data.z += this.speed;
      if (data.z > this.max) {
        this.data[i] = new Container(this.data[i].z - this.reset_val, this.gen())
      }
      ctx.p5.pop();
    }
  }
}
