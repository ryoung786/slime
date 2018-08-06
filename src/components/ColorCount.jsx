import React from "react";

const ColorCount = props => {
  return (
    <div>
      <h2>Green: {props.count["green"] || 0}</h2>
      <h2>Blue: {props.count["blue"] || 0}</h2>
    </div>
  );
};

export default ColorCount;
