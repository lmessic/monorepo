function map(callback, ctx) {
  // 必须是函数
  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }
  // 只有在传入null或者undefined时，上下文才是window
  if (ctx === null || ctx === undefined) {
    ctx = window;
  }

  let arr = this.slice();
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(callback.call(ctx, arr[i], i, arr))
  }

  return result;
}