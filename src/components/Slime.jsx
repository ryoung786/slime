import React from "react";
import Board from "./Board";
import ColorCount from "./ColorCount";

const WinAnnouncement = props => {
  return props.winner ? <h2>{props.winner} is the winner!</h2> : "";
};

const Slime = props => {
  return (
    <React.Fragment>
      <Board
        squares={props.squares}
        active={props.active}
        onClick={(i, j) => props.onClick(i, j)}
      />
      <ColorCount count={props.color_count} />
      <WinAnnouncement winner={props.winner} />
    </React.Fragment>
  );
};

export default Slime;
