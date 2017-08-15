export class Block {
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this._x, this._y, this._width, this._height);
  }
}