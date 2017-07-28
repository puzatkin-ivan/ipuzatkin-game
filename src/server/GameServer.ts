import WebSocket = require("ws");
import {Shooter} from "./object/Shooter";
import {gamePhysics} from "./processes/gamePhysics";
import {Ninepins} from "./object/Ninepins";

export namespace GameServer {
  export function initGameServer(socketSever: WebSocket.Server) {
    const broadcast = (data: any) => {
      socketSever.clients.forEach((client: WebSocket) => {
        client.send(data);
      });
    };

    let players = {};
    let countShooter = 0;

    const Coord = {
      x: 122,
      y: 123,
    };
    const ninepins = [
      new Ninepins(600, 300),
      new Ninepins(200, 300),
    ];

    socketSever.on('connection', (client: WebSocket) => {
      countShooter += 1;
      const shooter = "shooter" + countShooter;
      players[shooter] = new Shooter(Coord.x, Coord.y);

      client.send(JSON.stringify(players));

      client.on("close", () => {
        delete players[shooter];
        broadcast(JSON.stringify(players));
      });

      client.on("message", (message: any) => {
          players[shooter].move(JSON.parse(message));
          gamePhysics(players[shooter], ninepins);
          broadcast(JSON.stringify(players));
      });
    });
  }
}