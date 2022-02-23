import React, { Component } from "react";
import "./Block.css";

const stateColor = {
  INIT: "#9E3498",
  SELECT: "#E80310",
  SORTED: "#11FA03",
};

export class Block extends Component {
  render() {
    const { bar, width } = this.props;
    return (
      <div
        style={{
          width: width,
          height: `${bar.value}%`,
          backgroundColor: stateColor[bar.state],
        }}
        className="block"
      >
        {}
      </div>
    );
  }
}

export default Block;
