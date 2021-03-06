// const { effect, reactive} = require('@vue/reactivity')
import {effectWatch, reactive} from "./core/reactivity/index.js"


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

    const div = document.createElement('div')
    div.innerText = context.state.count
    return div
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