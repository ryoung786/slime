import Game from "./game";

const all = color => {
  let squares = [];
  for (var i = 0; i < 7; i++) {
    squares[i] = Array(7).fill(color);
  }
  return squares;
};

describe("The game", () => {
  it("creates a default board", () => {
    const g = new Game();
    expect(g.board[0][0]).toBe("blue");
    expect(g.board[0][6]).toBe("green");
    expect(g.board[0][5]).toBe(null);

    expect(g.countColors()).toEqual({ green: 2, blue: 2, null: 45 });
  });

  it("can detect a winner with no blues left", () => {
    // no blue squares left
    let squares = all("green");
    squares[0][0] = null;
    let g = new Game(squares);
    expect(g.getWinner()).toBe("green");
  });

  it("can detect a winner with no squares empty", () => {
    // no empty spaces
    let squares = all("green");
    squares[0][0] = "blue";
    const g = new Game(squares);
    expect(g.getWinner()).toBe("green");
  });

  it("can detect that the game is not yet over", () => {
    // no winner
    const g = new Game();
    expect(g.getWinner()).toBe(false);
  });

  it("detects a winner when the current player is out of moves", () => {
    let squares = all("green");
    squares[0][0] = null;
    squares[0][1] = "blue";
    squares[0][2] = "blue";
    squares[1][0] = "blue";
    squares[1][1] = "blue";
    squares[1][2] = "blue";
    squares[2][0] = "blue";
    squares[2][1] = "blue";
    squares[2][2] = "blue";
    const g = new Game(squares, ["blue", "green"], 1);
    expect(g.getWinner()).toBe("green");
  });
});
