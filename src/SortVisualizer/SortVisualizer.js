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

function getBubbleSortAnimations(array) {
  const arr = [];
  const n = array.length;
  for (let i = 0; i < N; i++) {
    arr[i] = array[i].value;
  }

  const animations = [];
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      animations.push({
        [j]: new Bar(arr[j], "SELECT"),
        [j + 1]: new Bar(arr[j + 1], "SELECT"),
      });
      if (arr[j] > arr[j + 1]) {
        animations.push({
          [j]: new Bar(arr[j + 1], "SELECT"),
          [j + 1]: new Bar(arr[j], "SELECT"),
        });
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      animations.push({
        [j]: new Bar(arr[j], "INIT"),
        [j + 1]: new Bar(arr[j + 1], "INIT"),
      });
    }
    animations.push({ [n - 1 - i]: new Bar(arr[n - 1 - i], "SORTED") });
  }
  if (n > 0) animations.push({ [0]: new Bar(arr[0], "SORTED") });
  return animations;
}

export class SortVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: generateRandomArray(N),
      n: N,
    };
    this.beginAnimation = this.beginAnimation.bind(this);
  }

  async beginAnimation() {
    const animations = getBubbleSortAnimations(this.state.arr);

    for (const animation of animations) {
      this.setState((prevState) => {
        for (const idx of Object.keys(animation)) {
          prevState.arr[idx] = animation[idx];
        }
        return prevState;
      });

      await new Promise((resolve, reject) => {
        let timeOut = setTimeout(() => {
          clearTimeout(timeOut);
          resolve("loop done");
        }, 10);
      });
    }
  }
  componentDidMount() {
    this.beginAnimation();
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
