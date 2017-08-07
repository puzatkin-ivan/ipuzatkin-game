import {GameContext} from "./GameContext";
import {Shooter} from "./Shooter";
import {Block} from "./Block";
import {GameField} from "../../client/object/GameField";

export class Bullet {
  public x: number;
  public y: number;
  private _width = 10;
  private _height = 10;
  public isDead: boolean;
  private _playerId: string;

  constructor(x: number, y: number, playerId: string) {
    this.x = x;
    this.y = y;
    this._playerId = playerId;
    this.isDead = false;
  }

  move(deltaTime: number) {
    if (!this.isDead) {
      const SPEED = 400;
      const deltaMove: number = SPEED * deltaTime / 1000;
      this.x += deltaMove;
    }
  }

  collision(gameContext: GameContext) {

    if (this.x <= 0 && this.x >= GameField.WIDTH_CANVAS || this.y <= 0 && this.y >= GameField.HEIGHT_CANVAS) {
      this.isDead = true;
    }

    if (!this.isDead) {
      for (const block of Object.keys(gameContext.blocks)) {
        const intervalForX: boolean = this.x <= gameContext.blocks[block].x + Block.WIDTH && this.x + this._width >= gameContext.blocks[block].x;

        if (intervalForX) {
          if (this.y + this._height >= gameContext.blocks[block].y && this.y + this._height < gameContext.blocks[block].y + Block.HEIGHT) {
            this.isDead = true;
            break;
          } else if (this.y > gameContext.blocks[block].y && this.y < gameContext.blocks[block].y + Block.HEIGHT) {
            this.isDead = true;
            break;
          }
        }
      }

      for (const shooter of Object.keys(gameContext.players)) {
        const intervalForX = this.x < gameContext.players[shooter].x + Shooter.WIDTH && this.x + this._width > gameContext.players[shooter].x;

        if (gameContext.players[shooter] != gameContext.players[this._playerId]) {
          if (intervalForX) {
            if (this.y + this._height > gameContext.players[shooter].y && this.y + this._height < gameContext.players[shooter].y + Shooter.HEIGHT) {
              gameContext.players[shooter].health = Math.max(gameContext.players[shooter].health - 10, 0);
              this.isDead = true;
              break;
            } else if (this.y > gameContext.players[shooter].y && this.y < gameContext.players[shooter].y + Shooter.HEIGHT) {
              gameContext.players[shooter].health = Math.max(gameContext.players[shooter].health - 10, 0);
              this.isDead = true;
              break;
            }
          }
        }
      }
    }
  }
}