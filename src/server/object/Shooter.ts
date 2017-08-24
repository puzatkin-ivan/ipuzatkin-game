import {Direction} from "../../common/direction";
import {GameContext} from "./GameContext";
import {Bullet} from "./Bullet";
import {KeyMap} from "./KeyMap";
import {Parameters} from "../../common/parameters";

export class Shooter {
  public x: number;
  public y: number;
  public health: number;
  public frag: number;
  public dead: number;
  public score: number;
  public isShooting: boolean;
  public isDead: boolean;
  public isShowTable: boolean;
  public checkTime: number;
  public width = Parameters.WIDTH_SHOOTER;
  public height = Parameters.HEIGHT_SHOOTER;
  public direction: Direction;
  public playerId: string;
  public nickname: string;
  private keyMap: KeyMap;
  private _lastFireTimeStamp = Date.now();


  constructor(x: number, y: number, playerId: string) {
    this.x = x;
    this.y = y;
    this.keyMap = new KeyMap();
    this.health = 100;
    this.frag = 0;
    this.dead = 0;
    this.playerId = playerId;
    this.isShooting = false;
    this.isDead = false;
    this.isShowTable = false;
    this.direction = Direction.RIGHT;
    this.checkTime = Date.now();
    this.score = 0;
  }

  serializationForDraw(): object {
    return {
      x: this.x,
      y: this.y,
      isDead: this.isDead,
      health: this.health,
      direction: this.direction,
      nickname: this.nickname,
    }
  }

  serializationForTable(): object {
    return {
      frag: this.frag,
      dead: this.dead,
      score: this.score,
      isDead: this.isDead,
      nickname: this.nickname
    }
  }

  updateKeyMap(keyMap: any) {
    if (!this.isDead) {
      switch (keyMap.key) {
        case this.keyMap.key.keyA.code:
          this.keyMap.key.keyA.isPressed = keyMap.isPressed;
          break;
        case this.keyMap.key.keyW.code:
          this.keyMap.key.keyW.isPressed = keyMap.isPressed;
          break;
        case this.keyMap.key.keyD.code:
          this.keyMap.key.keyD.isPressed = keyMap.isPressed;
          break;
        case this.keyMap.key.keyS.code:
          this.keyMap.key.keyS.isPressed = keyMap.isPressed;
          break;
        case this.keyMap.key.arrowLeft.code:
          this.keyMap.key.arrowLeft.isPressed = keyMap.isPressed;
          this.isShooting = keyMap.isPressed;
          break;
        case this.keyMap.key.arrowUp.code:
          this.keyMap.key.arrowUp.isPressed = keyMap.isPressed;
          this.isShooting = keyMap.isPressed;
          break;
        case this.keyMap.key.arrowRight.code:
          this.keyMap.key.arrowRight.isPressed = keyMap.isPressed;
          this.isShooting = keyMap.isPressed;
          break;
        case this.keyMap.key.arrowDown.code:
          this.keyMap.key.arrowDown.isPressed = keyMap.isPressed;
          this.isShooting = keyMap.isPressed;
          break;
        case this.keyMap.key.keyTab.code:
          this.isShowTable = keyMap.isPressed;
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
          this.keyMap = new KeyMap();
        }
      }
    }
  }

  setDirection() {
    if (this.keyMap.key.arrowUp.isPressed) {
      this.direction = Direction.UP;
    } else if (this.keyMap.key.arrowDown.isPressed) {
      this.direction = Direction.DOWN
    } else if (this.keyMap.key.arrowLeft.isPressed) {
      this.direction = Direction.LEFT
    } else if (this.keyMap.key.arrowRight.isPressed) {
      this.direction = Direction.RIGHT;
    }
  }

  move(deltaTime: number) {
    const SPEED = Parameters.SPEED_PLAYER;
    const deltaMove = SPEED * deltaTime / 1000;

    if (this.keyMap.key.keyW.isPressed) {
      if (this.keyMap.key.keyA.isPressed) {
        this.y -= deltaMove / Math.sqrt(2);
        this.x -= deltaMove / Math.sqrt(2);
      } else if (this.keyMap.key.keyD.isPressed) {
        this.y -= deltaMove / Math.sqrt(2);
        this.x += deltaMove / Math.sqrt(2);
      } else {
        this.y -= deltaMove;
      }
    } else if (this.keyMap.key.keyS.isPressed) {
      if (this.keyMap.key.keyA.isPressed) {
        this.y += deltaMove / Math.sqrt(2);
        this.x -= deltaMove / Math.sqrt(2);
      } else if (this.keyMap.key.keyD.isPressed) {
        this.y += deltaMove / Math.sqrt(2);
        this.x += deltaMove / Math.sqrt(2);
      } else {
        this.y += deltaMove;
      }
    } else if (this.keyMap.key.keyA.isPressed) {
      this.x -= deltaMove;
    } else if (this.keyMap.key.keyD.isPressed) {
      this.x += deltaMove;
    }
  }

  fire(gameContext: GameContext) {
    if (this.isShooting) {
      const FIRE_DELAY = Parameters.FIRE_DELAY;
      const currentTimeStamp = Date.now();
      if ((currentTimeStamp - this._lastFireTimeStamp) > FIRE_DELAY) {
        this._lastFireTimeStamp = currentTimeStamp;
        gameContext.bullets.push(new Bullet(this.x, this.y, this.playerId));
        gameContext.bullets[gameContext.bullets.length - 1].setDirection(gameContext);
      }
    }
  }

  initializationData() {
    if (this.frag == 0) {
      if (this.dead == 0) {
        this.score = 0;
      } else {
        this.score = 1 / this.dead;
      }
    } else {
      if (this.dead == 0) {
        this.score = this.frag;
      } else {
        this.score = this.frag / this.dead;
      }
    }
  }
}
