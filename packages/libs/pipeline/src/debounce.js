function debounce(fn, delay, flag) {
  let timer = null;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    // 是否立即执行
    if (flag && !timer) {
      fn.call(this, arguments);
    }
    timer = setTimeout(() => {
      fn.call(this, arguments);
      timer = null;
    }, delay)
  }
}

// call
function myCall(context) {
  if (typeof this !== 'function') {
    throw new Error("this is not a function");
  }

  context = context || globalThis;
  context[fn] = this;

  let args = [...arguments].slice(1);

  const result = context[fn](args);
  delete context[fn];

  return result;
}

// apply
function myApply(context) {
  if (typeof this !== 'function') {
    throw new Error("this is not a fucntion")
  }
  context = context || globalThis;

  let fn = Symbol("key");
  context[fn] = this;
  let args = [...arguments].slice(1);

  const result = args.length ? context[fn](args) : context[fn]();

  delete context[fn];

  return result;
}

// bind
function myBind(context) {
  if (typeof this !== 'function') {
    throw new Error("this is not a fucntion")
  }
  context = context || globalThis;
  let args = [...arguments].slice(1);

  // 保存对原始函数的引用
  const _this = this;

  return function Fn() {
    // 判断返回的函数有没有被new
    if (this instanceof Fn) {
      return new _this(...args, ...arguments);
    } else {
      return _this.apply(context, args.concat(...arguments))
    }
  }
}

function reduce(callback, initialValue) {
  if (!Array.isArray(this)) {
    throw new Error("this is not an array");
  }

  if (typeof callback !== 'function') {
    throw new Error("callback is not a function");
  }

  let arr = this;
  let index = initialValue === undefined ? 1 : 0;
  let result = initialValue === undefined ? arr[0] : initialValue;

  for (let i = index; i < arr.length; i++) {
    result = callback(result, arr[i], i, arr)
  }

  return result;
}

function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  let left = [], right = [], middle = Math.floor(arr.length / 2);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[middle]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([arr[middle]], quickSort(right))
}

// 冒泡排序
function sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }

  return arr;
}