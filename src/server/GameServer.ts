import WebSocket = require("ws");
import {Shooter} from "./object/Shooter";
import {gamePhysics} from "./processes/gamePhysics";
import {GameContext} from "./object/GameContext";

export namespace GameServer {
  function broadcast(socketServer: WebSocket.Server, data: any) {
    socketServer.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  let gameContext: GameContext = new GameContext();

  function sendMessage(playersForDraw: any, playersForTable: any, bullets: any) {
    return {
      type: "update data",
      playersForDraw: playersForDraw,
      playersForTable: playersForTable,
      bullets: bullets,
    }
  }

  function startGameServer(socketServer: WebSocket.Server) {
    let lastTimeFrame = Date.now();
    setInterval(() => {
      const currentTimeFrame = Date.now();
      const deltaTime = currentTimeFrame - lastTimeFrame;
      lastTimeFrame = currentTimeFrame;

      let playersForDraw = {};
      let playersForTable = [];
      for (const playerId of Object.keys(gameContext.players)) {
        const player = gameContext.players[playerId];
        if (player.health != 0) {
          player.setDirection();
          player.move(deltaTime);
          gamePhysics(gameContext, playerId);
          player.fire(gameContext);
        } else if (!player.isDead) {
          player.checkTime = Date.now();
        }
        player.initializationData();
        playersForDraw[playerId] = player.serializationForDraw();
        playersForTable.push(player.serializationForTable());
      }

      let bullets = [];
      for (const bullet of gameContext.bullets) {
        bullet.move(deltaTime);
        bullet.collision(gameContext);
        if (bullet.isDead) {
          gameContext.bullets.splice(gameContext.bullets.indexOf(bullet), 1);
        }

        bullets.push(bullet.serialization());
      }

      playersForTable.sort((playerOne, playerTwo) => {
        const scoreOne = playerOne.score;
        const scoreTwo = playerTwo.score;
        if (scoreOne > scoreTwo) {
          return -1;
        }
        if (scoreOne < scoreTwo) {
          return 1
        }
        return 0;
      });
      broadcast(socketServer, JSON.stringify(sendMessage(playersForDraw, playersForTable, bullets)));
    }, 1000/60);
  }

  export function initGameServer(socketServer: WebSocket.Server) {
    startGameServer(socketServer);

    let countShooter = 0;
    socketServer.on('connection', (client: WebSocket) => {
      countShooter += 1;
      const shooter = "shooter" + countShooter;
      const numberPlace = countShooter % 10;
      gameContext.players[shooter] = new Shooter(GameContext.INITIAL_COORDINATES[numberPlace].x, GameContext.INITIAL_COORDINATES[numberPlace].y, shooter);


      const sendInitialMessage = (gameContext: GameContext) => {
        return {
          type: "message for new client",
          gameContext: gameContext.serialization(),
          id: shooter,
        }
      };

      client.send(JSON.stringify(sendInitialMessage(gameContext)));

      client.on("close", () => {
        delete gameContext.players[shooter];
        broadcast(socketServer, JSON.stringify(gameContext));
      });

      client.on("message", (message: any) => {
        const data = JSON.parse(message);
        switch (data.type) {
          case "nickname":
            gameContext.players[shooter].nickname = data.id;
          break;
          case "keyMap":
            gameContext.players[shooter].updateKeyMap(data);
          break;
        }
      });
    });
  }
}