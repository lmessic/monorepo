/**
 * plugin的标准是由core的开发者定的
 * 所有的plugin，必须是promise的形式
 * @param {*} ctx 全局上下文
 * @param {*} match 可选参数，特定插件时进行传入
 * @returns 
 */

const phoneValidPlugin = (ctx, match) => {
  return new Promise((resolve) => {
    console.log('表单校验中');
    resolve(ctx);
  })
}

const postValidPlugin = (ctx, url) => {
  return new Promise((resolve) => {
    console.log('表单提交校验中', url);
    // 模拟提交
    setTimeout(() => {
      console.log('表单提交校验完成');
      resolve(ctx);
    }, 1000)
  })
}

export const pluginPool = {
  phoneValidPlugin,
  postValidPlugin
}