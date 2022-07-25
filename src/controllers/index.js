export class Shape {
  constructor(props) {
    this.status = 1;
  }

  finish() {
    this.status = -1;
    return this;
  }

}
