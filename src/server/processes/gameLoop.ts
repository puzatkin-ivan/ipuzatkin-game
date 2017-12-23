import {GameContext} from "../object/GameContext";
import {sortTable} from "./sortTable";
import {updateParametersPlayer} from "./updateParametersPlayer";

export function gameLoop(socketServer: SocketIO.Server, gameContext: GameContext, deltaTime: number, playersForDraw: object, playersForTable: any, bullets: any) {
  for (const playerId of Object.keys(gameContext.players)) {
    const player = gameContext.players[playerId];
    updateParametersPlayer(socketServer, gameContext.bullets, gameContext.blocks, player, deltaTime);
    playersForDraw[playerId] = player.serializationForDraw();
    playersForTable.push(player.serializationForTable());
  }

  for (const bullet of gameContext.bullets) {
    bullet.move(deltaTime);
    bullet.collision(gameContext);
    if (bullet.isDead) {
      gameContext.bullets.splice(gameContext.bullets.indexOf(bullet), 1);
    }
    bullets.push(bullet.serialization());
  }

  sortTable(playersForTable);
}