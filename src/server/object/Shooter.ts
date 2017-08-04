import {Direction} from "../direction";
import {GameField} from "../../client/object/GameField";
import {Block} from "./Block";
import {GameContext} from "../../GameContext";

export class Shooter {
  public x: number;
  public y: number;
  public xBullet: number;
  public yBullet: number;
  public numberBullet: number;
  public isShooting: boolean;
  public health: number;
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
    },
    keySpace: {
      code: 32,
      isPressed: false,
    }
  };


  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.health = 100;
    this.isShooting = false;
    this.numberBullet = 5;
    this.xBullet = this.x + Shooter.WIDTH;
    this.yBullet = this.y
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
        this.isShooting = true;
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

    if (!this.isShooting) {
      this.xBullet = this.x + Shooter.WIDTH;
      this.yBullet = this.y
    }
  }

  moveBullet(deltaTime: number) {
    if (this.isShooting) {
      const SPEED = 200;
      const DELTA_MOVE: number = SPEED * deltaTime / 1000;

      this.xBullet += DELTA_MOVE;

      if (this.xBullet > GameField.WIDTH_CANVAS) {
        this.xBullet = this.x + Shooter.WIDTH;
        this.yBullet = this.y;
        this.isShooting = false;
      }
    }
  }

  collisionAndObject(BlockMap) {
    for (const block of BlockMap) {
      const intervalForY = this.yBullet < block.y + Block.HEIGHT && this.yBullet + 5 > block.y;
      const intervalForX = this.xBullet < block.x + Block.WIDTH && this.xBullet + 5 > block.x;


      if (intervalForX) {
        if (this.yBullet + 5 > block.y && this.yBullet + 5 < block.y + 0.3 * Block.HEIGHT) {
          this.xBullet = this.x + Shooter.WIDTH;
          this.yBullet = this.y;
          this.isShooting = false;
          break;
        } else if (this.yBullet > block.y + 0.7 * Block.HEIGHT && this.yBullet < block.y + Block.HEIGHT) {
          this.xBullet = this.x + Shooter.WIDTH;
          this.yBullet = this.y;
          this.isShooting = false;
          break;
        }
      }
      if (intervalForY) {
        if (this.xBullet + 5 > block.x && this.xBullet + 5 < block.x + 0.2 * Block.WIDTH) {
          this.xBullet = this.x + Shooter.WIDTH;
          this.yBullet = this.y;
          this.isShooting = false;
          break;
        } else if (this.xBullet > block.x + 0.8 * Block.WIDTH && this.xBullet < block.x + Block.WIDTH) {
          this.xBullet = this.x + Shooter.WIDTH;
          this.yBullet = this.y;
          this.isShooting = false;
          break;
        }
      }
    }

    for (const shooter in GameContext.players) {

      const intervalForY = this.yBullet < GameContext.players[shooter].y + Shooter.HEIGHT && this.yBullet + 5 > GameContext.players[shooter].y;
      const intervalForX = this.xBullet < GameContext.players[shooter].x + Shooter.WIDTH && this.xBullet + 5 > GameContext.players[shooter].x;


      if (intervalForX) {
        if (this.yBullet + 5 > GameContext.players[shooter].y && this.yBullet + 5 < GameContext.players[shooter].y + 0.3 * Shooter.HEIGHT) {
          this.xBullet = this.x + Shooter.WIDTH;
          this.yBullet = this.y;
          this.isShooting = false;
          GameContext.players[shooter].health -= 10;
          break;
        } else if (this.yBullet > GameContext.players[shooter].y + 0.7 * Shooter.HEIGHT && this.yBullet < GameContext.players[shooter].y + Shooter.HEIGHT) {
          this.xBullet = this.x + Shooter.WIDTH;
          this.yBullet = this.y;
          this.isShooting = false;
          GameContext.players[shooter].health -= 10;
          break;
        }
      }
      if (intervalForY) {
        if (this.xBullet + 5 > GameContext.players[shooter].x && this.xBullet + 5 < GameContext.players[shooter].x + 0.2 * Shooter.WIDTH) {
          this.xBullet = this.x + Shooter.WIDTH;
          this.yBullet = this.y;
          this.isShooting = false;
          GameContext.players[shooter].health -= 10;
          break;
        } else if (this.xBullet > GameContext.players[shooter].x + 0.8 * Shooter.WIDTH && this.xBullet < GameContext.players[shooter].x + Shooter.WIDTH) {
          this.xBullet = this.x + Shooter.WIDTH;
          this.yBullet = this.y;
          this.isShooting = false;
          GameContext.players[shooter].health -= 10;
          break;
        }
      }
      if (this.health < 0) {
        this.health = 0;
      }

    }
  }
}
