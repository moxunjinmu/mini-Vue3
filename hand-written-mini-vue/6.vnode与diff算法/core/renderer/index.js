// n1: 旧虚拟DOM
// n2: 新虚拟DOM
export function diff(n1, n2) {
  // 1.判断tag是否为同一个dom
  console.log("n1", n1);
  console.log("n2", n2);
  if (n1.tag !== n2.tag) {
    n1.el.replaceWith(document.createElement(n2.tag))
  }

  // 2.更新props
  // new: {id: 'foo', class: 'bar', a}
  // old: {id: 'foo', class: 'bar', a, b}
  else {
    n2.el = n1.el
    const { props: newProps } = n2;
    const { props: oldProps } = n1;
    // a 新旧props都存在,比较新旧key对应的值有没有发生改变
    if (newProps && oldProps) {
      console.log("object.keys", Object.keys(newProps));
      Object.keys(newProps).forEach((key) => {
        const newVal = newProps[key]
        const oldVal = oldProps[key]
        if (newVal !== oldVal) {
          n1.el.setAttribute(key, newVal)
        }
      })
    }
    // b新props比老props少
    if (oldProps) {
      Object.keys(newProps).forEach((key) => {
        if (!newProps[key]) {
          n1.el.removeAttribute(key)
        }
      })
    }
    // 3.更新children 暴力算法
    // 新children -> String    老children -> string
    // 新children -> Array     老children -> array
    const { children: newChildren } = n2
    const { children: oldChildren } = n1
    // 新children为string类型
    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        if (newChildren !== oldChildren) {
          //! 这里不会替换
          n2.el.textContent = newChildren
        }
      } else if (Array.isArray(oldChildren)) {
        n2.el.textContent = newChildren
      }

    }
    // 新children为Array类型
    else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === 'string') {
        n2.el.innerText = ''
        mountElement(n2, n2.el)
      } else if (Array.isArray(oldChildren)) {

        //! 这里写错了
        //XXXX diff(oldChildren, newChildren)XXXX
        // 获取公共的length
        const length = Math.min(newChildren.length, oldChildren.length)
        for (let i = 0; i < length; i++) {
          const newVnode = newChildren[i];
          const oldVnode = oldChildren[i];
          // 处理公共的vnode
          diff(oldVnode, newVnode)
          
        }

        if(newChildren.length > length){
          // 创建节点
          for (let i = length; i < newChildren.length; i++) {
            //? 不会了
            const newVnode = newChildren[i];
            mountElement(newVnode, n2.el)
          }
        } else if(oldChildren.length < length) {
          for (let i = length; i < oldChildren.length; i++) {
            const oldVnode = oldChildren[i];
            // 删除节点
            oldVnode.el.parent.removeChild(oldVnode.el);
          }
        }
      }
    }
  }
}

export function mountElement(vnode, container) {
  // 获取虚拟dom的数据
  let { tag, props, children } = vnode

  // 创建真实dom
  let el = document.createElement(tag)
  vnode.el = el
  // 将props内容添加到dom属性上
  if (props) {
    for (const key in props) {
      let value = props[key]
      el.setAttribute(key, value)
    }
  }

  if (typeof children === 'string') {
    const textVnode = document.createTextNode(children)
    el.append(textVnode)
  } else if (Array.isArray(children)) {
    // 如果children是dom数组则递归调用创建dom
    children.forEach(v => mountElement(v, el))
  }
  // 将dom添加到父节点上
  container.append(el)
}