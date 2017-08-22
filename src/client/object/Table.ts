import {GameContext} from "./GameContext";

export class Table {
  public first: string;
  public isShowTable: boolean;

  constructor() {
    this.first = "";
    this.isShowTable = false;
  }

  draw(canvasContext: CanvasRenderingContext2D, gameContext: GameContext, clientId: string) {
    if (this.isShowTable) {
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
      const players = gameContext.players;

      for (const playerId of Object.keys(players)) {
        const player = players[playerId];
        numberPlayer++;

        if (playerId === clientId) {
          canvasContext.fillStyle = "#38ff16";
        } else {
          canvasContext.fillStyle = "#4663ff";
        }
        canvasContext.fillText("" + numberPlayer + "" + ". " + players[playerId].nickname, 300, yPlayer);

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
  }
}