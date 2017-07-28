export class Shooter {
 private _x: number;
 private _y: number;

  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "#348eda";
    context.fillRect(this._x, this._y, 25, 25);
  }
}