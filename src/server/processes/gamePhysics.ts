import {Shooter} from "../object/Shooter";
import {Block} from "../object/Block";
import {GameField} from "../../client/object/GameField";
export function gamePhysics(shooter: Shooter, ninepinsMap) {
  //коллизи объектов
  collisionBorderAndPlayer(shooter);
  collisionBlockAndShooter(shooter, ninepinsMap)//коллизии с объектами
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

function collisionBlockAndShooter(shooter: Shooter, BlockMap) {
  for (const ninepins of BlockMap) {
    const intervalForY = shooter.y < ninepins.y + Block.HEIGHT && shooter.y + Shooter.HEIGHT > ninepins.y;
    const intervalForX = shooter.x < ninepins.x + Block.WIDTH && shooter.x + Shooter.WIDTH > ninepins.x;


    if (intervalForX) {
      if (shooter.y + Shooter.HEIGHT > ninepins.y && shooter.y + Shooter.HEIGHT < ninepins.y + 0.3 * Block.HEIGHT) {
        shooter.y = ninepins.y - Shooter.HEIGHT;
      } else if (shooter.y > ninepins.y + 0.7 * Block.HEIGHT && shooter.y < ninepins.y + Block.HEIGHT) {
        shooter.y = ninepins.y + Block.HEIGHT;
      }
    }
    if (intervalForY) {
      if (shooter.x + Shooter.WIDTH >= ninepins.x && shooter.x + Shooter.WIDTH <= ninepins.x + 0.2 * Block.WIDTH) {
        shooter.x = ninepins.x - Shooter.WIDTH;
      } else if (shooter.x >= ninepins.x + 0.8 * Block.WIDTH && shooter.x <= ninepins.x + Block.WIDTH) {
        shooter.x = ninepins.x + Block.WIDTH;
      }
    }
  }
}