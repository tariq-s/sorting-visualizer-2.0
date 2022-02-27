import Bar from "../Bar";

function generateRandomArray(n) {
  const array = [];
  for (let i = 0; i < n; i++) {
    array[i] = new Bar(Math.floor(Math.random() * 100 + 1));
  }
  return array;
}

export default generateRandomArray;
