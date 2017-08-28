import WebSocket = require("ws");
import {Shooter} from "./object/Shooter";
import {GameContext} from "./object/GameContext";
import {MessageTypes} from "../common/messageTypes";
import {gameLoop} from "./processes/gameLoop";

export namespace GameServer {
  function broadcast(socketServer: WebSocket.Server, data: any) {
    socketServer.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  function createMessage(playersForDraw: any, playersForTable: any, bullets: any) {
    return {
      type: MessageTypes.UPDATE_DATA,
      playersForDraw: playersForDraw,
      playersForTable: playersForTable,
      bullets: bullets,
    }
  }

  function startGameServer(socketServer: WebSocket.Server, gameContext: GameContext) {
    let lastTimeFrame = Date.now();
    setInterval(() => {
      const currentTimeFrame = Date.now();
      const deltaTime = currentTimeFrame - lastTimeFrame;
      lastTimeFrame = currentTimeFrame;

      let playersForDraw = {};
      let playersForTable = [];
      let bullets = [];
      gameLoop(gameContext, deltaTime, playersForDraw, playersForTable, bullets);

      broadcast(socketServer, JSON.stringify(createMessage(playersForDraw, playersForTable, bullets)));
    }, 1000/60);
  }

  export function initGameServer(socketServer: WebSocket.Server) {
    let gameContext: GameContext = new GameContext();
    startGameServer(socketServer, gameContext);

    let countShooter = 0;
    socketServer.on('connection', (client: WebSocket) => {
      countShooter += 1;
      const shooterId = "shooter" + countShooter;
      const numberPlace = countShooter % 10;
      const x = GameContext.INITIAL_COORDINATES[numberPlace].x;
      const y = GameContext.INITIAL_COORDINATES[numberPlace].y;
      gameContext.players[shooterId] = new Shooter(x, y, shooterId);

      const sendInitialMessage = (gameContext: GameContext) => {
        return {
          type: MessageTypes.NEW_CLIENT,
          gameContext: gameContext.serialization(),
          id: shooterId,
        }
      };

      client.send(JSON.stringify(sendInitialMessage(gameContext)));

      client.on("close", () => {
        delete gameContext.players[shooterId];
        broadcast(socketServer, JSON.stringify(gameContext));
      });

      client.on("message", (message: any) => {
        const data = JSON.parse(message);
        switch (data.type) {
          case "nickname":
            gameContext.players[shooterId].nickname = data.id;
          break;
          case "keyMap":
            gameContext.players[shooterId].updateKeyMap(data);
          break;
        }
      });
    });
  }
}