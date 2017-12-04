import {GameField} from "./object/GameField";
import {GameContext} from "./object/GameContext";
import {gameLoop} from "./processes/gameLoop";
import {Table} from "./object/Table";

export namespace GameClient {

  function initializationMessage(keyboardEvent: KeyboardEvent, table: Table, isPressed: boolean): object {
    if (keyboardEvent.keyCode === 9) {
      table.isShowTable = isPressed;
      return {};
    } else {
      return {
        key: keyboardEvent.keyCode,
        isPressed: isPressed,
      };
    }
  }

  function  sendKey(socket: SocketIO.Socket, keyboardEvent: KeyboardEvent, table: Table, isPressed: boolean) {
    const message = initializationMessage(keyboardEvent, table, isPressed);
    if (message != {}) {
      socket.emit("keyMap", JSON.stringify(message));
    }
  }

  export function initGame(socket: SocketIO.Socket, nickname: string) {
    let gameContext: GameContext = new GameContext();
    let table: Table = new Table();
    let id: string;
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d");

    socket.emit("nickname", nickname);

    canvas.width = GameField.WIDTH_CANVAS;
    canvas.height = GameField.HEIGHT_CANVAS;

    window.addEventListener("keydown", (keyboardEvent: KeyboardEvent) => {
      sendKey(socket, keyboardEvent, table, true);
      keyboardEvent.preventDefault();
    });

    window.addEventListener("keyup", (keyboardEvent: KeyboardEvent) => {
      sendKey(socket, keyboardEvent, table, false);
      keyboardEvent.preventDefault();
    });

    socket.on("disconnect", () => {
      alert("Sorry, Server Close")
    });

    socket.on("new_player", (messageEvent: any) => {
      const message = JSON.parse(messageEvent);
      console.log(message);
      gameContext.blocks = message.blocks;
      gameContext.players = message.players;
      gameContext.bullets = message.bullets;
      id = socket.id;
    });

    socket.on("update_data", (messageEvent: any) => {
      const message = JSON.parse(messageEvent);
      console.log(message);
      gameContext.players = message.playersForDraw;
      gameContext.bullets = message.bullets;
    });

    setInterval(() => {
      gameLoop(canvasContext, gameContext, table, id, nickname);
    }, 1000 / 60);
  }
}