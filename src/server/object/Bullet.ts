import {GameContext} from "./GameContext";
import {GameField} from "../../client/object/GameField";
import {Direction} from "../../common/direction";
import {Parameters} from "../../common/parameters";

export class Bullet {
  public x: number;
  public y: number;
  public static WIDTH = 10;
  public static HEIGHT = 10;
  public isDead: boolean;
  private _playerId: string;
  private _direction: Direction;

  constructor(x: number, y: number, playerId: string) {
    this.x = x;
    this.y = y;
    this._playerId = playerId;
    this.isDead = false;
    this._direction = Direction.RIGHT;
  }

  serialization(): object {
    return {
      x: this.x,
      y: this.y,
    }
  }

  setDirection(gameContext: GameContext) {
    const player = gameContext.players[this._playerId];
    if (player.direction === Direction.UP) {
      this._direction = Direction.UP;
    } else if (player.direction === Direction.DOWN) {
      this._direction = Direction.DOWN;
    } else if (player.direction === Direction.LEFT) {
      this._direction = Direction.LEFT;
    } else if (player.direction === Direction.RIGHT) {
      this._direction = Direction.RIGHT;
    }
  }

  move(deltaTime: number) {
    if (!this.isDead) {
      const SPEED = Parameters.SPEED_BULLET;
      const deltaMove: number = SPEED * deltaTime / 1000;
      if (this._direction === Direction.LEFT) {
        this.x -= deltaMove;
      } else if (this._direction === Direction.UP) {
        this.y -= deltaMove;
      } else if (this._direction === Direction.RIGHT) {
        this.x += deltaMove;
      } else if (this._direction === Direction.DOWN) {
        this.y += deltaMove;
      }
    }
  }

  collision(gameContext: GameContext) {

    if (this.x < 0 || this.x > GameField.WIDTH_CANVAS || this.y < 0 || this.y > GameField.HEIGHT_CANVAS) {
      this.isDead = true;
    }

    if (!this.isDead) {
      for (const block of gameContext.blocks) {
        const intervalForX: boolean = this.x <= block.x + block.width && this.x + Bullet.WIDTH >= block.x;

        if (intervalForX) {
          if (this.y + Bullet.HEIGHT >= block.y && this.y + Bullet.HEIGHT < block.y + block.height) {
            this.isDead = true;
            break;
          } else if (this.y > block.y && this.y < block.y + block.height) {
            this.isDead = true;
            break;
          }
        }
      }

      for (const shooter of Object.keys(gameContext.players)) {
        const player = gameContext.players[shooter];
        const intervalForX = this.x < gameContext.players[shooter].x + player.width && this.x + Bullet.WIDTH > gameContext.players[shooter].x;

        if (gameContext.players[shooter] != gameContext.players[this._playerId]) {
          if (intervalForX) {
            if (this.y + Bullet.HEIGHT > gameContext.players[shooter].y && this.y + Bullet.HEIGHT < gameContext.players[shooter].y + player.height) {
              gameContext.players[shooter].health = Math.max(gameContext.players[shooter].health - 25, 0);
              this.isDead = true;
            } else if (this.y > gameContext.players[shooter].y && this.y < gameContext.players[shooter].y + player.height) {
              gameContext.players[shooter].health = Math.max(gameContext.players[shooter].health - 25, 0);
              this.isDead = true;
            }
          }
        }
        if (gameContext.players[shooter].health === 0 && !gameContext.players[shooter].isDead) {
          gameContext.players[shooter].isDead = true;
          gameContext.players[shooter].checkTime = Date.now();
          gameContext.players[shooter].dead += 1;
          gameContext.players[this._playerId].frag += 1;
        }
      }
    }
  }
}