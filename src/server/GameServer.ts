import WebSocket = require("ws");
import {Shooter} from "./object/Shooter";
import {gamePhysics} from "./processes/gamePhysics";

export namespace GameServer {
  export function initGameServer(socketSever: WebSocket.Server) {
    const broadcast = (data: any) => {
      socketSever.clients.forEach((client: WebSocket) => {
        client.send(data);
      });
    };

    let players = {};
    let countShooter = 0;
    let Movement = {
      UP: false,
      LEFT: false,
      RIGHT: false,
      DOWN: false,
    };

    const Coord = {
      x: 122,
      y: 123,
    };

    socketSever.on('connection', (client: WebSocket) => {
      countShooter += 1;
      const shooter = "shooter" + countShooter;
      players[shooter] = new Shooter(Coord.x, Coord.y);

      client.send(JSON.stringify(players));

      client.on("message", (message: WebSocket.Data) => {
        players[shooter].move(message);
        gamePhysics();
        client.send(JSON.stringify(players));
      });
      broadcast("new client");
    });
  }
}