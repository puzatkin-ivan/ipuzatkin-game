export class Shooter {
 private _x: number;
 private _y: number;
 private _health: number;
 private _xBullet: number;
 private _yBullet: number;
 private _height = 25;
 private _width = 25;
 private _heightHP = 8;

  constructor(x, y, health, xBullet, yBullet) {
    this._x = x;
    this._y = y;
    this._health = health;
    this._xBullet = xBullet;
    this._yBullet = yBullet;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "#348eda";
    context.fillRect(this._x, this._y, this._width, this._height);

    const x = this._x;
    const y = this._y - 10;
    const coeffCoord = this._health / 100;
    context.beginPath();
    context.fillStyle = "#1ec400";
    context.strokeStyle = "#ffffff";
    context.lineWidth = 5;
    context.fillRect(x, y, this._width, this._heightHP);
    context.fillStyle = "#c4190f";
    context.fillRect(x + coeffCoord * this._width, y, (1 - coeffCoord) * this._width, this._heightHP);
    context.stroke();
    context.closePath();
  }

  drawGun(context: CanvasRenderingContext2D) {
    context.fillStyle = "#000";
    context.fillRect(this._x + this._width, this._y, 10, 10)
  }

  drawBullet(context: CanvasRenderingContext2D) {
    context.fillStyle = "#2c30ff";
    context.fillRect(this._xBullet, this._yBullet, 10, 10)
  }
}