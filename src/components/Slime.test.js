import React from "react";
import Enzyme, { mount } from "enzyme";
import Game from "../lib/game";
import Slime from "./Slime";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const all = color => {
  let squares = [];
  for (var i = 0; i < 7; i++) {
    squares[i] = Array(7).fill(color);
  }
  return squares;
};

test("Slime component renders the winner when game is over", () => {
  const g = new Game(all("green"));
  const wrapper = mount(<Slime game={g} active={null} onClick={() => false} />);
  const h2 = wrapper.find("h2.winner");
  expect(h2.text()).toBe("green is the winner!");
});
