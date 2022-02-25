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

function deepCopyArrayValues(array) {
  const arr = [];
  const n = array.length;
  for (let i = 0; i < n; i++) {
    arr[i] = array[i].value;
  }
  return arr;
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
    this.beginSelectionSort = this.beginSelectionSort.bind(this);
    this.beginInsertionSort = this.beginInsertionSort.bind(this);
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
    const arr = deepCopyArrayValues(this.state.arr);
    const n = arr.length;

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

          // swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
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

  async beginSelectionSort() {
    const arr = deepCopyArrayValues(this.state.arr);
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let min_idx = i;
      for (let j = i + 1; j < n; j++) {
        await this.animate({
          [j]: new Bar(arr[j], "SELECT"),
          [min_idx]: new Bar(arr[min_idx], "SELECT"),
        });
        await this.animate({
          [j]: new Bar(arr[j], "INIT"),
          [min_idx]: new Bar(arr[min_idx], "INIT"),
        });
        if (arr[j] < arr[min_idx]) {
          min_idx = j;
        }
      }

      await this.animate({
        [i]: new Bar(arr[min_idx], "SELECT"),
        [min_idx]: new Bar(arr[i], "SELECT"),
      });

      // swap
      [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];

      await this.animate({
        [min_idx]: new Bar(arr[min_idx], "INIT"),
        [i]: new Bar(arr[i], "SORTED"),
      });
    }
    if (n > 0) await this.animate({ [n - 1]: new Bar(arr[n - 1], "SORTED") });
  }

  async beginInsertionSort() {
    const arr = deepCopyArrayValues(this.state.arr);
    const n = arr.length;

    if (n > 0) await this.animate({ [0]: new Bar(arr[0], "SORTED") });
    for (let i = 1; i < n; i++) {
      let j = i - 1;
      await this.animate({ [i]: new Bar(arr[i], "SELECT") });
      while (j >= 0 && arr[j] > arr[j + 1]) {
        await this.animate({
          [j]: new Bar(arr[j + 1], "SELECT"),
          [j + 1]: new Bar(arr[j], "SORTED"),
        });
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        j--;
      }
      await this.animate({ [j + 1]: new Bar(arr[j + 1], "SORTED") });
    }
  }

  componentDidMount() {
    // this.beginBubbleSort();
    this.beginInsertionSort();
    // this.beginSelectionSort();
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
