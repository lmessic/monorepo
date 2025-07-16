// 观察者模式

// 目标对象
class Subject {
  constructor() {
    // 存放观察者对象
    this.observers = [];
    // 状态
    this.state = null;

    console.log('初始化目标对象')
  }
  setState(state) {
    // 更新状态
    this.state = state;
    // 通知观察者
    this.notifyObservers();
  }
  // 添加
  add(observer) {
    console.log('添加observer')
    this.observers.push(observer);
  }
  // 移除
  remove(observer) {
    console.log('移除观察者')
    this.observers.forEach((ob, index) => {
      if (ob === observer) {
        this.observers.splice(index, 1)
      }
    })
  }
  // 通知
  notifyObservers() {
    this.observers.forEach((ob) => {
      ob.update(this.state);
    })
  }
}

// 观察者
class Observer {
  update(state) {
    console.log(`${state}状态更新`)
  }
}
