import {Shooter} from "./object/Shooter";
import {GameContext} from "./object/GameContext";
import {gameLoop} from "./processes/gameLoop";

export namespace GameServer {
  function startGameServer(socketServer: SocketIO.Server, gameContext: GameContext) {
    let lastTimeFrame = Date.now();
    setInterval(() => {
      const currentTimeFrame = Date.now();
      const deltaTime = currentTimeFrame - lastTimeFrame;
      lastTimeFrame = currentTimeFrame;

      let playersForDraw = {};
      let playersForTable = [];
      let bullets = [];
      gameLoop(socketServer, gameContext, deltaTime, playersForDraw, playersForTable, bullets);
      const messageUpdate = {
        playersForDraw: playersForDraw,
        playersForTable: playersForTable,
        bullets: bullets,
      };

      socketServer.sockets.emit("update_data",  JSON.stringify(messageUpdate))
    }, 1000/60);
  }

  export function initGameServer(socketServer: SocketIO.Server) {
    let gameContext: GameContext = new GameContext();
    startGameServer(socketServer, gameContext);

    let countShooter = 0;
    socketServer.on('connection', (client: SocketIO.Socket) => {
      countShooter += 1;
      const id = client.id;
      const shooterId = id.toString();
      const numberPlace = countShooter % 10;
      const x = GameContext.INITIAL_COORDINATES[numberPlace].x;
      const y = GameContext.INITIAL_COORDINATES[numberPlace].y;

      gameContext.players[shooterId] = new Shooter(x, y, shooterId);

      client.on("disconnect", () => {
        delete gameContext.players[shooterId];
      });

      client.on("nickname", (data: any) => {
        gameContext.players[shooterId].nickname = data;
        client.emit("new_player", JSON.stringify(gameContext.serialization()));
      });

      client.on("keyMap", (data: any) => {
        const message = JSON.parse(data);
        gameContext.players[shooterId].updateKeyMap(message);
      });

    })
  }
}