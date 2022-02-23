import React, { Component } from "react";
import "./SortVisualizer.css";

import Bar from "../Bar";
import Block from "../Block/Block";

const N = 80;

function generateRandomArray(n) {
  const array = [];
  for (let i = 0; i < n; i++) {
    array[i] = Math.floor(Math.random() * 100 + 1);
  }
  return array;
}

export class SortVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: generateRandomArray(N).sort((val1, val2) => val1 - val2),
      n: N,
    };
  }

  render() {
    console.log(this.state.arr);
    return (
      <div className="sort-visualizer">
        {this.state.arr.map((val, idx) => {
          return (
            <Block
              key={idx}
              bar={new Bar(val)}
              width={`calc(${100 / this.state.n}% - 2px)`}
            />
          );
        })}
      </div>
    );
  }
}

export default SortVisualizer;
