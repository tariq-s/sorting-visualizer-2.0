import React, { Component } from "react";
import "./Block.css";

const stateColor = {
  INIT: "#A668A6",
  SELECT: "#DC143C",
  SORTED: "#50C878",
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
