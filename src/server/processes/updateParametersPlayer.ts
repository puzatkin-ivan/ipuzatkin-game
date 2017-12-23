import {Shooter} from "../object/Shooter";
import {gamePhysics} from "./gamePhysics";

export function updateParametersPlayer(socketServer: SocketIO.Server, bullets: any, blocks: any, player: Shooter, deltaTime: number) {
  if (!player.isDead) {
    player.updateDirection();
    player.move(deltaTime);
    gamePhysics(player, blocks);
    player.fire(socketServer, bullets);
  } else {
    player.checkTime += deltaTime;
  }
  player.updateScore();
}