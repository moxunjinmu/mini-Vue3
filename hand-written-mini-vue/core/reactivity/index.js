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

// 通过map建立每个对象key对应的dep
function getDep(target, key) {
  // 获取对象对应的map
  let depsMap = targetMap.get(target)

  // 第一次取可能为undefined，先初始化
  if(!depsMap){
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  
  // 获取key值对应的dep()
  let dep = depsMap.get(key)
  // 如果没有获取到说明是第一次，将key对应的dep实力存入map
  if(!dep) {
    dep = new Dep();
    depsMap.set(key, dep)
  }

  return dep
}
const targetMap = new Map()

function reactive (raw){
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key)
      // 依赖收集
      dep.depend()
      
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      const dep = getDep(target, key)
      const result = Reflect.set(target, key, value)
      dep.notice()
      return result
    }

  })
}

const user = reactive({
  age: 18
})

let NominalAge
effectWatch(() => {
  NominalAge = user.age + 1;
  console.log("NominalAge", NominalAge);
})

user.age = 19;