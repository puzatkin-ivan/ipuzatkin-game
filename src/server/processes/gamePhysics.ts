import {Shooter} from "../object/Shooter";
import {Block} from "../object/Block";
import {GameField} from "../../client/object/GameField";
import {GameContext} from "../object/GameContext";

export function gamePhysics(gameContext: GameContext, playerId: string) {
  collisionBorderAndPlayer(gameContext.players[playerId]);
  collisionBlockAndPlayer(gameContext.players[playerId], gameContext.blocks);
}

function collisionBorderAndPlayer(player: Shooter) {
  const MIN_POSITION_FOR_XY = GameField.WIDTH_BORDER_GAMES_FIELD + player.width / 2 ;
  const MAX_POSITION_FOR_X = GameField.WIDTH_CANVAS - GameField.WIDTH_BORDER_GAMES_FIELD - player.width/2;
  const MAX_POSITION_FOR_Y = GameField.HEIGHT_CANVAS - GameField.WIDTH_BORDER_GAMES_FIELD - player.height/2;

  player.x = Math.min(player.x, MAX_POSITION_FOR_X);
  player.x = Math.max(player.x, MIN_POSITION_FOR_XY);
  player.y = Math.min(player.y, MAX_POSITION_FOR_Y);
  player.y = Math.max(player.y, MIN_POSITION_FOR_XY);
}

function collisionBlockAndPlayer(player: Shooter, BlocksMap) {
  const xPlayer1 = player.x - player.width / 2;
  const xPlayer2 = player.x + player.width / 2;
  const yPlayer1 = player.y - player.height / 2;
  const yPlayer2 = player.y + player.height / 2;

  for (const block of BlocksMap) {
    const intervalForY = yPlayer1 < block.y + Block.HEIGHT && yPlayer2> block.y;
    const intervalForX = xPlayer1 < block.x + Block.WIDTH && xPlayer2 > block.x;


    if (intervalForX) {
      if (yPlayer2 > block.y && yPlayer2 < block.y + 0.3 * Block.HEIGHT) {
        player.y = block.y - player.height / 2;
      } else if (yPlayer1 > block.y + 0.7 * Block.HEIGHT && yPlayer1 < block.y + Block.HEIGHT) {
        player.y = block.y + Block.HEIGHT + player.height / 2;
      }
    }
    if (intervalForY) {
      if (xPlayer2 >= block.x && xPlayer2 <= block.x + 0.2 * Block.WIDTH) {
        player.x = block.x - player.width / 2;
      } else if (xPlayer1 >= block.x + 0.8 * Block.WIDTH && xPlayer1 <= block.x + Block.WIDTH) {
        player.x = block.x + Block.WIDTH + player.width / 2;
      }
    }
  }
}