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

  insert(players, playerId: string) {
    this.isFound = false;
    this.current = this.first;
    this.previous = "";

    while (this.current != "" && !this.isFound) {
      if (players[this.current].coefficient > players[playerId].coefficient) {
        this.previous = this.current;
        this.current = players[this.current].nextPlayerId;
      } else {
        this.isFound = true;
      }
    }
    players[playerId].nextPlayerId = this.current;
    if (this.previous === "") {
      this.first = playerId;
    } else {
      players[this.previous].nextPlayerId = playerId;
    }
  }
}