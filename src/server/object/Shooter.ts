import {Direction} from "../direction";
import {GameContext} from "./GameContext";
import {Bullet} from "./Bullet";

export class Shooter {
  public x: number;
  public y: number;
  public isShooting: boolean;
  public health: number;
  public static WIDTH = 30;
  public static HEIGHT = 30;
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
    },
    keySpace: {
      code: 32,
      isPressed: false,
    }
  };
  private _lastFireTimeStamp = Date.now();


  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.health = 100;
    this.isShooting = false;
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
      case this.keyMap.keySpace.code:
        this.isShooting = keyMap.isPressed;
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

  fire(gameContext: GameContext, playerId: string) {
    if (this.isShooting) {
      const FIRE_DELAY = 200;
      const currentTimeStamp = Date.now();
      if ((currentTimeStamp - this._lastFireTimeStamp) > FIRE_DELAY) {
        this._lastFireTimeStamp = currentTimeStamp;
        gameContext.bullets.push(new Bullet(this.x + Shooter.WIDTH, this.y + Shooter.HEIGHT/3, playerId));
      }
    }
  }
}
