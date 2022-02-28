import React, { Component } from "react";
import "./SortVisualizer.css";

import generateRandomArray from "../../utils/generateRandomArray";

import Block from "../Block/Block";

import selectionSort from "../../sort_algorithms/selectionSort";
import mergeSort from "../../sort_algorithms/mergeSort";
import quickSort from "../../sort_algorithms/quickSort";
import bubbleSort from "../../sort_algorithms/bubbleSort";
import insertionSort from "../../sort_algorithms/insertionSort";

const algos = ["selection", "merge", "quick", "bubble", "insertion"];

function delay(speed) {
  return 101 - speed;
}

const N = 150;
class SortVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: generateRandomArray(N),
      n: N,
      activeAlgo: 1,
      speed: 50,
      isRunning: false,
    };
    this.generateNewArray = this.generateNewArray.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleAlgoChange = this.handleAlgoChange.bind(this);
    this.startSort = this.startSort.bind(this);

    this.animate = this.animate.bind(this);
    this.beginBubbleSort = this.beginBubbleSort.bind(this);
    this.beginSelectionSort = this.beginSelectionSort.bind(this);
    this.beginInsertionSort = this.beginInsertionSort.bind(this);
    this.beginMergeSort = this.beginMergeSort.bind(this);
    this.beginQuickSort = this.beginQuickSort.bind(this);
  }

  generateNewArray() {
    this.setState({ arr: generateRandomArray(this.state.n) });
  }

  handleSizeChange(event) {
    this.setState({ n: event.target.value }, () => {
      this.generateNewArray();
    });
  }

  handleSpeedChange(event) {
    this.setState({ speed: event.target.value });
  }

  handleAlgoChange(algo) {
    this.setState({ activeAlgo: algo });
  }

  async startSort() {
    switch (this.state.activeAlgo) {
      case 0:
        await this.beginSelectionSort();
        break;
      case 1:
        await this.beginMergeSort();
        break;
      case 2:
        await this.beginQuickSort();
        break;
      case 3:
        await this.beginBubbleSort();
        break;
      case 4:
        await this.beginInsertionSort();
        break;
      default:
        await this.beginMergeSort();
    }
    this.setState({ isRunning: false });
  }

  async animate(animation) {
    await new Promise((resolve) => {
      setTimeout(() => {
        this.setState((prevState) => {
          for (const idx of Object.keys(animation)) {
            prevState.arr[idx] = animation[idx];
          }
          return prevState;
        });
        resolve();
      }, delay(this.state.speed));
    });
  }

  async beginBubbleSort() {
    await bubbleSort.call(this);
  }

  async beginSelectionSort() {
    await selectionSort.call(this);
  }

  async beginInsertionSort() {
    await insertionSort.call(this);
  }

  async beginMergeSort() {
    await mergeSort.call(this);
  }

  async beginQuickSort() {
    await quickSort.call(this);
  }

  render() {
    return (
      <div className="sort-visualizer">
        <div className="navbar">
          <div className="logo">Sorting Visualizer</div>
          <div className="button">
            <button
              disabled={this.state.isRunning}
              onClick={this.generateNewArray}
            >
              Generate New Array
            </button>
          </div>
          <div className="controls">
            <div className="control">
              <label className="label">Size</label>
              <input
                id="size"
                type="range"
                disabled={this.state.isRunning}
                value={this.state.n}
                min={10}
                max={150}
                step={10}
                onChange={this.handleSizeChange}
              />
            </div>
            <div className="control">
              <label className="label">Speed</label>
              <input
                id="speed"
                type="range"
                value={this.state.speed}
                min={1}
                max={100}
                step={1}
                onChange={this.handleSpeedChange}
              />
            </div>
          </div>
          <div
            className="algos"
            style={{
              pointerEvents: `${this.state.isRunning ? "none" : "auto"}`,
            }}
          >
            {algos.map((algo, id) => (
              <div
                className={`algo ${
                  this.state.activeAlgo === id ? "active" : ""
                }`}
                onClick={() => {
                  this.handleAlgoChange(id);
                }}
              >
                {algo}
              </div>
            ))}
          </div>
          <div className="button">
            <button
              disabled={this.state.isRunning}
              onClick={() => this.setState({ isRunning: true }, this.startSort)}
            >
              Sort
            </button>
          </div>
        </div>
        <div className="screen">
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
      </div>
    );
  }
}

export default SortVisualizer;
