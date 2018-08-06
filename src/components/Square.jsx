import React from "react";
import "./Square.css";

const Square = props => {
  const color = props.value || "";
  const active = props.active ? "active" : "";
  const clazz = "square " + color + " " + active;

  return <div className={clazz} onClick={props.onClick} />;
};

export default Square;
