class EventEmitter {
  constructor() {
    // 存储事件与回调函数的关系
    this.handlers = {};
  }
  // 监听事件
  on(eventName, cb) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }

    this.handlers[eventName].push(cb);
  }
  // 触发事件
  emit(eventName, ...args) {
    if (this.handlers[eventName]) {
      const callbacks = this.handlers[eventName].slice();

      callbacks.forEach(cb => {
        cb(...args);
      });
    }
  }
  // 移除指定回调函数
  off(eventName, callback) {
    if (this.handlers[eventName]) {
      this.handlers[eventName] = this.handlers[eventName].filter((cb) => cb !== callback)
    }
  }
  // 单次执行的回调
  once(eventName, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}

// 发布者
class Publisher {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }
  publish(eventName, data) {
    this.eventEmitter.emit(eventName, data);
  }
}

// 订阅者
class Subscriber {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }
  subscribe(eventName, callback) {
    this.eventEmitter.on(eventName, callback);
  }
}

Function.prototype.myNew = function(constructor, ...args) {
  const obj = Object.create(constructor.prototype);

  let res = constructor.call(obj, ...args);

  return res instanceof Object ? res : obj;
}

parent = {
  name: 'parent',
  sex: 'boy',
  colors: ['white', 'black']
}

child1 = {
  sex: 'boy',
  name: 'child1',
  colors: ['white', 'yellow'],
  __proto__: {
    name: '',
    colors: ['white', 'black'],
    features: ['cute', 'sunshine'],
  }
}

child2 = {
  sex: 'boy',
  name: 'child2',
  colors: ['black'],
  __proto__: {
    name: '',
    colors: undefined,
  }
}

function O(obj) {
  function Fn() {};
  Fn.prototype = obj;
  Fn.prototype.constructor = Fn;

  return new Fn();
}

child1 = {
  sex: 'boy',
  colors: ['white'],
  name: 'child1',
}

function Parent(name) {
  this.name = name;
}
Parent.prototype.getName = function() {
  return this.name;
}

function OtherParent() {
  this.colors = ['white'];
}

OtherParent.prototype.getColor = function() {
  return this.colors;
}

function Child(name) {
  this.sex = 'boy';
  Parent.call(this, name);
  OtherParent.call(this);
}

Child.prototype = Object.create(Parent.prototype);
Object.assign(Child.prototype, OtherParent.prototype);

class A {
  constructor() {
    this.name = 'parent'
  }
}

class Child extends A {
  // 不写constructor是因为默认会添加constructor并执行super方法
  // 如果添加了constructor，需要显式调用super方法
  // constructor() {
  //   super();
  // }
}

console.log(new Child())

function createA(obj) {
  function F(){}
  F.prototype = obj;
  F.prototype.constructor = F;

  return new F();
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

  return quickSort(left).concat([arr[middle]], quickSort(right));
}

function maopao(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) {
        const temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
      }
    }
  }
}

function fib(n) {
  if (n < 2) return n;
  let pre = 0, next = 0, result = 1;
  for (let i = 2; i <= n; i++) {
    pre = next;
    next = result;
    result = pre + next;
  }

  return result;
}

function Pro(obj) {
  function Fn() {};
  Fn.prototype = obj;
  Fn.prototype.constructor = Fn;

  return new Fn();
}
