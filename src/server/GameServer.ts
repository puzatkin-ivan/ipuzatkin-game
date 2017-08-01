import WebSocket = require("ws");
import {Shooter} from "./object/Shooter";
import {gamePhysics} from "./processes/gamePhysics";
import {Block} from "./object/Block";
import {GameContext} from "../GameContext";

export namespace GameServer {
  export function initGameServer(socketSever: WebSocket.Server) {
    const broadcast = (data: any) => {
      socketSever.clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    };

    let countShooter = 0;

    const blocks = [
      new Block(GameContext.block.block1.x, GameContext.block.block1.y),
      new Block(GameContext.block.block2.x, GameContext.block.block2.y),
    ];

    socketSever.on('connection', (client: WebSocket) => {
      countShooter += 1;
      const shooter = "shooter" + countShooter;
      GameContext.players[shooter] = new Shooter(GameContext.INITIAL_COORDINATES.x, GameContext.INITIAL_COORDINATES.y);

      client.send(JSON.stringify(GameContext.players));

      client.on("close", () => {
        delete GameContext.players[shooter];
        clearInterval(closeIntervalId);
        broadcast(JSON.stringify(GameContext.players));
      });

      client.on("message", (message: any) => {
          GameContext.players[shooter].setDirection(JSON.parse(message));
      });

      let lastTimeFrame = Date.now();
      const closeIntervalId = setInterval(() => {
        const currentTimeFrame = Date.now();
        const deltaTime = currentTimeFrame - lastTimeFrame;
        lastTimeFrame = currentTimeFrame;


        GameContext.players[shooter].move(deltaTime);
        gamePhysics(GameContext.players[shooter], blocks);
        broadcast(JSON.stringify(GameContext.players));
      }, 1000/60);
    });
  }
}