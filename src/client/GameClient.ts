import {GameField} from "./object/GameField";
import {Shooter} from "./object/Shooter";
import {Block} from "./object/Block";
import {GameContext} from "../GameContext";

export namespace GameClient {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d");


  export function initGame(socket: WebSocket) {
    socket.onopen = () => {
      canvas.width = GameField.WIDTH_CANVAS;
      canvas.height = GameField.HEIGHT_CANVAS;

      const sendKey = (key: KeyboardEvent, isPressed: boolean) => {
        const keyMap = {
          key: key.keyCode,
          isPressed: isPressed,
        };

        socket.send(JSON.stringify(keyMap))
      };

      window.addEventListener("keydown", (key) => {sendKey(key, true)});
      window.addEventListener("keyup", (key) => {sendKey(key, false)});
      window.addEventListener("click", () => {});

    };

     socket.onmessage = (message: MessageEvent) => {
       const ShootersMap = JSON.parse(message.data);
       requestAnimationFrame(() => {
         gameLoop(ShootersMap);
       });
       };

       socket.onclose = () => {
         alert("Sorry, Server Close")
       };
     }

     const gameLoop = (ShootersMap) => {
       const ninepins = new Block(GameContext.block.block1.x, GameContext.block.block1.y);
       const ninepins2 = new Block(GameContext.block.block2.x, GameContext.block.block2.y);

       GameField.draw(canvasContext);
       ninepins.draw(canvasContext);
       ninepins2.draw(canvasContext);

       for (const id in ShootersMap) {
         const player = new Shooter(ShootersMap[id].x, ShootersMap[id].y);
         player.draw(canvasContext);
       }
     }
 }
