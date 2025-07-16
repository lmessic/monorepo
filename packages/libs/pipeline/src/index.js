class Game {
  constructor(command) {
    this.command = command;
  }

  opendDialog() {
    this.command.setPrice();
  }
}

// 逻辑层
class Command {
  setPrice(price) {
    
  }
}

// call
Function.prototype.myCall = function(context) {
  if (typeof this !== 'function') {
    throw Error("this is not a function");
  }

  const args = [...arguments].slice(1);
  context = context || window;
  context.fn = this;

  let result = context.fn(...args);
  delete context.fn;

  return result;
}

// apply
Function.prototype.myApply = function(context, arr) {
  if (typeof this !== 'function') {
    throw Error("this is not a function");
  }
  context = context || window;
  context.fn = this;

  let result;

  result = arr ? context.fn([...arr]) : context.fn();
  delete context.fn;
  return result;
}

// bind
Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') {
    throw Error("this is not a function");
  }

  const args = [...arguments].slice(1);
  const self = this;

  return function Fn() {
    // 判断返回的函数Fn被作为构造函数使用时
    if (this instanceof Fn) {
      return new self(...args, ...arguments);
    }
    return self.apply(context, [...args, ...arguments]);
  }
}