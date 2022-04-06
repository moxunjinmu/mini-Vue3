export function mountElement(vnode, container) {
  // 获取虚拟dom的数据
  let {tag, props, children} = vnode

  // 创建真实dom
  let el = document.createElement(tag)

  // 将props内容添加到dom属性上
  if(props){
    for (const key in props) {
      let value = props[key]
      el.setAttribute(key, value)
    }
  }

  if( typeof children === 'string' || typeof children === 'number'){
    const textVnode = document.createTextNode(children)
    el.append(textVnode)
  }else if (Array.isArray(children)){
    // 如果children是dom数组则递归调用创建dom
    children.forEach(v => mountElement(v, el))
  }
  // 将dom添加到父节点上
  container.append(el)
}