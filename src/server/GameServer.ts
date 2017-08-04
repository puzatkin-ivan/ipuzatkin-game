import WebSocket = require("ws");
import {Shooter} from "./object/Shooter";
import {gamePhysics} from "./processes/gamePhysics";
import {Block} from "./object/Block";
import {GameContext} from "../GameContext";

export namespace GameServer {
  function broadcast(socketServer: WebSocket.Server, data: any) {
    socketServer.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }

  const blocks = [
    new Block(GameContext.block.block1.x, GameContext.block.block1.y),
    new Block(GameContext.block.block2.x, GameContext.block.block2.y),
    new Block(GameContext.block.block3.x, GameContext.block.block3.y),
    new Block(GameContext.block.block4.x, GameContext.block.block4.y),
    new Block(GameContext.block.block5.x, GameContext.block.block5.y),
    new Block(GameContext.block.block6.x, GameContext.block.block6.y),
  ];

  function startGameServer(socketServer: WebSocket.Server) {
    let lastTimeFrame = Date.now();
    setInterval(() => {
      const currentTimeFrame = Date.now();
      const deltaTime = currentTimeFrame - lastTimeFrame;
      lastTimeFrame = currentTimeFrame;

      for (const shooter in GameContext.players) {
        GameContext.players[shooter].moveBullet(deltaTime);
        GameContext.players[shooter].move(deltaTime);
        GameContext.players[shooter].collisionAndObject(blocks);
        gamePhysics(GameContext.players[shooter], blocks);
      }
      broadcast(socketServer, JSON.stringify(GameContext.players));
    }, 1000/60);
  }

  export function initGameServer(socketServer: WebSocket.Server) {
    startGameServer(socketServer);
    let countShooter = 0;

    socketServer.on('connection', (client: WebSocket) => {
      countShooter += 1;
      const shooter = "shooter" + countShooter;
      GameContext.players[shooter] = new Shooter(GameContext.INITIAL_COORDINATES.x, GameContext.INITIAL_COORDINATES.y);

      client.send(JSON.stringify(GameContext.players));

      client.on("close", () => {
        delete GameContext.players[shooter];
        broadcast(socketServer, JSON.stringify(GameContext.players));
      });

      client.on("message", (message: any) => {
        GameContext.players[shooter].setDirection(JSON.parse(message));
      });
    });
  }
}