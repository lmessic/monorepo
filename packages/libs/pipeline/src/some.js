function some(callback) {
  let arr = this.slice();

  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      return true;
    }
  }
  return false;
}
