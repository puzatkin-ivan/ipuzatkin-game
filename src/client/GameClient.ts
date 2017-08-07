import {GameField} from "./object/GameField";
import {GameContext} from "./object/GameContext";
import {Shooter} from "./object/Shooter";
import {Block} from "./object/Block";
import {Bullet} from "./object/Bullet";

export namespace GameClient {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d");

  export function initGame(socket: WebSocket) {
    let gameContext: GameContext = new GameContext();

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
      gameContext = JSON.parse(message.data)
    };

    socket.onclose = () => {
      alert("Sorry, Server Close")
    };

    setInterval(function () {
      gameLoop(gameContext);
    }, 1000 / 60);
  }

  const gameLoop = (gameContext: GameContext) => {
    GameField.draw(canvasContext);
    for (const item of Object.keys(gameContext.blocks)) {
      const block = new Block(gameContext.blocks[item].x, gameContext.blocks[item].y);
      block.draw(canvasContext);
    }

    for (const shooter of Object.keys(gameContext.players)) {
      const player = new Shooter(gameContext.players[shooter].x, gameContext.players[shooter].y, gameContext.players[shooter].health);
      player.draw(canvasContext);
      player.drawGun(canvasContext);
    }

    for (const item of gameContext.bullets) {
      const bullet = new Bullet(item.x, item.y);
      bullet.draw(canvasContext);
    }
  }
}