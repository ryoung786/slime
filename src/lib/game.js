const default_initial_board = (() => {
  let squares = [];
  for (var i = 0; i < 7; i++) {
    squares[i] = Array(7).fill(null);
  }
  squares[0][0] = "blue";
  squares[0][6] = "green";
  squares[6][6] = "blue";
  squares[6][0] = "green";
  return squares;
})();

class Game {
  constructor(
    board = default_initial_board,
    players = ["blue", "green"],
    turn = 0
  ) {
    this.board = board;
    this.players = players;
    this.turn = turn; // index for players array
  }

  currentPlayer = () => this.players[this.turn];

  isValidMove(src, dest) {
    return (
      dest.x >= 0 &&
      dest.x < 7 &&
      dest.y >= 0 &&
      dest.y < 7 &&
      Math.abs(dest.x - src.x) <= 2 &&
      Math.abs(dest.y - src.y) <= 2
    );
  }
  adjacent(a, b) {
    return Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1;
  }
  flipAdjacent(x, y) {
    const row = [x - 1, x, x + 1];
    const col = [y - 1, y, y + 1];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        const r = row[i];
        const c = col[j];
        if (r < 0 || r > 6 || c < 0 || c > 6) continue;
        if (this.board[r][c]) this.board[r][c] = this.currentPlayer();
      }
    }
    return this.board;
  }
  move(src, dest) {
    const src_player = this.board[src.x][src.y];

    if (!src_player) return false; // must be a piece at the starting spot
    if (this.currentPlayer() !== src_player) return false; // must be their turn
    if (this.board[dest.x][dest.y]) return false; // destination square must be empty
    if (!this.isValidMove(src, dest)) return false; // must be a valid move

    // flip the destination square
    this.board[dest.x][dest.y] = src_player;

    // if it's not a clone, remove the source piece
    if (!this.adjacent(src, dest)) {
      this.board[src.x][src.y] = null;
    }

    // flip over all the occupied squares adjacent to the destination
    this.flipAdjacent(dest.x, dest.y);

    // make it the next player's turn
    this.turn = (this.turn + 1) % this.players.length;
    return true;
  }

  countColors() {
    return [].concat(...this.board).reduce((count, sq) => {
      count[sq] = count[sq] ? count[sq] + 1 : 1;
      return count;
    }, {});
  }
  hasValidMove(x, y) {
    for (let xd = -2; xd <= 2; xd++) {
      for (let yd = -2; yd <= 2; yd++) {
        let i = x + xd;
        let j = y + yd;
        if (i < 0 || i > 6) continue;

        if (this.board[i][j] === null) return true;
      }
    }
    return false;
  }
  getWinner() {
    const count = this.countColors();
    // const count = { blue: 5, green: 9, null: 29 };
    // is one color out of squares?
    if (!count.blue && count.green > 0) return "green";
    if (!count.green && count.blue > 0) return "blue";
    // is the board already full?  if so, player with the most squares wins
    if (!count[null]) return count.blue > count.green ? "blue" : "green";
    // are there any valid moves for the active player?  if not, tally up
    // the count and declare a winner
    const current_player = this.currentPlayer();
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.board[i][j] !== current_player) continue;
        if (this.hasValidMove(i, j)) return false;
      }
    }

    // otherwise, the game is over and the other player has won
    return count.blue > count.green ? "blue" : "green";
  }
}

export default Game;
