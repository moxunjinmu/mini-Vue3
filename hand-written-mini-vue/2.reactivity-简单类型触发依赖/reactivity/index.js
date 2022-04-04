// 响应式库

// 使用全局变量收集依赖
let currentEffect = null
//依赖
class Dep{
  // 1收集依赖
  constructor(val){
    this.effects = new Set()
    this._val = val
  }

  get value() {
    this.depend()
    return this._val
  }

  // 监听值改变的时候触发依赖
  set value(newval) {
    this._val = newval
    this.notice()
  }

  depend() {
    if(currentEffect){
      this.effects.add(currentEffect)
    }
  }

  // 2触发依赖
  notice() {
    // 触发一下之前收集到的依赖
    this.effects.forEach(effect => effect())
  }
}
function effectWatch(effect) {
  //收集依赖
  currentEffect = effect
  effect() //开始就调用一次
  currentEffect = null
}

const dep = new Dep(1)
let b
effectWatch(() => {
  b = dep.value + 10
  console.log("b", b);
})

//值发生变化 -》再次调用effect
dep.value = 2