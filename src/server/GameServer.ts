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

  function startGameServer(socketServer: WebSocket.Server) {
    let lastTimeFrame = Date.now();
    setInterval(() => {
      const currentTimeFrame = Date.now();
      const deltaTime = currentTimeFrame - lastTimeFrame;
      lastTimeFrame = currentTimeFrame;

      for (const bullet of gameContext.bullets) {
        bullet.move(deltaTime);
        bullet.collision(gameContext);
        if (bullet.isDead) {
          gameContext.bullets.splice(gameContext.bullets.indexOf(bullet), 1);
        }
      }

      for (const shooter of  Object.keys(gameContext.players)) {
        gameContext.players[shooter].setDirection();
        gameContext.players[shooter].move(deltaTime);
        gamePhysics(gameContext, shooter);

        gameContext.players[shooter].fire(gameContext);
      }
      broadcast(socketServer, JSON.stringify(gameContext));
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
      client.send(JSON.stringify(gameContext));

      client.on("close", () => {
        delete gameContext.players[shooter];
        broadcast(socketServer, JSON.stringify(gameContext));
      });

      client.on("message", (message: any) => {
        gameContext.players[shooter].updateKeyMap(JSON.parse(message));
      });
    });
  }
}