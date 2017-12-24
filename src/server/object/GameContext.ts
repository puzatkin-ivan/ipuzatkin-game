import * as Map from "../processes/CreateMap";

export class GameContext {
  public players;
  public bullets;
  public blocks;
  public static INITIAL_COORDINATES: {x: number, y: number}[] = [
    {x: 185, y: 1275},
    {x: 1530, y: 990},
    {x: 735, y: 2560},
    {x: 2850, y: 1710},
    {x: 4200, y: 2500},
    {x: 4300, y: 1100},
    {x: 1310, y: 520},
    {x: 2450, y: 1220},
    {x: 3280, y: 370},
    {x: 4300, y: 240},
  ];

  constructor() {
    this.players = {};
    this.bullets = [];
    this.blocks = Map.BlockMap;
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

    return {
      players: players,
      bullets: bullets,
      blocks: blocks,
    }
  }
}