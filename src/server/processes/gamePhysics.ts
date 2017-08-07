import {Shooter} from "../object/Shooter";
import {Block} from "../object/Block";
import {GameField} from "../../client/object/GameField";
import {GameContext} from "../object/GameContext";
export function gamePhysics(gameContext: GameContext, playerId: string) {
  collisionBorderAndPlayer(gameContext.players[playerId]);
  collisionBlockAndShooter(gameContext.players[playerId], gameContext.blocks);
}

function collisionBorderAndPlayer(shooter: Shooter){
  const MIN_POSITION_FOR_XY = GameField.WIDTH_BORDER_GAMES_FIELD;
  const MAX_POSITION_FOR_X = GameField.WIDTH_CANVAS - GameField.WIDTH_BORDER_GAMES_FIELD - Shooter.WIDTH;
  const MAX_POSITION_FOR_Y = GameField.HEIGHT_CANVAS - GameField.WIDTH_BORDER_GAMES_FIELD - Shooter.HEIGHT;

  shooter.x = Math.min(shooter.x, MAX_POSITION_FOR_X);
  shooter.x = Math.max(shooter.x, MIN_POSITION_FOR_XY);
  shooter.y = Math.min(shooter.y, MAX_POSITION_FOR_Y);
  shooter.y = Math.max(shooter.y, MIN_POSITION_FOR_XY);
}

function collisionBlockAndShooter(shooter: Shooter, BlocksMap) {
  for (const block of Object.keys(BlocksMap)) {
    const intervalForY = shooter.y < BlocksMap[block].y + Block.HEIGHT && shooter.y + Shooter.HEIGHT > BlocksMap[block].y;
    const intervalForX = shooter.x < BlocksMap[block].x + Block.WIDTH && shooter.x + Shooter.WIDTH > BlocksMap[block].x;


    if (intervalForX) {
      if (shooter.y + Shooter.HEIGHT > BlocksMap[block].y && shooter.y + Shooter.HEIGHT < BlocksMap[block].y + 0.3 * Block.HEIGHT) {
        shooter.y = BlocksMap[block].y - Shooter.HEIGHT;
      } else if (shooter.y > BlocksMap[block].y + 0.7 * Block.HEIGHT && shooter.y < BlocksMap[block].y + Block.HEIGHT) {
        shooter.y = BlocksMap[block].y + Block.HEIGHT;
      }
    }
    if (intervalForY) {
      if (shooter.x + Shooter.WIDTH >= BlocksMap[block].x && shooter.x + Shooter.WIDTH <= BlocksMap[block].x + 0.2 * Block.WIDTH) {
        shooter.x = BlocksMap[block].x - Shooter.WIDTH;
      } else if (shooter.x >= BlocksMap[block].x + 0.8 * Block.WIDTH && shooter.x <= BlocksMap[block].x + Block.WIDTH) {
        shooter.x = BlocksMap[block].x + Block.WIDTH;
      }
    }
  }
}