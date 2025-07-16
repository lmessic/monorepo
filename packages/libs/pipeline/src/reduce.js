function myReduce(callback, initialValue) {
  if (!Array.isArray(this)) {
    throw new Error("this must be an array");
  }
  if (typeof callback !== "function") {
    throw new Error("callback must be a function");
  }
  // 获取数组
  let arr = this;
  let result = initialValue ?? arr[0];
  let index = initialValue === undefined ? 1 : 0;

  for (let i = index; i < arr.length; i++) {
    result = callback(result, arr[i], i, arr)
  }

  return result;
}