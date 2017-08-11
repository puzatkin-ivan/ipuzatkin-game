import {Block} from "./Block";

export class GameContext {
  public players;
  public bullets;
  public blocks;
  public static INITIAL_COORDINATES: {x: number, y: number}[] = [
    {x: 100, y: 100},
    {x: 1400, y: 100},
    {x: 750, y: 250},
    {x: 300, y: 250},
    {x: 1200, y: 250},
    {x: 100, y: 450},
    {x: 1400, y: 450},
    {x: 1000, y: 450},
    {x: 700, y: 450},
    {x: 700, y: 100},
  ];

  constructor() {
    this.players = {};
    this.bullets = [];
    this.blocks = [
      new Block(250, 150),
      new Block(700, 150),
      new Block(1150, 150),
      new Block(250, 350),
      new Block(700, 350),
      new Block(1150, 350),
    ];
  }
}