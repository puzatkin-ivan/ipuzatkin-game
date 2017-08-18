export class GameContext {
  public players;
  public table;
  public bullets: {x: number, y: number}[];
  public blocks;

  constructor() {
    this.players = {};
    this.blocks = {};
    this.bullets = [];
    this.table = {};
  }
}