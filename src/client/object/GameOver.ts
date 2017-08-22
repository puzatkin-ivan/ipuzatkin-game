import {GameField} from "./GameField";

export class GameOver {
  public static count: number = 1;
  public static initialization(): boolean {
    GameOver.count++;
    return GameOver.count < 130;
  }
  public static draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(0, 0, GameField.WIDTH_CANVAS, GameField.HEIGHT_CANVAS);
    context.fillStyle = "#ffffff";

    if (GameOver.initialization()) {
      context.font = 'bold 85px sans-serif';
      context.fillText("GameOver", 550, 100);
    } else {
      context.font = 'bold 70px sans-serif';
      context.fillText("Press Any Key To Continue", 300, 550);
    }
  }
}