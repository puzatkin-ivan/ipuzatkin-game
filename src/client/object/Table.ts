export class Table {
  public players;
  public isShowTable: boolean;

  constructor() {
    this.players = [];
    this.isShowTable = false;
  }

  draw(canvasContext: CanvasRenderingContext2D, nicknameClient: string) {
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

      for (const player of this.players) {
        numberPlayer++;

        if (player.nickname === nicknameClient) {
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
        canvasContext.fillText("" + player.killCount, 920, yPlayer);
        canvasContext.fillText("" + player.deathCount, 1125, yPlayer);

        yPlayer += 30;
      }
    }
  }
}