import {GameField} from "./object/GameField";
import {GameContext} from "./object/GameContext";
import {gameLoop} from "./processes/gameLoop";
import {Table} from "./object/Table";

export namespace GameClient {
  function sendNickname(socket: WebSocket, idClient: string) {
    const nickname = {
      type: "nickname",
      id: idClient,
    };

    socket.send(JSON.stringify(nickname))
  }

  function initializationMessage(keyboardEvent: KeyboardEvent, table: Table, isPressed: boolean): object {
    if (keyboardEvent.keyCode === 9) {
      table.isShowTable = isPressed;
    } else {
      return {
        type: "keyMap",
        key: keyboardEvent.keyCode,
        isPressed: isPressed,
      };
    }
  }

  function  sendKey(socket: WebSocket, keyboardEvent: KeyboardEvent, table: Table, isPressed: boolean) {
    const message = initializationMessage(keyboardEvent, table, isPressed);
    if (message) {
      socket.send(JSON.stringify(message));
    }
  }

  export function initGame(socket: WebSocket, nickname: string) {
    let gameContext: GameContext = new GameContext();
    let table: Table = new Table();
    let idClient: string;
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d");

    socket.onopen = () => {
      sendNickname(socket, nickname);

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
    };

    socket.onmessage = (messageEvent: MessageEvent) => {
      const message = JSON.parse(messageEvent.data);
      switch (message.type) {
        case "message for first client":
          gameContext.blocks = message.gameContext.blocks;
          gameContext.players = message.gameContext.players;
          gameContext.bullets = message.gameContext.bullets;
          table.first = message.gameContext.first;
          idClient = message.id;
        break;
        case "message for new client":
          gameContext.blocks = message.gameContext.blocks;
          gameContext.players = message.gameContext.players;
          gameContext.bullets = message.gameContext.bullets;
          table.first = message.first;
          idClient = message.id;
        break;
        case "update data":
          gameContext.players = message.players;
          gameContext.bullets = message.bullets;
          table.first = message.first;
        break;
      }
    };

    socket.onclose = () => {
      alert("Sorry, Server Close")
    };

    setInterval(() => {
      gameLoop(canvasContext, gameContext, table, idClient);
    }, 1000 / 60);
  }
}