export class GameContext {
  public players;
  public bullets: {x: number, y: number}[];
  public blocks;

  constructor() {
    this.players = {};
    this.blocks = [];
    this.bullets = [];
  }
}