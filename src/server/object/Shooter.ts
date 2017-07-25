export class Shooter {
  public x: number;
  public y: number;
  public static WIDTH = 50;
  public static HEIGHT = 50;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(Movement: any) {
    if (Movement.UP) {
      this.y -= 5;
    }
    if (Movement.DOWN) {
      this.y += 5;
    }
    if (Movement.LEFT) {
      this.x -= 5;
    }
    if (Movement.RIGHT) {
      this.x += 5;
    }

  }

}