const { effect, reactive} = require('@vue/reactivity')

let a = reactive({
  value: 1
})

effect(() => {
  // 函数
  b = a.value + 1;
  console.log("b", b);
})

a.value = 2;