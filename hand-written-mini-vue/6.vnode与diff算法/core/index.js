import { effectWatch } from "./reactivity/index.js";
import {mountElement} from "./renderer/index.js"
export function createApp(rootComponent) {
  return {
    mount(container){
      // 获取到setup返回的响应式对象
      const context = rootComponent.setup()

      effectWatch(()=>{
        // 清除组件
        container.innerHTML = ''
        // 传入响应式数据, 拿到返回值虚拟dom
        const element = rootComponent.render(context)
        
        // 通过mountElement函数渲染虚拟节点为真实DOM,并挂载到容器上
        mountElement(element, container)
        // 将组件添加到根容器上
      })
    }
  }
}