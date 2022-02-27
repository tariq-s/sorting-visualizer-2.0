import Bar from "../Bar";
import deepCopyArrayValues from "../utils/deepCopyArrayValues";

async function insertionSort() {
  const arr = deepCopyArrayValues(this.state.arr);
  const n = arr.length;
  const delay = 30;
  if (n > 0) await this.animate({ [0]: new Bar(arr[0], "SORTED") }, delay);
  for (let i = 1; i < n; i++) {
    let j = i - 1;
    await this.animate({ [i]: new Bar(arr[i], "SELECT") }, delay);
    while (j >= 0 && arr[j] > arr[j + 1]) {
      await this.animate(
        {
          [j]: new Bar(arr[j + 1], "SELECT"),
          [j + 1]: new Bar(arr[j], "SORTED"),
        },
        delay
      );
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      j--;
    }
    await this.animate({ [j + 1]: new Bar(arr[j + 1], "SORTED") }, delay);
  }
}

export default insertionSort;
