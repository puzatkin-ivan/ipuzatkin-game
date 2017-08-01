import {Direction} from "../direction";

export class Shooter {
  public x: number;
  public y: number;
  public static WIDTH = 25;
  public static HEIGHT = 25;
  private _directionX: Direction;
  private _directionY: Direction;
  private keyMap = {
    keyA: {
      code: 65,
      isPressed: false,
    },
    keyW: {
      code: 87,
      isPressed: false,
    },
    keyD: {
      code: 68,
      isPressed: false,
    },
    keyS: {
      code: 83,
      isPressed: false,
    }
  };


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

  setDirection(keyMap: any) {
    switch (keyMap.key) {
      case this.keyMap.keyA.code:
        this.keyMap.keyA.isPressed = keyMap.isPressed;
      break;
      case this.keyMap.keyW.code:
        this.keyMap.keyW.isPressed = keyMap.isPressed;
      break;
      case this.keyMap.keyD.code:
        this.keyMap.keyD.isPressed = keyMap.isPressed;
      break;
      case this.keyMap.keyS.code:
        this.keyMap.keyS.isPressed = keyMap.isPressed;
      break;
    }
  }

  move(deltaTime: number) {
    const SPEED = 200;
    const DELTA_MOVE = SPEED * deltaTime / 1000;

    if (this.keyMap.keyA.isPressed) {
      this.x -= DELTA_MOVE;
    }
    if (this.keyMap.keyW.isPressed) {
      this.y -= DELTA_MOVE;
    }
    if (this.keyMap.keyD.isPressed) {
      this.x += DELTA_MOVE;
    }
    if (this.keyMap.keyS.isPressed) {
      this.y += DELTA_MOVE;
    }
  }
}