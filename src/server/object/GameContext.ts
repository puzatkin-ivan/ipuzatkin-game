export class GameContext {
  public players;
  public bullets;
  public static INITIAL_COORDINATES = {
    x: 123,
    y: 122,
  };
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