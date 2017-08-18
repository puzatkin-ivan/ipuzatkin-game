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

  function sendMessage(gameContext: GameContext) {
    return {
      type: "update data",
      players: gameContext.players,
      bullets: gameContext.bullets,
      table: gameContext.table,
    }
  }

  function startGameServer(socketServer: WebSocket.Server) {
    let lastTimeFrame = Date.now();
    setInterval(() => {
      const currentTimeFrame = Date.now();
      const deltaTime = currentTimeFrame - lastTimeFrame;
      lastTimeFrame = currentTimeFrame;

      for (const shooter of  Object.keys(gameContext.players)) {
        if (gameContext.players[shooter].health != 0) {
          gameContext.players[shooter].setDirection();
          gameContext.players[shooter].move(deltaTime);
          gamePhysics(gameContext, shooter);
          gameContext.players[shooter].fire(gameContext);
        } else if (!gameContext.players[shooter].isDead) {
          gameContext.players[shooter].checkTime = Date.now();
        }
      }

      for (const bullet of gameContext.bullets) {
        bullet.move(deltaTime);
        bullet.collision(gameContext);
        if (bullet.isDead) {
          gameContext.bullets.splice(gameContext.bullets.indexOf(bullet), 1);
        }
      }

      broadcast(socketServer, JSON.stringify(sendMessage(gameContext)));
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

      const sendInitialMessage = (gameContext: GameContext, playerId: string) => {
        return {
          type: "message for new client",
          id: playerId,
          gameContext: gameContext,
        }
      };

      client.send(JSON.stringify(sendInitialMessage(gameContext, shooter)));

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