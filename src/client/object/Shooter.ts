export class Shooter {
  private _x: number;
  private _y: number;
  private _health: number;
  private _height = 30;
  private _width = 30;
  private _heightHP = 8;
  private _direction: string;

  constructor(x, y, health, direction) {
    this._x = x - this._width / 2;
    this._y = y - this._height / 2;
    this._health = health;
    this._direction = direction;
  }


  draw(context: CanvasRenderingContext2D) {
    if (this._health === 0) {
      context.fillStyle = "#494949";
    } else {
      context.fillStyle = "#348eda";
    }
    context.fillRect(this._x, this._y, this._width, this._height);

    const y = this._y - 10;
    const coeffCoord = this._health / 100;
    context.beginPath();
    context.fillStyle = "#7cc26e";
    context.fillRect(this._x, y, this._width, this._heightHP);
    context.fillStyle = "#bf7079";
    context.fillRect(this._x + coeffCoord * this._width, y, (1 - coeffCoord) * this._width, this._heightHP);
    context.closePath();
  }

  drawGun(context: CanvasRenderingContext2D) {
    context.fillStyle = "#000";
    if (this._direction === "direction_right") {
      context.fillRect(this._x + this._width, this._y + this._height / 3, 5, 10);
    } else if (this._direction === "direction_left") {
      context.fillRect(this._x - 5, this._y + this._height / 3, 5, 10);
    } else  if (this._direction === "direction_up") {
      context.fillRect(this._x + this._width / 3, this._y - 5, 10, 5);
    } else if (this._direction === "direction_down") {
      context.fillRect(this._x + this._width / 3, this._y + this._height, 10, 5);
    }
  }
}