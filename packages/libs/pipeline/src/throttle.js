function throttle(fn, wait, flag) {
  let timer = null;

  return function() {
    // 是否立即执行
    if (flag) {
      fn.call(this, arguments);
      flag = false;
    }

    if (!timer) {
      timer = setTimeout(() => {
        fn.call(this, arguments);
        
        clearTimeout(timer);
        timer = null;
      }, wait);
    }
  }
}