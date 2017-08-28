export function sortTable(players: any) {
  players.sort((playerOne, playerTwo) => {
    const scoreOne = playerOne.score;
    const scoreTwo = playerTwo.score;
    if (scoreOne > scoreTwo) {
      return -1;
    }
    if (scoreOne < scoreTwo) {
      return 1
    }
    return 0;
  });
}