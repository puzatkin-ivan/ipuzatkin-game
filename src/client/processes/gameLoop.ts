import {Direction} from "../../common/direction";
import {Spinner} from "../object/Spinner";
import {GameContext} from "../object/GameContext";
import {GameField} from "../object/GameField";
import {Block} from "../object/Block";
import {Bullet} from "../object/Bullet";
import {Shooter} from "../object/Shooter";
import {GameOver} from "../object/GameOver";
import {Table} from "../object/Table";

const spinners = [
  new Spinner(Spinner.X1, Spinner.Y1, Direction.DOWN),
  new Spinner(Spinner.X2, Spinner.Y2, Direction.LEFT),
  new Spinner(Spinner.X3, Spinner.Y3, Direction.UP),
];

let lastTimeFrame = Date.now();

export const gameLoop = (canvasContext: CanvasRenderingContext2D, gameContext: GameContext, table: Table, playerId: string) =>  {
  GameField.draw(canvasContext);
  for (const item of gameContext.blocks) {
    const block = new Block(item.x, item.y, item.width, item.height);
    block.draw(canvasContext);
  }

  for (const item of gameContext.bullets) {
    const bullet = new Bullet(item.x, item.y);
    bullet.draw(canvasContext);
  }

  for (const item of Object.keys(gameContext.players)) {
    const player = new Shooter(gameContext.players[item], item);
    player.draw(canvasContext, playerId);
    player.drawGun(canvasContext);
  }

  if (gameContext.players[playerId].isDead) {
    GameOver.draw(canvasContext);
    const currentTimeFrame = Date.now();
    const deltaTime = currentTimeFrame - lastTimeFrame;
    lastTimeFrame = currentTimeFrame;
    if (GameOver.initialization()) {
      for (const spinner of spinners) {
        spinner.move(deltaTime);
        spinner.draw(canvasContext);
      }
    }
  }

  table.draw(canvasContext, gameContext, playerId);
};