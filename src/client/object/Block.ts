export class Block {
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;

  constructor(x: number, y: number) {
    this._x = x / 3;
    this._y = y / 3;
    this._width = 135 / 3;
    this._height = 135 / 3;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this._x, this._y, this._width, this._height);
  }
}