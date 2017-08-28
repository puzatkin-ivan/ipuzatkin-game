import {Shooter} from "../object/Shooter";
import {gamePhysics} from "./gamePhysics";

export function updateParametersPlayer(bullets: any, blocks: any, player: Shooter, deltaTime: number) {
  if (!player.isDead) {
    player.updateDirection();
    player.move(deltaTime);
    gamePhysics(player, blocks);
    player.fire(bullets);
  } else {
    player.checkTime = Date.now();
  }
  player.updateScore();
}