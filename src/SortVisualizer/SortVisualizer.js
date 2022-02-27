import React, { Component } from "react";
import "./SortVisualizer.css";

import generateRandomArray from "../utils/generateRandomArray";

import Block from "../Block/Block";

import bubbleSort from "../sort_algorithms/bubbleSort";
import selectionSort from "../sort_algorithms/selectionSort";
import insertionSort from "../sort_algorithms/insertionSort";
import mergeSort from "../sort_algorithms/mergeSort";
import quickSort from "../sort_algorithms/quickSort";

const N = 100;
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
    this.beginMergeSort = this.beginMergeSort.bind(this);
    this.beginQuickSort = this.beginQuickSort.bind(this);
  }

  async animate(animation, delay = 10) {
    await new Promise((resolve) => {
      setTimeout(() => {
        this.setState((prevState) => {
          for (const idx of Object.keys(animation)) {
            prevState.arr[idx] = animation[idx];
          }
          return prevState;
        });
        resolve();
      }, delay);
    });
  }

  async beginBubbleSort() {
    bubbleSort.call(this);
  }

  async beginSelectionSort() {
    selectionSort.call(this);
  }

  async beginInsertionSort() {
    insertionSort.call(this);
  }

  async beginMergeSort() {
    mergeSort.call(this);
  }

  async beginQuickSort() {
    quickSort.call(this);
  }

  componentDidMount() {
    // this.beginBubbleSort();
    // this.beginInsertionSort();
    // this.beginSelectionSort();
    // this.beginMergeSort();
    this.beginQuickSort();
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
