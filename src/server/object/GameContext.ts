export class GameContext {
  public players;
  public bullets;
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
  public blocks;

  constructor() {
    this.players = {};
    this.bullets = [];
    this.blocks = {
      block1: {
        x: 250,
        y: 150,
      },
      block2: {
        x: 700,
        y: 150,
      },
      block3: {
        x: 1150,
        y: 150,
      },
      block4: {
        x: 250,
        y: 350,
      },
      block5: {
        x: 700,
        y: 350,
      },
      block6: {
        x: 1150,
        y: 350,
      },
    };
  }
}