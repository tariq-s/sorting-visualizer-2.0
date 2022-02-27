function deepCopyArrayValues(array) {
  const arr = [];
  const n = array.length;
  for (let i = 0; i < n; i++) {
    arr[i] = array[i].value;
  }
  return arr;
}

export default deepCopyArrayValues;
