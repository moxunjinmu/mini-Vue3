import { effectWatch } from "./reactivity/index.js";

export function createApp(rootComponent) {
  return {
    mount(container){
      // 获取到setup返回的响应式对象
      const context = rootComponent.setup()

      effectWatch(()=>{
        // 清除组件
        container.innerHTML = ''
        // 传入响应式数据
        const element = rootComponent.render(context)
        // 将组件添加到根容器上
        container.append(element)
      })
    }
  }
}