import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { sketch } from "./sketch"
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";

function App() {
  return (
    <div className="App">
      return <ReactP5Wrapper sketch={sketch} />
    </div>
  );
}

export default App;
