import {GameField} from "./object/GameField";
import {GameContext} from "./object/GameContext";
import {gameLoop} from "./processes/gameLoop";
import {Table} from "./object/Table";
import {MessageTypes} from "../common/messageTypes";

export namespace GameClient {
  function sendNickname(socket: WebSocket, nicknameClient: string) {
    const nickname = {
      type: MessageTypes.NICKNAME,
      id: nicknameClient,
    };

    socket.send(JSON.stringify(nickname))
  }

  function initializationMessage(keyboardEvent: KeyboardEvent, table: Table, isPressed: boolean): object {
    if (keyboardEvent.keyCode === 9) {
      table.isShowTable = isPressed;
    } else {
      return {
        type: MessageTypes.KEY_MAP,
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
    let id: string;
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
        case MessageTypes.NEW_CLIENT:
          gameContext.blocks = message.gameContext.blocks;
          gameContext.players = message.gameContext.players;
          gameContext.bullets = message.gameContext.bullets;
          id = message.id;
          break;
        case MessageTypes.UPDATE_DATA:
          gameContext.players = message.playersForDraw;
          table.players = message.playersForTable;
          gameContext.bullets = message.bullets;
          break;
      }
    };

    socket.onclose = () => {
      alert("Sorry, Server Close")
    };

    setInterval(() => {
      gameLoop(canvasContext, gameContext, table, id, nickname);
    }, 1000 / 60);
  }
}