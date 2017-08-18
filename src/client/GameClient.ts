import {GameField} from "./object/GameField";
import {GameContext} from "./object/GameContext";
import {Block} from "./object/Block";
import {Bullet} from "./object/Bullet";
import {Shooter} from "./object/Shooter";
import {Spinner} from "./object/Spinner";
import {Direction} from "../common/direction";

export namespace GameClient {

  export function initGame(socket: WebSocket, nicknameClient: string) {
    let gameContext: GameContext = new GameContext();
    let playerId: string;
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d");

    socket.onopen = () => {
      const sendNickname = (nicknameClient: string) => {
        const nickname = {
          type: "nickname",
          id: nicknameClient,
        };

        socket.send(JSON.stringify(nickname))
      };

      sendNickname(nicknameClient);

      canvas.width = GameField.WIDTH_CANVAS;
      canvas.height = GameField.HEIGHT_CANVAS;

      const sendKey = (key: KeyboardEvent, isPressed: boolean) => {
        const keyMap = {
          type: "keyMap",
          key: key.keyCode,
          isPressed: isPressed,
        };

        socket.send(JSON.stringify(keyMap))
      };

      window.addEventListener("keydown", (key) => {sendKey(key, true)});
      window.addEventListener("keyup", (key) => {sendKey(key, false)});
    };

    socket.onmessage = (messageEvent: MessageEvent) => {
      const message = JSON.parse(messageEvent.data);
      switch (message.type) {
        case "message for new client":
          playerId = message.id;
          gameContext = message.gameContext;
        break;
        case "update data":
          gameContext.players = message.players;
          gameContext.bullets = message.bullets;
        break;
      }
    };

    socket.onclose = () => {
      alert("Sorry, Server Close")
    };

    setInterval(() => {
      gameLoop(canvasContext, gameContext, playerId);
    }, 1000 / 60);
  }

  const spinners = [
    new Spinner(Spinner.X1, Spinner.Y1, Direction.DOWN),,
    new Spinner(Spinner.X2, Spinner.Y2, Direction.LEFT),
    new Spinner(Spinner.X3, Spinner.Y3, Direction.UP),
  ];

  let lastTimeFrame = Date.now();

  const gameLoop = (canvasContext: CanvasRenderingContext2D, gameContext: GameContext, playerId: string) =>  {
    GameField.draw(canvasContext);
    for (const item of gameContext.blocks) {
      const block = new Block(item.x, item.y, item.width, item.height);
      block.draw(canvasContext);
    }

    for (const item of gameContext.bullets) {
      const bullet = new Bullet(item.x, item.y);
      bullet.draw(canvasContext);
    }

    for (const shooter of Object.keys(gameContext.players)) {
      const item = gameContext.players[shooter];
      const player = new Shooter(item.x, item.y, item.health, item.direction, item.playerId);
      player.draw(canvasContext, playerId);
      player.drawGun(canvasContext);
    }

    if (gameContext.players[playerId].isShowTable) {
      canvasContext.fillStyle = "rgba(0, 0, 0, 0.7)";
      canvasContext.fillRect(200, 100, 1100, 400);

      canvasContext.fillStyle = "#4663ff";
      canvasContext.font = 'bold 24px sans-serif';
      canvasContext.fillText("Players", 300, 150);
      canvasContext.fillText("Status", 600, 150);
      canvasContext.fillText("Frag", 900, 150);
      canvasContext.fillText("Dead", 1100, 150);

      canvasContext.fillRect(200, 170, 1100, 5);

      let numberPlayer = 0;
      let yPlayer = 200;
      for (const shooter of Object.keys(gameContext.players)) {
        const player = gameContext.players[shooter];
        numberPlayer++;
        if (shooter === playerId) {
          canvasContext.fillStyle = "#38ff16";
        } else {
          canvasContext.fillStyle = "#4663ff";
        }
        canvasContext.fillText("" + numberPlayer + "" + ". " + player.nickname, 300, yPlayer);
        if (player.isDead) {
          canvasContext.fillText("Dead", 600, yPlayer);
        } else {
          canvasContext.fillText("Alive", 600, yPlayer);
        }
        canvasContext.fillText("" + player.frag, 920, yPlayer);
        canvasContext.fillText("" + player.dead, 1125, yPlayer);

        yPlayer += 30;
      }
    }

    if (gameContext.players[playerId].isDead) {
      canvasContext.fillStyle = "rgba(0, 0, 0, 0.5)";
      canvasContext.fillRect(0, 0, GameField.WIDTH_CANVAS, GameField.HEIGHT_CANVAS);
      canvasContext.fillStyle = "#ffffff";
      canvasContext.font = 'bold 85px sans-serif';
      canvasContext.fillText("GameOver", 550, 100);
      canvasContext.font = 'bold 70px sans-serif';
      canvasContext.fillText("Press Any Key To Continue", 300, 550);

      const currentTimeFrame = Date.now();
      const deltaTime = currentTimeFrame - lastTimeFrame;
      lastTimeFrame = currentTimeFrame;
      for (const spinner of spinners) {
        spinner.move(deltaTime);
        spinner.draw(canvasContext);
      }
    }
  };
}