export class Shooter {
 private _x: number;
 private _y: number;
 private _height = 25;
 private _width = 25;
 private _heightHP = 8;
 private _lengthHP = 25;

  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "#348eda";
    context.fillRect(this._x, this._y, this._width, this._height);

    const x = this._x;
    const y = this._y - 10;
    const radiusSemicircle = this._heightHP / 2;
    context.beginPath();
    context.fillStyle = "#1ec400";
    context.strokeStyle = "#ffffff";
    context.lineWidth = 3;
    context.arc(x + radiusSemicircle, y + radiusSemicircle, radiusSemicircle, 0.5 * Math.PI, 1.5 * Math.PI);
    context.moveTo(x + radiusSemicircle, y);
    context.lineTo(x + this._lengthHP - radiusSemicircle, y);
    context.arc(x + this._lengthHP - radiusSemicircle, y + radiusSemicircle, radiusSemicircle, 1.5 * Math.PI, 2.5 * Math.PI);
    context.lineTo(x + radiusSemicircle, y + this._heightHP);
    context.stroke();
    context.fill();
    context.closePath();
  }
}