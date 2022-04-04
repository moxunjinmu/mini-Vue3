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

// 监听对象 ->将对象的key建立一个对应的map
// 1.监听对象什么时候改变了

// vue2 -> Object.defineProperties
  // 属性需要一个个执行
// vue3 -> Proxy
  //一次代理所有属性
const targetMap = new Map()

function reactive (raw){
  return new Proxy(raw, {
    get(target, key) {
      console.log("key", key);
      // dep存储
      let depsMap = targetMap.get(target)

      // 第一次取可能为undefined，先初始化
      if(!depsMap){
        depsMap = new Map()
        targetMap.set(target, depsMap)
      }
      console.log("depsmap", depsMap);
      let dep = depsMap.get(target, key)
      if(!dep) {
        dep = new Dep();
        depsMap.set(key, dep)
      }

      // 依赖收集
      dep.depend()
      
      return Reflect.get(target, key)
    },
    set(target, key) {

    }

  })
}

const user = reactive({
  age: 18
})

effectWatch(() => {
  user.age
})

user.age