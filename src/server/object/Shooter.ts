import {Direction} from "../direction";
enum keyMap {
  A = 65,
  W = 87,
  D = 68,
  S = 83,
}

export class Shooter {
  public x: number;
  public y: number;
  public static WIDTH = 50;
  public static HEIGHT = 50;
  private _directionX: Direction;
  private _directionY: Direction;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setDirectionX(direction: Direction) {
    this._directionX = direction;
  }

  setDirectionY(direction: Direction) {
    this._directionY = direction;
  }

  setDirection(key: any) {
    const DELTA_MOVE = 5;

    if (key === keyMap.D) {
      this.x += DELTA_MOVE;
    }
    if (key == keyMap.A) {
      this.x -= DELTA_MOVE;
    }
    if (key === keyMap.W) {
      this.y -= 5;
    }
    if (key === keyMap.S) {
      this.y += 5;
    }
  }

  move(key: any ) {
    this.setDirection(key);
    this._directionX = Direction.Close;
    this._directionY = Direction.Close;
  }
}