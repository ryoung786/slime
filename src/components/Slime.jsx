import React from "react";
import Board from "./Board";
import ColorCount from "./ColorCount";

const WinAnnouncement = props => {
  return props.winner ? <h2>{props.winner} is the winner!</h2> : null;
};

const Slime = props => {
  const winner = props.game.getWinner();
  const color_count = props.game.countColors();

  return (
    <React.Fragment>
      <Board
        squares={props.game.board}
        active={props.active}
        onClick={props.onClick}
      />
      <ColorCount count={color_count} />
      <WinAnnouncement winner={winner} />
    </React.Fragment>
  );
};

export default Slime;
