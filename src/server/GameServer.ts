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
      gameLoop(gameContext, deltaTime, playersForDraw, playersForTable, bullets);

      socketServer.sockets.emit("update_data", gameContext.serialization())
    }, 1000/60);
  }

  export function initGameServer(socketServer: SocketIO.Server) {
    let gameContext: GameContext = new GameContext();
    startGameServer(socketServer, gameContext);

    let countShooter = 0;
    socketServer.on('connection', (client: SocketIO.Socket) => {
      countShooter += 1;
      const shooterId = client.id;
      const numberPlace = countShooter % 10;
      const x = GameContext.INITIAL_COORDINATES[numberPlace].x;
      const y = GameContext.INITIAL_COORDINATES[numberPlace].y;

      gameContext.players[shooterId] = new Shooter(x, y, shooterId);
      client.emit("new_player", gameContext.serialization());

      client.on("disconnect", () => {
        delete gameContext.players[shooterId];
        client.broadcast.emit("", gameContext.serialization());
      });

      client.on("nickname", (data: any) => {
        gameContext.players[shooterId].nickname = data.nickname;
      });

      client.on("keyMap", (data: any) => {
        gameContext.players[shooterId].updateKeyMap(data);
      });

    })
  }
}