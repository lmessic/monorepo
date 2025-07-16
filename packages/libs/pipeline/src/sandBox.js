var foo = 'foo1';

const ctx = {
  func: (val) => {
    console.log(val)
  },
  foo: 'f1'
}

function veryPoorSandbox(code, ctx) {
  // with改变了作用域，使得ctx中的属性可以在code中访问
  // 使用with之前，需要使用eval来计算code中的表达式，使用with之后，可以直接访问ctx中的属性
  // 使用with之后，ctx中的属性会被提升到当前作用域，使得在code中可以直接访问
  // 使用with之后，在code中无法访问window对象，因为window对象被隐藏了
  // 使用with之后，在code中无法访问全局变量，因为全局变量被隐藏了
  with(ctx) {
    eval(code)
  }
}

const code = `func(foo)`;

veryPoorSandbox(code, ctx);