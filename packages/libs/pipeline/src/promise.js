const PROMISE_STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
}

// 观察者模式
class MyPromise {
  // 状态
  status = PROMISE_STATUS.PENDING;
  // 结果
  result = null;
  // 失败原因
  reason = null;
  // 成功的回调
  onFulfilledCallbacks = [];
  // 失败的回调
  onRejectedCallbacks = [];

  constructor(executor) {
    executor(this.resolve, this.reject);
  }
  resolev(value) {
    if (this.status === PROMISE_STATUS.PENDING) {
      this.status = PROMISE_STATUS.FULFILLED;
      this.result = value;
      
      // 通知观察者
      this.onFulfilledCallbacks.forEach((cb) => {
        cb(this.result);
      });
    }
  }
  reject(reason) {
    if (this.status === PROMISE_STATUS.PENDING) {
      this.status = PROMISE_STATUS.REJECTED;
      this.reason = reason;

      // 通知
      this.onRejectedCallbacks.forEach((cb) => {
        cb(this.reason);
      })
    }
  }
  // 无论何时都会执行的函数
  finally(onFinally) {
    return this.then((res) => {
      onFinally();
    }, (err) => {
      onFinally();
    })
  }
  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === PROMISE_STATUS.FULFILLED) {
        // 获取上一个then方法的fulfilled值
        const val = onFulfilled(this.result);

        // 传递值到下一个then方法
        resolvePromise(promise2, val, resolve, reject);
      } else if (this.status === PROMISE_STATUS.REJECTED) {
        const rea = onRejected(this.reason);

        resolvePromise(promise2, rea, resolve, reject);
      } else {
        // pending状态
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    })
    return promise2;
  }
  static resolve(value) {
    // 如果是Promise对象，直接返回
    if (value && typeof value === 'object' && (value instanceof MyPromise)) {
      return value;
    }

    return new MyPromise((resolve) => {
      resolve(value);
    })
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    })
  }
  // 返回执行最快的那一个
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        MyPromise.resolve(promise).then((res) => {
          resolve(res);
        }, (err) => {
          reject(err)
        })
      })
    })
  }
  // 所有的promise状态变为fulfilled
  static all(promises) {
    if (!promises.length) return [];

    let count = 0;
    let result = [];

    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        MyPromise.resolve(promise).then((res, index) => {
          count++;
          result[index] = {
            status: PROMISE_STATUS.FULFILLED,
            value: res,
          }
          if (count === promises.length) {
            resolve(result);
          }
        }).catch(err => {
          reject(err)
        })
      })
    })
  }
  // 所有的状态都发生改变
  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      const result = [];

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then((res) => {
          count++;
          result[index] = res;
          if (count === promises.length) {
            resolve(result)
          }
        }, (err) => {
          count++;
          result[index] = {
            status: PROMISE_STATUS.REJECTED,
            value: err,
          }
          if (count === promises.length) {
            resolve(result)
          }
        }).catch((error) => {
          reject(error);
        })
      })
    })
  }
  // 所有的都失败才返回失败
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      const result = [];
      let count = 0;
      promises.forEach((promise) => {
        MyPromise.resolve(promise).then((res) => {
          resolve(res);
        }, (err) => {
          count++;
          result[index] = {
            status: PROMISE_STATUS.REJECTED,
            value: err,
          }
          if (count === promises.length) {
            reject(result)
          }
        }).catch((error) => {
          reject(error);
        })
      })
    })
  }
};

function resolvePromise(promise2, val, resolve, reject) {
  // 如果返回自身，报错
  if (promise2 === val) {
    return reject(new Error('循环引用'))
  }

  if (typeof val === 'object' || typeof val === 'function') {
    if (val === null) {
      // 如果返回值是null，直接调用resolve，状态变为fulfilled
      return resolve(val)
    }
    try {
      if (typeof val.then === 'function') {
        // 如果返回值是一个Promise对象，调用then方法，状态变为该Promise的状态
        val.then(resolve, reject);
      } else {
        resolve(val)
      }
    } catch (error) {
      reject(error)
    }
  } else {
    // 其他情况，直接调用resolve，状态变为fulfilled
    resolve(val)
  }
}
