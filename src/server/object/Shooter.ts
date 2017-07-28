import {Direction} from "../direction";

let keyMap = {
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

export class Shooter {
  public x: number;
  public y: number;
  public static WIDTH = 25;
  public static HEIGHT = 25;
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

  setDirection(KeyMap: any) {
    const DELTA_MOVE = 15 * Math.random();

    switch (KeyMap.key) {
      case keyMap.keyA.code:
        keyMap.keyA.isPressed = KeyMap.isPressed;
      break;
      case keyMap.keyW.code:
        keyMap.keyW.isPressed = KeyMap.isPressed;
      break;
      case keyMap.keyD.code:
        keyMap.keyD.isPressed = KeyMap.isPressed;
      break;
      case keyMap.keyS.code:
        keyMap.keyS.isPressed = KeyMap.isPressed;
      break;
    }

    if (keyMap.keyA.isPressed) {
      this.x -= DELTA_MOVE;
    }
    if (keyMap.keyW.isPressed) {
      this.y -= DELTA_MOVE;
    }
    if (keyMap.keyD.isPressed) {
      this.x += DELTA_MOVE;
    }
    if (keyMap.keyS.isPressed) {
      this.y += DELTA_MOVE;
    }

  }

  move(key: any ) {
    this.setDirection(key);
  }
}