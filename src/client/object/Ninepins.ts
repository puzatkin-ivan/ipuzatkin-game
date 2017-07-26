export class Ninepins {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this._x, this._y, 200, 50);
  }
}