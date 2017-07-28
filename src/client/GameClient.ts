import {GameField} from "./object/GameField";
import {Shooter} from "./object/Shooter";
import {Ninepins} from "./object/Ninepins";

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

    };

     socket.onmessage = (message: MessageEvent) => {
       const ShootersMap = JSON.parse(message.data);
       const ninepins = new Ninepins(600, 300);
       const ninepins2 = new Ninepins(200, 300);

       GameField.draw(canvasContext);
       ninepins.draw(canvasContext);
       ninepins2.draw(canvasContext);

       for (const id in ShootersMap) {
         const player = new Shooter(ShootersMap[id].x, ShootersMap[id].y);
         player.draw(canvasContext);
       }

       socket.onclose = () => {
         alert("Sorry, Server Close")
       };
     };
  }
}