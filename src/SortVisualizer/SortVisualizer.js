import React, { Component } from "react";
import "./SortVisualizer.css";

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
      arr: generateRandomArray(N),
      n: N,
    };
  }

  render() {
    return (
      <div className="sort-visualizer">
        {this.state.arr.map((bar, idx) => (
          <div
            className="bar"
            key={idx}
            style={{
              width: `calc(${100 / this.state.n}% - 2px)`,
              height: `${bar}%`,
            }}
          ></div>
        ))}
      </div>
    );
  }
}

export default SortVisualizer;
