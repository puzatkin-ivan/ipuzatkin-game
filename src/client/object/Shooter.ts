export class Shooter {
 private _x: number;
 private _y: number;
 private _health: number;
 private _height = 30;
 private _width = 30;
 private _heightHP = 8;

  constructor(x, y, health) {
    this._x = x;
    this._y = y;
    this._health = health;
  }

  draw(context: CanvasRenderingContext2D) {
    if (this._health === 0) {
      context.fillStyle = "#494949";
    } else {
      context.fillStyle = "#348eda";
    }
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
    context.fillRect(this._x + this._width, this._y + this._height/3, 5, 10)
  }
}