export class Block {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 135;
    this.height = 135;
  }

  serialization(): object{
    return {
      x: this.x,
      y: this.y,
    }
  }
}