import {GameField} from "./object/GameField";
import {Shooter} from "./object/Shooter";
import {Movement} from "./movement";
import {Ninepins} from "./object/Ninepins";

export namespace GameClient {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d");


  export function initGame(socket: WebSocket) {
    socket.onopen = () => {
      canvas.width = GameField.WIDTH_CANVAS;
      canvas.height = GameField.HEIGHT_CANVAS;

      const keyControl = (key: KeyboardEvent, isPressed: boolean) => {
        switch (key.keyCode) {
          case 65:
            Movement.LEFT = isPressed;
            break;
          case 87:
            Movement.UP = isPressed;
            break;
          case 68:
            Movement.RIGHT = isPressed;
            break;
          case 83:
            Movement.DOWN = isPressed;
            break;
        }
      };

      window.addEventListener("keydown", (key) => {keyControl(key, true)});
      window.addEventListener("keyup", (key) => {keyControl(key, false)});

    };

     socket.onmessage = (message: MessageEvent) => {
       console.log(message.data);
       const ShootersMap = JSON.parse(message.data);
       console.log(ShootersMap);
       const ninepins = new Ninepins(750, 500);

       GameField.draw(canvasContext);
       ninepins.draw(canvasContext);

       for (const id of ShootersMap) {
         console.log(id);
       }
     };

     setInterval( () => {
       socket.send(Movement);
     }, 1000/60);
  }
}