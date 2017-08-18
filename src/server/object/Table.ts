

export class Table {
  public first: string;
  private current: string;
  private previous: string;
  private isFound: boolean;

  constructor() {
    this.first = "";
    this.current = "";
    this.previous = "";
  }

  insert(players) {
    for (let playerId of Object.keys(players)) {
      this.isFound = false;
      this.current = this.first;
      this.previous = "";

      while (this.current != "" && !this.isFound) {
        if (players[this.current].coefficient >= players[playerId].coefficient) {
          this.previous = this.current;
          this.current = players[this.current].nextPlayerId;
        } else {
          this.isFound = true;
        }
      }

      if (this.previous = "") {
        players[playerId].nextPlayerId = this.first;
        this.first = players[playerId].playerId;
      } else if (this.isFound) {
        players[this.previous].nextPlayerId = playerId;
        players[playerId].nextPlayerId = this.current;
      }
    }
  }
}