import {Direction} from "../../common/direction";

export class Spinner{
  public x: number;
  public y: number;
  public direction: Direction;
  public static RADIUS = 10;
  public static X1 = 750;
  public static Y1 = 250;
  public static X2 = Spinner.X1 + 25;
  public static Y2 = Spinner.Y1 + 44;
  public static X3 = Spinner.X1 - 25;
  public static Y3 = Spinner.Y2;

  constructor(x: number, y: number, direction: Direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  move(deltaTime: number) {
    const SPEED = 100;
    const deltaMove = SPEED * deltaTime / 2000;
    const coefficient = 2.5/4.3;
    const sqrt2 = (deltaMove + deltaMove * coefficient) / Math.sqrt(2);
    if (this.direction === Direction.UP) {
      this.x += deltaMove * coefficient;
      this.y -= deltaMove;
    } else if (this.direction === Direction.DOWN) {
      this.x += deltaMove * coefficient;
      this.y += deltaMove;
    } else {
      this.x -= sqrt2;
    }

    if (this.x > Spinner.X1 && this.direction === Direction.UP) {
      this.direction = Direction.DOWN;
      this.x = Spinner.X1;
      this.y = Spinner.Y1;
    } else if (this.x > Spinner.X2 && this.direction === Direction.DOWN) {
      this.direction = Direction.LEFT;
      this.x = Spinner.X2;
      this.y = Spinner.Y2;
    } else if (this.x < Spinner.X3 && this.direction === Direction.LEFT) {
      this.direction = Direction.UP;
      this.x = Spinner.X3;
      this.y = Spinner.Y3;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 5;
    context.arc(this.x, this.y, Spinner.RADIUS, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();
  }
}