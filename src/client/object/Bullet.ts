export class Bullet {
  private _x: number;
  private _y: number;
  private _width = 10;
  private _height = 10;

  constructor(x: number, y: number) {
    this._x = x - this._width / 2;
    this._y = y - this._height / 2;
  }
  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "#2c30ff";
    context.fillRect(this._x, this._y, this._width, this._height)
  }
}