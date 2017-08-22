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

  function sendMessage(players: any, bullets: any) {
    return {
      type: "update data",
      players: players,
      bullets: bullets,
      first: gameContext.table.first,
    }
  }

  function startGameServer(socketServer: WebSocket.Server) {
    let lastTimeFrame = Date.now();
    setInterval(() => {
      const currentTimeFrame = Date.now();
      const deltaTime = currentTimeFrame - lastTimeFrame;
      lastTimeFrame = currentTimeFrame;

      let players = {};
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
        players[playerId] = player.serialization();
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
      broadcast(socketServer, JSON.stringify(sendMessage(players, bullets)));
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

      const lengthPlayers = () => {
        let count = 0;
        let lastPlayer: string;
        for (const element of Object.keys(gameContext.players)) {
          count++;
          lastPlayer = element;
        }

        if (count > 1) {
          gameContext.players[lastPlayer].nextPlayerId = shooter;
          return false;
        } else {
          gameContext.table.first = shooter;
          return true;
        }
      };

      const sendInitialMessage = (gameContext: GameContext) => {
        if (lengthPlayers()) {
          return {
            type: "message for first client",
            gameContext: gameContext.serialization(),
            id: shooter,
          }
        } else {
          return {
            type: "message for new client",
            gameContext: gameContext.serialization(),
            id: shooter,
          }
        }
      };

      client.send(JSON.stringify(sendInitialMessage(gameContext)));

      client.on("close", () => {
        gameContext.table.first = gameContext.players[shooter].nextPlayerId;
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