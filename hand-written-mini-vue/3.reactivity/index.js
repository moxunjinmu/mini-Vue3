// const { effect, reactive} = require('@vue/reactivity')
import {effectWatch, reactive} from "./core/reactivity/index.js"


let a = reactive({
  value: 1
})
let b
effectWatch(() => {
  // 函数
  b = a.value + 1;
  console.log("b", b);
})

a.value = 2;