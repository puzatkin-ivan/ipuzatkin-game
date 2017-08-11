import {Direction} from "../direction";
import {GameContext} from "./GameContext";
import {Bullet} from "./Bullet";

export class Shooter {
  public x: number;
  public y: number;
  public isShooting: boolean;
  public health: number;
  public width = 30;
  public height = 30;
  public direction: Direction;
  private _playerId: string;
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
    },
    arrowLeft: {
      code: 37,
      isPressed: false,
    },
    arrowUp: {
      code: 38,
      isPressed: false,
    },
    arrowRight: {
      code: 39,
      isPressed: false,
    },
    arrowDown: {
      code: 40,
      isPressed: false,
    },
  };
  private _lastFireTimeStamp = Date.now();


  constructor(x: number, y: number, playerId: string) {
    this.x = x;
    this.y = y;
    this.health = 100;
    this._playerId = playerId;
    this.isShooting = false;
    this.direction = Direction.RIGHT;
  }

  updateKeyMap(keyMap: any) {
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
      case this.keyMap.arrowLeft.code:
        this.keyMap.arrowLeft.isPressed = keyMap.isPressed;
        break;
      case this.keyMap.arrowUp.code:
        this.keyMap.arrowUp.isPressed = keyMap.isPressed;
        break;
      case this.keyMap.arrowRight.code:
        this.keyMap.arrowRight.isPressed = keyMap.isPressed;
        break;
      case this.keyMap.arrowDown.code:
        this.keyMap.arrowDown.isPressed = keyMap.isPressed;
        break;
    }
  }

  setDirection() {
    if (this.keyMap.arrowUp.isPressed) {
      this.direction = Direction.UP;
    } else if (this.keyMap.arrowDown.isPressed) {
      this.direction = Direction.DOWN
    } else if (this.keyMap.arrowLeft.isPressed) {
      this.direction = Direction.LEFT
    } else if (this.keyMap.arrowRight.isPressed) {
      this.direction = Direction.RIGHT;
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

  fire(gameContext: GameContext) {
    if (this.isShooting) {
      const FIRE_DELAY = 200;
      const currentTimeStamp = Date.now();
      if ((currentTimeStamp - this._lastFireTimeStamp) > FIRE_DELAY) {
        this._lastFireTimeStamp = currentTimeStamp;
        gameContext.bullets.push(new Bullet(this.x, this.y, this._playerId));
        gameContext.bullets[gameContext.bullets.length - 1].setDirection(gameContext);
      }
    }
  }
}
