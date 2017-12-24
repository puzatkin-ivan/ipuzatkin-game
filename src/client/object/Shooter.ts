export class Shooter {
  private _x: number;
  private _y: number;
  private _health: number;
  private _height = 125 / 3;
  private _width = 125 / 3;
  private _direction: string;
  private _playerId: string;
  private _nickname: string;

  constructor(player: any, playerId: string) {
    this._x = player.x / 3 - this._width / 2;
    this._y = player.y / 3 - this._height / 2;
    this._health = player.health;
    this._direction = player.direction;
    this._playerId = playerId;
    this._nickname = player.nickname;
  }

  draw(context: CanvasRenderingContext2D, currentPlayerId: string) {
    if (this._health === 0) {
      context.fillStyle = "#494949";
    } else if (this._playerId === currentPlayerId) {
      context.fillStyle = "#ffc200";
    } else {
      context.fillStyle = "#348eda";
    }
    context.fillRect(this._x, this._y, this._width, this._height);

    if (this._health != 0) {
      const coeffCoord = this._health / 100;
      const width = this._width * (1 - coeffCoord);
      const height = this._height * (1 - coeffCoord);
      const x = this._x + (this._width - width) / 2;
      const y = this._y + (this._height - height) / 2;
      context.beginPath();
      context.fillStyle = "#bf7079";
      context.fillRect(x, y, width, height);
      context.closePath();
    }
    context.fillStyle = "#58605f";
    context.font = 'bold 12px sans-serif';
    context.fillText("" + this._nickname, this._x - 10, this._y - 5)
  }

  drawGun(context: CanvasRenderingContext2D) {
    context.fillStyle = "#000";
    if (this._direction === "direction_right") {
      context.fillRect(this._x + this._width, this._y + this._height / 3.5, 5, 16);
    } else if (this._direction === "direction_left") {
      context.fillRect(this._x - 5, this._y + this._height / 3.5, 5, 16);
    } else  if (this._direction === "direction_up") {
      context.fillRect(this._x + this._width / 3.5, this._y - 5, 16, 5);
    } else if (this._direction === "direction_down") {
      context.fillRect(this._x + this._width / 3.5, this._y + this._height, 16, 5);
    }
  }
}