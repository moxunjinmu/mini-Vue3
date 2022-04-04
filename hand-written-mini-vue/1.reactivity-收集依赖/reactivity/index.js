// 响应式库

// 使用全局变量收集依赖
let currentEffect = null
//依赖
class Dep{
  // 1收集依赖
  constructor(){
    this.effects = new Set()
  }

  depend() {
    if(currentEffect){
      this.effects.add(currentEffect)
    }
  }

  // 2触发依赖
  notice() {

  }
}
function effectWatch(effect) {
  //收集依赖
  currentEffect = effect
  dep.append()
  currentEffect = null
}

const dep = new Dep()

effectWatch(() => {
  console.log('aaa');
})