import React, { Component } from "react";
import "./Slime.css";

function Square(props) {
  const color = props.value || "";
  const clazz = "square " + color;

  return <div className={clazz} onClick={props.onClick} />;
}

class Board extends Component {
  renderSquare(i, j) {
    return (
      <Square
        key={7 * i + j}
        value={this.props.squares[i][j]}
        onClick={() => this.props.onClick(i, j)}
      />
    );
  }

  render() {
    return (
      <div>
        {this.props.squares.map((row, i) => (
          <div className="row" key={i}>
            {row.map((square, j) => this.renderSquare(i, j))}
          </div>
        ))}
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
    console.log(squares);

    this.state = {
      squares: squares,
      active: null, // {x, y}
      player_turn: "blue"
    };
    console.log(this.state.squares[1][1]);
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

  isGameOver() {
    const count = this.countColors();
    // is one color out of squares?
    if (!count["blue"] && count["green"] > 0) return "green";
    if (!count["green"] && count["blue"] > 0) return "blue";
    // is the board already full?  if so, player with the most squares wins
    if (!count[null]) return count["blue"] > count["green"] ? "blue" : "green";
    // are there any valid moves for the active player?  if not, tally up
    // the count and declare a winner

    // otherwise, the game is not over
    return false;
  }

  handleClick(x, y) {
    if (this.state.active) {
      const did_move = this.move(x, y);
      // if (did_move) {
      //   this.countColors();
      // }
    } else if (this.state.squares[x][y] == this.state.player_turn) {
      this.setState({ active: { x: x, y: y } });
    }
  }

  validMoves() {
    const a = this.state.active;
    if (!a) return [];

    const delta = [].concat(
      ...[-2, -1, 0, 1, 2].map(i =>
        [-2, -1, 0, 1, 2].map(j => {
          return { x: i, y: j };
        })
      )
    );
    return delta
      .map(d => {
        return { x: a.x + d.x, y: a.y + d.y };
      })
      .filter(sq => sq.x >= 0 && sq.x < 7 && sq.y >= 0 && sq.y < 7) // bounds check
      .filter(sq => !(sq.x === a.x && sq.y === a.y)); // remove active square
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
    this.setState({
      active: null,
      squares: squares,
      player_turn: this.state.player_turn === "blue" ? "green" : "blue"
    });
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