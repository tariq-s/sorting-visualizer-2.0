import React, { Component } from "react";
import "./SortVisualizer.css";

import Bar from "../Bar";
import Block from "../Block/Block";

const N = 80;

function generateRandomArray(n) {
  const array = [];
  for (let i = 0; i < n; i++) {
    array[i] = new Bar(Math.floor(Math.random() * 100 + 1));
  }
  return array;
}

class SortVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: generateRandomArray(N),
      n: N,
    };
    this.animate = this.animate.bind(this);
    this.beginBubbleSort = this.beginBubbleSort.bind(this);
  }

  async animate(animation) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState((prevState) => {
          for (const idx of Object.keys(animation)) {
            prevState.arr[idx] = animation[idx];
          }
          return prevState;
        });
        resolve();
      }, 10);
    });
  }

  async beginBubbleSort() {
    const arr = [];
    const n = this.state.arr.length;
    for (let i = 0; i < N; i++) {
      arr[i] = this.state.arr[i].value;
    }

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        await this.animate({
          [j]: new Bar(arr[j], "SELECT"),
          [j + 1]: new Bar(arr[j + 1], "SELECT"),
        });

        if (arr[j] > arr[j + 1]) {
          await this.animate({
            [j]: new Bar(arr[j + 1], "SELECT"),
            [j + 1]: new Bar(arr[j], "SELECT"),
          });

          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
        await this.animate({
          [j]: new Bar(arr[j], "INIT"),
          [j + 1]: new Bar(arr[j + 1], "INIT"),
        });
      }
      await this.animate({ [n - 1 - i]: new Bar(arr[n - 1 - i], "SORTED") });
    }
    if (n > 0) await this.animate({ [0]: new Bar(arr[0], "SORTED") });
  }

  componentDidMount() {
    this.beginBubbleSort();
  }

  render() {
    return (
      <div className="sort-visualizer">
        {this.state.arr.map((bar, idx) => {
          return (
            <Block
              key={idx}
              bar={bar}
              width={`calc(${100 / this.state.n}% - 2px)`}
            />
          );
        })}
      </div>
    );
  }
}

export default SortVisualizer;
