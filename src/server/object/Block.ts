export class Block {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  serialization(): object{
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }
  }
}