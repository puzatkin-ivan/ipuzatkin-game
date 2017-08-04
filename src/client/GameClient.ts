import {GameField} from "./object/GameField";
import {Shooter} from "./object/Shooter";
import {Block} from "./object/Block";
import {GameContext} from "../GameContext";

export namespace GameClient {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d");
  const blocks = [
    new Block(GameContext.block.block1.x, GameContext.block.block1.y),
    new Block(GameContext.block.block2.x, GameContext.block.block2.y),
    new Block(GameContext.block.block3.x, GameContext.block.block3.y),
    new Block(GameContext.block.block4.x, GameContext.block.block4.y),
    new Block(GameContext.block.block5.x, GameContext.block.block5.y),
    new Block(GameContext.block.block6.x, GameContext.block.block6.y),
  ];

  let ShootersMap = {};

  export function initGame(socket: WebSocket) {
    socket.onopen = () => {
      canvas.width = GameField.WIDTH_CANVAS;
      canvas.height = GameField.HEIGHT_CANVAS;

      const sendKey = (key: KeyboardEvent, isPressed: boolean) => {
        const keyMap = {
          message: "keyMap",
          key: key.keyCode,
          isPressed: isPressed,
        };

        socket.send(JSON.stringify(keyMap))
      };

      window.addEventListener("keydown", (key) => {sendKey(key, true)});
      window.addEventListener("keyup", (key) => {sendKey(key, false)});

    };

    socket.onmessage = (message: MessageEvent) => {
      ShootersMap = JSON.parse(message.data);
    };

    socket.onclose = () => {
      alert("Sorry, Server Close")
    };
    setInterval(function () {
      gameLoop(ShootersMap);
    }, 1000 / 60);
  }

  const gameLoop = (ShootersMap) => {

    GameField.draw(canvasContext);
    for (const block of blocks) {
      block.draw(canvasContext);
    }

    for (const id in ShootersMap) {
      const player = new Shooter(ShootersMap[id].x, ShootersMap[id].y, ShootersMap[id].health, ShootersMap[id].xBullet, ShootersMap[id].yBullet);
      player.draw(canvasContext);
      player.drawGun(canvasContext);
      player.drawBullet(canvasContext);
    }
  }
}