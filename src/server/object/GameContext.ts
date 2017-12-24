import * as Map from "../processes/CreateMap";

export class GameContext {
  public players;
  public bullets;
  public blocks;
  public static INITIAL_COORDINATES: {x: number, y: number}[] = [
    {x: 436, y: 903},
    {x: 330, y: 260},
    {x: 1690, y: 120},
    {x: 2230, y: 420},
    {x: 4220, y: 320},
    {x: 4053, y: 923},
    {x: 4200, y: 1511},
    {x: 3053, y: 1645},
    {x: 1046, y: 1437},
    {x: 258, y: 1579},
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