import React, { Component } from "react";
import "./App.css";
import Slime from "./Slime.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello, World!</h1>
        <Slime />
      </div>
    );
  }
}

export default App;