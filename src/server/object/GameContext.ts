import {Block} from "./Block";

export class GameContext {
  public players;
  public bullets;
  public blocks;
  public static INITIAL_COORDINATES: {x: number, y: number}[] = [
    {x: 100, y: 100},
    {x: 1400, y: 100},
    {x: 700, y: 250},
    {x: 300, y: 200},
    {x: 1250, y: 200},
    {x: 100, y: 500},
    {x: 1400, y: 450},
    {x: 950, y: 500},
    {x: 700, y: 450},
    {x: 700, y: 100},
  ];

  constructor() {
    this.players = {};
    this.bullets = [];
    this.blocks = [
      new Block(200, 200),
      new Block(200, 300),
      new Block(200, 400),
      new Block(300, 200),
      new Block(400, 200),
      new Block(500, 400),
      new Block(600, 500),
      new Block(700, 600),
      new Block(800, 700),

      new Block(800, 900),
      new Block(700, 1000),
      new Block(800, 1000),
      new Block(900, 1000),

      new Block(600, 1100),
      new Block(700, 1100),
      new Block(800, 1100),
      new Block(900, 1100),
      new Block(1000, 1100),

      new Block(700, 1200),
      new Block(800, 1200),
      new Block(900, 1200),
      new Block(800, 1300),
      //new Block(1000, 1100),
      /*new Block(550, 1),
      new Block(650, 3),
      new Block(550, 20),
      new Block(700, 50),
      new Block(750, 3),
      new Block(800, 5),
      new Block(850, 1),
      new Block(800, 4),
      new Block(1000, 0),
      new Block(1350, 50),
      new Block(900, 200),
      new Block(925, 40),
      new Block(1350, 50),
      new Block(1200, 50),
      new Block(1150, 50),
      new Block(1150, 50),*/
    ];
  }

  serialization(): object {
    let players = [];
    let bullets = [];
    let blocks = [];

    for (const item of Object.keys(this.players)) {
      const player = this.players[item];
      players.push(player.serializationForDraw());
    }

    for (const bullet of this.bullets) {
      bullets.push(bullet.serialization());
    }

    for (const block of this.blocks) {
      blocks.push(block.serialization());
    }

    console.log('Valera nastalo tvoe vremya');
    return {
      players: players,
      bullets: bullets,
      blocks: blocks,
    }
  }
}