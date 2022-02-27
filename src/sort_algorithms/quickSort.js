import Bar from "../Bar";
import deepCopyArrayValues from "../utils/deepCopyArrayValues";

async function partition(arr, low, high) {
  let i = low - 1;
  let j = high;
  let pivot = arr[high];
  while (i < j) {
    i++;
    while (arr[i] <= pivot) i++;
    j--;
    while (arr[j] > pivot) j--;

    if (i < j) {
      await this.animate({
        [j]: new Bar(arr[j], "SELECT"),
        [i]: new Bar(arr[i], "SELECT"),
      });
      [arr[i], arr[j]] = [arr[j], arr[i]];
      await this.animate({
        [j]: new Bar(arr[j], "SELECT"),
        [i]: new Bar(arr[i], "SELECT"),
      });
      await this.animate({
        [j]: new Bar(arr[j], "INIT"),
        [i]: new Bar(arr[i], "INIT"),
      });
    }
  }
  await this.animate({
    [j + 1]: new Bar(arr[j + 1], "SELECT"),
    [high]: new Bar(arr[high], "SELECT"),
  });
  [arr[j + 1], arr[high]] = [arr[high], arr[j + 1]];
  await this.animate({
    [j + 1]: new Bar(arr[j + 1], "SELECT"),
    [high]: new Bar(arr[high], "SELECT"),
  });
  await this.animate({
    [j + 1]: new Bar(arr[j + 1], "INIT"),
    [high]: new Bar(arr[high], "INIT"),
  });
  return j + 1;
}

async function quickSortHelper(arr, low, high) {
  if (low >= high) return;

  let idx = await partition(arr, low, high);
  await quickSortHelper(arr, low, idx - 1);
  await quickSortHelper(arr, idx + 1, high);
}

async function quickSort() {
  const arr = deepCopyArrayValues(this.state.arr);
  const n = arr.length;
  quickSortHelper = quickSortHelper.bind(this);
  partition = partition.bind(this);
  await quickSortHelper(arr, 0, n - 1);
  for (let i = 0; i < n; i++) {
    await this.animate({ [i]: new Bar(arr[i], "SORTED") });
  }
}

export default quickSort;
