import {Direction} from "../../direction";
import {GameContext} from "./GameContext";
import {Bullet} from "./Bullet";

export class Shooter {
  public x: number;
  public y: number;
  public health: number;
  public isShooting: boolean;
  public isDead: boolean;
  public checkTime: number;
  public width = 30;
  public height = 30;
  public direction: Direction;
  public playerId: string;
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
    this.playerId = playerId;
    this.isShooting = false;
    this.isDead = false;
    this.direction = Direction.RIGHT;
    this.checkTime = Date.now();
  }

  updateKeyMap(keyMap: any) {
    if (!this.isDead) {
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
        case this.keyMap.arrowLeft.code:
          this.keyMap.arrowLeft.isPressed = keyMap.isPressed;
          this.isShooting = keyMap.isPressed;
          break;
        case this.keyMap.arrowUp.code:
          this.keyMap.arrowUp.isPressed = keyMap.isPressed;
          this.isShooting = keyMap.isPressed;
          break;
        case this.keyMap.arrowRight.code:
          this.keyMap.arrowRight.isPressed = keyMap.isPressed;
          this.isShooting = keyMap.isPressed;
          break;
        case this.keyMap.arrowDown.code:
          this.keyMap.arrowDown.isPressed = keyMap.isPressed;
          this.isShooting = keyMap.isPressed;
          break;
      }
    } else {
      if (keyMap.isPressed) {
        const currentTime = Date.now();
        const deltaTime = currentTime - this.checkTime;
        if (deltaTime > 3000) {
          this.health = 100;
          this.x = GameContext.INITIAL_COORDINATES[Math.floor(10 * Math.random())].x;
          this.y = GameContext.INITIAL_COORDINATES[Math.floor(10 * Math.random())].y;
          this.isDead = false;
        }
      }
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
    const SPEED = 500;
    const deltaMove = SPEED * deltaTime / 1000;

    if (this.keyMap.keyW.isPressed) {
      if (this.keyMap.keyA.isPressed) {
        this.y -= deltaMove / Math.sqrt(2);
        this.x -= deltaMove / Math.sqrt(2);
      } else if (this.keyMap.keyD.isPressed) {
        this.y -= deltaMove / Math.sqrt(2);
        this.x += deltaMove / Math.sqrt(2);
      } else {
        this.y -= deltaMove;
      }
    } else if (this.keyMap.keyS.isPressed) {
      if (this.keyMap.keyA.isPressed) {
        this.y += deltaMove / Math.sqrt(2);
        this.x -= deltaMove / Math.sqrt(2);
      } else if (this.keyMap.keyD.isPressed) {
        this.y += deltaMove / Math.sqrt(2);
        this.x += deltaMove / Math.sqrt(2);
      } else {
        this.y += deltaMove;
      }
    } else if (this.keyMap.keyA.isPressed) {
      this.x -= deltaMove;
    } else if (this.keyMap.keyD.isPressed) {
      this.x += deltaMove;
    }
  }

  fire(gameContext: GameContext) {
    if (this.isShooting) {
      const FIRE_DELAY = 500;
      const currentTimeStamp = Date.now();
      if ((currentTimeStamp - this._lastFireTimeStamp) > FIRE_DELAY) {
        this._lastFireTimeStamp = currentTimeStamp;
        gameContext.bullets.push(new Bullet(this.x, this.y, this.playerId));
        gameContext.bullets[gameContext.bullets.length - 1].setDirection(gameContext);
      }
    }
  }
}
