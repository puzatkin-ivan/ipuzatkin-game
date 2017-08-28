import {GameField} from "./GameField";

export class GameOver {
  public static timeBeforeRespawn: number = 3000;
  public static time: number = 0;
  public static draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(0, 0, GameField.WIDTH_CANVAS, GameField.HEIGHT_CANVAS);
    context.fillStyle = "#ffffff";

    if (GameOver.time < GameOver.timeBeforeRespawn) {
      context.font = 'bold 85px sans-serif';
      context.fillText("GameOver", 550, 100);
    } else {
      context.font = 'bold 70px sans-serif';
      context.fillText("Press Any Key To Continue", 300, 550);
    }
  }
}