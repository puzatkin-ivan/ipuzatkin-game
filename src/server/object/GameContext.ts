import {Block} from "./Block";
import {BlockMap} from "../processes/CreateMap";

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
    this.blocks = BlockMap;
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