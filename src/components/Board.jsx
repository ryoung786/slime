import React, { Component } from "react";
import Square from "./Square";
import "./Board.css";

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

export default Board;
