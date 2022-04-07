// const { effect, reactive} = require('@vue/reactivity')
import {effectWatch, reactive} from "./core/reactivity/index.js"
import { h } from "./core/h.js"

// let a = reactive({
//   value: 1
// })
// let b
// effectWatch(() => {
//   // 函数
//   b = a.value + 1;
//   console.log("b", b);
// })

// a.value = 2;

const App = {
  render(context) {
    // 通过h函数返回一个虚拟DOM
    // return h('div', {id: 1, class: 'vnode'}, context.state.count)
    return h('div', {id: "id" + context.state.count, class: 'vnode'}, [h('p', null, String(context.state.count)), h('p', null, '第二')])
  },
  setup() {
    const state = reactive({
      count: 0
    })
    window.state = state
    return {state}
  }
}

export default App