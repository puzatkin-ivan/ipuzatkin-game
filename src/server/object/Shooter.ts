import {Direction} from "../../common/direction";
import {GameContext} from "./GameContext";
import {Bullet} from "./Bullet";
import {KeyMap} from "./KeyMap";
import {Parameters} from "../../common/parameters";

export class Shooter {
  public x: number;
  public y: number;
  public health: number;
  public killCount: number;
  public deathCount: number;
  public score: number;
  public isShooting: boolean;
  public isDead: boolean;
  public isShowTable: boolean;
  public checkTime: number;
  public width = 125;
  public height = 125;
  public direction: Direction;
  public playerId: string;
  public nickname: string;
  public texture: number;
  private keyMap: KeyMap;
  private _lastFireTimeStamp = Date.now();

  constructor(x: number, y: number, playerId: string) {
    this.x = x;
    this.y = y;
    this.keyMap = new KeyMap();
    this.health = 100;
    this.killCount = 0;
    this.deathCount = 0;
    this.playerId = playerId;
    this.isShooting = false;
    this.isDead = false;
    this.isShowTable = false;
    this.direction = Direction.RIGHT;
    this.checkTime = Date.now();
    this.score = 0;
    this.texture =  Math.round(1 - 0.5 + Math.random() * (4 - 1 + 1));
  }

  serializationForDraw(): object {
    return {
      x: this.x,
      y: this.y,
      isDead: this.isDead,
      health: this.health,
      direction: this.direction,
      nickname: this.nickname || "",
      playerId: this.playerId,
      texture: this.texture,
    }
  }

  serializationForTable(): object {
    return {
      playerId: this.playerId || "",
      killCount: this.killCount,
      deathCount: this.deathCount,
      score: this.score,
      isDead: this.isDead,
      nickname: this.nickname || "",
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
      }
    } else if (this.checkTime > 3000) {
      this.respawn();
    }
  }

  updateDirection() {
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
    const singleDirectionMove = deltaMove;
    const multiDirectionMove = deltaMove / Math.sqrt(2);

    if (this.keyMap.key.keyW.isPressed) {
      if (this.keyMap.key.keyA.isPressed) {
        this.y -= multiDirectionMove;
        this.x -= multiDirectionMove;
      } else if (this.keyMap.key.keyD.isPressed) {
        this.y -= multiDirectionMove;
        this.x += multiDirectionMove;
      } else {
        this.y -= singleDirectionMove;
      }
    } else if (this.keyMap.key.keyS.isPressed) {
      if (this.keyMap.key.keyA.isPressed) {
        this.y += multiDirectionMove;
        this.x -= multiDirectionMove;
      } else if (this.keyMap.key.keyD.isPressed) {
        this.y += multiDirectionMove;
        this.x += multiDirectionMove;
      } else {
        this.y += singleDirectionMove;
      }
    } else if (this.keyMap.key.keyA.isPressed) {
      this.x -= singleDirectionMove;
    } else if (this.keyMap.key.keyD.isPressed) {
      this.x += singleDirectionMove;
    }
  }

  fire(bullets: any) {
    if (this.isShooting) {
      const FIRE_DELAY = Parameters.FIRE_DELAY;
      const currentTimeStamp = Date.now();
      const deltaTime = currentTimeStamp - this._lastFireTimeStamp;
      if (deltaTime > FIRE_DELAY) {
        this._lastFireTimeStamp = currentTimeStamp;
        bullets.push(new Bullet(this.x, this.y, this.direction, this.playerId));
      }
    }
  }

  updateScore() {
    if (this.killCount == 0) {
      if (this.deathCount == 0) {
        this.score = -1;
      } else {
        this.score = 0;
      }
    } else {
      if (this.deathCount == 0) {
        this.score = this.killCount;
      } else {
        this.score = this.killCount / this.deathCount;
      }
    }
  }

  respawn() {
    if (this.checkTime > 3000) {
      this.health = 100;
      const numberPlace = Math.floor(10 * Math.random());
      this.x = GameContext.INITIAL_COORDINATES[numberPlace].x;
      this.y = GameContext.INITIAL_COORDINATES[numberPlace].y;
      this.isDead = false;
      this.keyMap = new KeyMap();
    }
  }
}
