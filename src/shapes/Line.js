import { Shape } from "./index";

export class Line extends Shape {
  constructor(x, y) {
    super();

    this.x1 = x;
    this.y1 = y;
    this.x2 = x;
    this.y2 = y;
    this.status = 1;
  }

  moveTo(x, y) {
    this.x2 = x;
    this.y2 = y;

    return this.new();
  }

  land(x, y) {
    his.x2 = x;
    this.y2 = y;
    this.status = 0;

    return this.new();
  }
}
