import React, { Component } from "react";
import "./Slime.css";

const Square = props => {
  const color = props.value || "";
  const active = props.active ? "active" : "";
  const clazz = "square " + color + " " + active;

  return <div className={clazz} onClick={props.onClick} />;
};

class Board extends Component {
  renderSquare(i, j) {
    const a = this.props.active;
    const active = a && (a.x === i && a.y === j);
    return (
      <Square
        key={7 * i + j}
        value={this.props.squares[i][j]}
        onClick={() => this.props.onClick(i, j)}
        active={active}
      />
    );
  }

  render() {
    return (
      <div className="board">
        {this.props.squares.map((row, i) =>
          row.map((_, j) => this.renderSquare(i, j))
        )}
      </div>
    );
  }
}

const ColorCount = props => {
  return (
    <div>
      <h2>Green: {props.count["green"] || 0}</h2>
      <h2>Blue: {props.count["blue"] || 0}</h2>
    </div>
  );
};

class Slime extends Component {
  constructor(props) {
    super(props);

    let squares = [];
    for (var i = 0; i < 7; i++) {
      squares[i] = Array(7).fill(null);
    }
    squares[0][0] = "blue";
    squares[0][6] = "green";
    squares[6][6] = "blue";
    squares[6][0] = "green";

    this.state = {
      squares: squares,
      active: null, // {x, y}
      player_turn: "blue"
    };
  }

  countColors() {
    const squares = this.state.squares;
    let count = {};
    squares.forEach((row, _) => {
      row.forEach((entry, _) => {
        count[entry] = count[entry] ? count[entry] + 1 : 1;
      });
    });
    return count;
  }

  emptySquares() {
    let empties = [];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.state.squares[i][j] === null) {
          empties.push({ x: i, y: j });
        }
      }
    }
    return empties;
  }

  isGameOver() {
    const count = this.countColors();
    // is one color out of squares?
    if (!count.blue && count.green > 0) return "green";
    if (!count.green && count.blue > 0) return "blue";
    // is the board already full?  if so, player with the most squares wins
    if (!count[null]) return count.blue > count.green ? "blue" : "green";
    // are there any valid moves for the active player?  if not, tally up
    // the count and declare a winner
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (this.state.squares[i][j] !== this.state.player_turn) continue;
        if (this.hasValidMove(i, j)) return false;
      }
    }

    // otherwise, the game is over and the other player has won
    return count.blue > count.green ? "blue" : "green";
  }

  handleClick(x, y) {
    if (this.state.squares[x][y] === this.state.player_turn) {
      this.setState({ active: { x: x, y: y } });
    } else if (this.state.active) {
      this.move(x, y);
    }
  }

  hasValidMove(x, y) {
    for (let xd = -2; xd <= 2; xd++) {
      for (let yd = -2; yd <= 2; yd++) {
        let i = x + xd;
        let j = y + yd;
        if (i < 0 || i > 6) continue;

        if (this.state.squares[i][j] === null) return true;
      }
    }
    return false;
  }

  isValidMove(x, y) {
    const a = this.state.active;
    return (
      x >= 0 &&
      x < 7 &&
      y >= 0 &&
      y < 7 &&
      Math.abs(x - a.x) <= 2 &&
      Math.abs(y - a.y) <= 2
    );
  }

  move(x, y) {
    const a = this.state.active;
    const b = { x: x, y: y };
    let squares = this.state.squares;

    // is it their turn?
    if (this.state.player_turn !== squares[a.x][a.y]) return false;

    // is destination square empty?
    if (squares[x][y]) return false;

    // is it a valid move?
    if (!this.isValidMove(x, y)) return false;

    // all systems go, make the move
    squares[x][y] = squares[a.x][a.y];
    if (!this.adjacent(a, b)) {
      squares[a.x][a.y] = null;
    }
    squares = this.flipAround(x, y, squares);
    this.setState(prev => ({
      active: null,
      squares: squares,
      player_turn: prev.player_turn === "blue" ? "green" : "blue"
    }));
    return true;
  }

  flipAround(x, y, squares) {
    const row = [x - 1, x, x + 1];
    const col = [y - 1, y, y + 1];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        const r = row[i];
        const c = col[j];
        if (r < 0 || r > 6 || c < 0 || c > 6) continue;
        if (squares[r][c]) squares[r][c] = this.state.player_turn;
      }
    }
    return squares;
  }

  adjacent(a, b) {
    return Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1;
  }

  render() {
    const winner = this.isGameOver();
    const win_announcement = winner ? <h2>{winner} is the winner!</h2> : "";
    return (
      <div>
        <Board
          squares={this.state.squares}
          active={this.state.active}
          onClick={(i, j) => this.handleClick(i, j)}
        />
        <ColorCount count={this.countColors()} />
        {win_announcement}
      </div>
    );
  }
}

export default Slime;
