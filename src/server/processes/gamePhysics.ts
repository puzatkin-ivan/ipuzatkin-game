import {Shooter} from "../object/Shooter";
import {Ninepins} from "../object/Ninepins";
export function gamePhysics(shooter: Shooter, ninepinsMap) {
  //коллизи объектов
  collisionNinepinsAndShooter(shooter, ninepinsMap)//коллизии с объектами
}

function collisionNinepinsAndShooter(shooter: Shooter, ninepinsMap) {
  for (const ninepins of ninepinsMap) {
    const intervalForY = shooter.y < ninepins.y + Ninepins.HEIGHT && shooter.y + Shooter.HEIGHT > ninepins.y;
    const intervalForX = shooter.x < ninepins.x + Ninepins.WIDTH && shooter.x + Shooter.WIDTH > ninepins.x;


    if (intervalForX) {
      if (shooter.y + Shooter.HEIGHT > ninepins.y && shooter.y + Shooter.HEIGHT < ninepins.y + 0.3 * Ninepins.HEIGHT) {
        shooter.y = ninepins.y - Shooter.HEIGHT;
      } else if (shooter.y > ninepins.y + 0.7 * Ninepins.HEIGHT && shooter.y < ninepins.y + Ninepins.HEIGHT) {
        shooter.y = ninepins.y + Ninepins.HEIGHT;
      }
    }
    if (intervalForY) {
      if (shooter.x + Shooter.WIDTH >= ninepins.x && shooter.x + Shooter.WIDTH <= ninepins.x + 0.2 * Ninepins.WIDTH) {
        shooter.x = ninepins.x - Shooter.WIDTH;
      } else if (shooter.x >= ninepins.x + 0.8 * Ninepins.WIDTH && shooter.x <= ninepins.x + Ninepins.WIDTH) {
        shooter.x = ninepins.x + Ninepins.WIDTH;
      }
    }
  }
}