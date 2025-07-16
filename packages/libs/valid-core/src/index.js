/**
 * 微内核实现
 */

import { pluginPool } from './plugins';

function ValidCore() {
  this.initCore();
}

ValidCore.prototype.initCore = function() {
  // 阶段：表单初始化、表单校验、表单提交
  this.steps = ['setpInfo', 'setpValid', 'stepPost'];

  // 插件
  this.plugins = this.steps.reduce((prev, cur) => {
    return {
      ...prev,
      [cur]: [],
    }
  }, {});

  this.context = {
    current: {}
  };
}

ValidCore.prototype.addPlugin = function(step, callback) {
  if (this.steps.includes(stpe)) {
    this.plugins[step].push(callback);
  } else {
    throw Error('无效的插件名称');
  }
}

ValidCore.prototype.usePlugin = function(step, pluginName, ...params) {
  if (this.steps.includes(step)) {
    if (pluginPool[pluginName]) {
      this.plugins[step].push((ctx) => pluginPool[pluginName](ctx, ...params))
    } else {
      throw Error('无效的插件名称');
    }
  } else {
    throw Error('无效的插件名称');
  }
}

// 执行所有的插件
ValidCore.prototype.run = function() {
  this.steps.reduce((pre, cur) => {
    return [...pre, this.plugins[cur]]
  }, []).reduce((proChain, proCur) => {
    return proChain.then((res) => {
      return proCur(res)
    })
  }, Promise.resolve(this.context))
}
