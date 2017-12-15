export class Bullet {
  private _x: number;
  private _y: number;
  private _width = 55 / 3;
  private _height = 55 / 3;

  constructor(x: number, y: number) {
    this._x = x / 3 - this._width / 2;
    this._y = y / 3 - this._height / 2;
  }
  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "#2c30ff";
    context.fillRect(this._x, this._y, this._width, this._height)
  }
}