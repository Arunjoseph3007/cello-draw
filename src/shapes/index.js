export class Shape {

  constructor() {
    this.status = 1;
  }

  new = () => ({ ...this });
}
