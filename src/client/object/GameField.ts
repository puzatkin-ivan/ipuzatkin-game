export class GameField {
  public static WIDTH_CANVAS = 1500;
  public static HEIGHT_CANVAS = 600;
  public static WIDTH_BORDER_GAMES_FIELD = 10;



  public static draw(context: CanvasRenderingContext2D) {
    const x = 0;
    const y = 0;
    context.beginPath();
    context.fillStyle = "#000000";
    context.fillRect(x, y, GameField.WIDTH_CANVAS, GameField.HEIGHT_CANVAS);
    context.clearRect(10, 10, 1480, 580);
    context.closePath();
  }
}