export class GameField {
  public static WIDTH_CANVAS = 5000;
  public static HEIGHT_CANVAS = 3000;
  public static WIDTH_BORDER_GAMES_FIELD = 10;
  public static draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.fillStyle = "#000000";
    context.fillRect(0, 0, GameField.WIDTH_CANVAS, GameField.HEIGHT_CANVAS);

    const x = 10;
    const y = 10;
    const width = GameField.WIDTH_CANVAS - 2 * GameField.WIDTH_BORDER_GAMES_FIELD;
    const height = GameField.HEIGHT_CANVAS - 2 * GameField.WIDTH_BORDER_GAMES_FIELD;
    context.clearRect(x, y, width, height);
    context.closePath();
  }
}