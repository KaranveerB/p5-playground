import { Drawable, DrawContext } from "./../util"

export class Container<T extends Drawable> {
  constructor(
    public z: number,
    private data: T,
  ) {}

  public draw(ctx: DrawContext) {
    this.data.draw(ctx);
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
    console.log(max)
    console.log(min)
    console.log(interval)
    for (var z = min; z <= max; z += interval) {
      this.data.push(new Container(z, gen()))
      console.log(z)
    }
  }

  public poll(ctx: DrawContext) {
    for (var i = 0; i < this.data.length; i++) {
      ctx.p5.push();
      ctx.p5.translate(this.translate_x, this.translate_y, this.data[i].z)
      this.data[i].draw(ctx);
      this.data[i].z += this.speed;
      if (this.data[i].z > this.max) {
        this.data[i] = new Container(this.data[i].z - this.reset_val, this.gen())
      }
      ctx.p5.pop();
    }
  }
}
