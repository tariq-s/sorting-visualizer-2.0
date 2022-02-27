import Bar from "../Bar";
import deepCopyArrayValues from "../utils/deepCopyArrayValues";

async function merge(arr, low, mid, high) {
  if (low == high) return;

  let i = low,
    j = mid + 1;
  const temp = [];

  while (i <= mid && j <= high) {
    await this.animate({
      [i]: new Bar(arr[i], "SELECT"),
      [j]: new Bar(arr[j], "SELECT"),
    });
    await this.animate({
      [i]: new Bar(arr[i], "INIT"),
      [j]: new Bar(arr[j], "INIT"),
    });
    if (arr[i] <= arr[j]) {
      temp.push(arr[i]);
      i++;
    } else {
      temp.push(arr[j]);
      j++;
    }
  }
  if (i == mid + 1) {
    while (j <= high) {
      temp.push(arr[j]);
      j++;
    }
  } else {
    while (i <= mid) {
      temp.push(arr[i]);
      i++;
    }
  }

  for (let k = 0; k < temp.length; k++) {
    await this.animate({ [low + k]: new Bar(arr[low + k], "SELECT") });
    arr[low + k] = temp[k];
    await this.animate({ [low + k]: new Bar(arr[low + k], "INIT") });
  }
}

async function mergeSortHelper(arr, low, high) {
  if (low >= high) return;

  let mid = Math.floor(low + (high - low) / 2);

  await mergeSortHelper(arr, low, mid);
  await mergeSortHelper(arr, mid + 1, high);
  await merge(arr, low, mid, high);
}

async function mergeSort() {
  const arr = deepCopyArrayValues(this.state.arr);
  const n = arr.length;
  mergeSortHelper = mergeSortHelper.bind(this);
  merge = merge.bind(this);
  await mergeSortHelper(arr, 0, n - 1);
  for (let i = 0; i < n; i++) {
    await this.animate({ [i]: new Bar(arr[i], "SORTED") });
  }
}

export default mergeSort;
