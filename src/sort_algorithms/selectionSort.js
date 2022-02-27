import Bar from "../Bar";
import deepCopyArrayValues from "../utils/deepCopyArrayValues";

async function selectionSort() {
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

export default selectionSort;
