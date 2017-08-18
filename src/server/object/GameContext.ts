import {Block} from "./Block";
import {Table} from "./Table";

export class GameContext {
  public players;
  public table: Table;
  public bullets;
  public blocks;
  public static INITIAL_COORDINATES: {x: number, y: number}[] = [
    {x: 100, y: 100},
    {x: 1400, y: 100},
    {x: 700, y: 250},
    {x: 300, y: 250},
    {x: 1250, y: 200},
    {x: 100, y: 500},
    {x: 1400, y: 450},
    {x: 1000, y: 450},
    {x: 700, y: 450},
    {x: 700, y: 100},
  ];

  constructor() {
    this.table = new Table;
    this.players = {};
    this.bullets = [];
    this.blocks = [
      new Block(200, 0, 50, 100),
      new Block(0, 150, 100, 50),
      new Block(75, 275, 100, 50),
      new Block(250, 250, 50, 100),
      new Block(0, 400, 150, 50),
      new Block(250, 450, 50, 250),
      new Block(350, 150, 100, 50),
      new Block(400, 275, 100, 50),
      new Block(500, 75, 50, 125),
      new Block(550, 150, 50, 50),
      new Block(650, 350, 50, 50),
      new Block(550, 450, 50, 250),
      new Block(700, 500, 150, 50),
      new Block(750, 300, 50, 50),
      new Block(800, 50, 50, 150),
      new Block(850, 150, 50, 50),
      new Block(800, 450, 50, 50),
      new Block(1000, 500, 50, 50),
      new Block(1350, 500, 150, 50),
      new Block(925, 325, 100, 100),
      new Block(1350, 250, 50, 150),
      new Block(1200, 250, 100, 50),
      new Block(1150, 150, 50, 250),
      new Block(1150, 450, 50, 250),
    ];
  }
}