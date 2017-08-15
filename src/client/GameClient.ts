import {GameField} from "./object/GameField";
import {GameContext} from "./object/GameContext";
import {Block} from "./object/Block";
import {Bullet} from "./object/Bullet";
import {Shooter} from "./object/Shooter";
import {Spinner} from "./object/Spinner";
import {Direction} from "../direction";

export namespace GameClient {

  export function initGame(socket: WebSocket) {
    let gameContext: GameContext = new GameContext();
    let playerId: string;
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const canvasContext: CanvasRenderingContext2D = canvas.getContext("2d");

    socket.onopen = () => {
      canvas.width = GameField.WIDTH_CANVAS;
      canvas.height = GameField.HEIGHT_CANVAS;

      const sendKey = (key: KeyboardEvent, isPressed: boolean) => {
        const keyMap = {
          message: "keyMap",
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
    new Spinner(Spinner.X1, Spinner.Y1, Direction.DOWN),
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
      const player = new Shooter(gameContext.players[shooter].x, gameContext.players[shooter].y, gameContext.players[shooter].health, gameContext.players[shooter].direction);
      player.draw(canvasContext, playerId, shooter);
      player.drawGun(canvasContext);
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