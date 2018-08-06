import React, { Component } from "react";
import Slime from "./components/Slime";
import Game from "./lib/game";

class SlimeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: null, // {x, y}
      game: new Game()
    };
  }

  handleClick(x, y) {
    const game = this.state.game;
    if (game.board[x][y] === game.currentPlayer()) {
      this.setState({ active: { x: x, y: y } });
    } else if (this.state.active) {
      game.move(this.state.active, { x: x, y: y });
      this.setState({
        active: null,
        game: game
      });
    }
  }

  render() {
    return (
      <Slime
        game={this.state.game}
        active={this.state.active}
        onClick={(i, j) => this.handleClick(i, j)}
      />
    );
  }
}

export default SlimeContainer;
