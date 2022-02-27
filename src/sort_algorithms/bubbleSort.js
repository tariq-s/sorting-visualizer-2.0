import Bar from "../Bar";
import deepCopyArrayValues from "../utils/deepCopyArrayValues";

async function bubbleSort() {
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

export default bubbleSort;
