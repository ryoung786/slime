import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import {
  withKnobs,
  object,
  select,
  array,
  number
} from "@storybook/addon-knobs";

import ColorCount from "../components/ColorCount";
import Game from "../lib/game";
import SlimeContainer from "../SlimeContainer";
import Board from "../components/Board";

const slime = storiesOf("Slime", module);
slime.addDecorator(withKnobs);
slime.add("ColorCount", () => (
  <ColorCount
    count={{
      green: number("green", 4),
      blue: number("blue", 8),
      null: number("null", 33)
    }}
  />
));

slime.add("SlimeContainer", () => <SlimeContainer />);

const squares = [];
const foo = () => {
  let choice = select(
    "Board",
    { green: "all green", blue: "all blue", empty: "empty" },
    "blue",
    "ID1"
  );

  let color = null;
  if (choice === "green") color = "green";
  if (choice === "blue") color = "blue";
  if (choice === "empty") color = null;

  let squares = [];
  for (var i = 0; i < 7; i++) {
    squares[i] = Array(7).fill(color);
  }
  return squares;
};
slime.add("Board", () => (
  <Board
    squares={foo()}
    active={{ x: number("active x", 0), y: number("active y", 0) }}
    onClick={() => null}
  />
));
