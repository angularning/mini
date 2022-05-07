import { ShapeFlags } from './vnode'
export function render(vnode, container) {
  mount(vnode, container)
}
function mount(vnode, container) {
  const { shapeFlag } = vnode
  if (shapeFlag & ShapeFlags.ELEMENT) {
    mountElement(vnode, container)
  } else if (shapeFlag & ShapeFlags.TEXT) {
    mountText(vnode, container)
  } else if (shapeFlag & ShapeFlags.FRAGMENT) {
    mountFragment(vnode, container)
  } else if (shapeFlag & ShapeFlags.COMPONENT) {
    mountComponent(vnode, container)
  } else {
  }
}

function mountElement(vnode, container) {
  const { type, props } = vnode
  const el = document.createElement(type)
  mountProps(el, props)
  mountChildren(el, vnode)
  container.appendChild(el)
}
function mountText(vnode, container) {
  const text = document.createTextNode(vnode)
  container.append(text)
}
function mountFragment(vnode, container) {
  mountChildren(vnode, container)
}
function mountComponent(vnode, container) {}
function mountProps(el, props) {
  const domPropsRE = /[A-Z]|^(value|checked|selected|muted|disabled)$/
  for (const key in props) {
    const value = props[key]
    switch (key) {
      case 'value':
        el.value = value
        break
      case 'class':
        el.className = value
        break
      case 'style':
        for (const styleValue in value) {
          el.style[styleValue] = value[styleValue]
        }
        break
      default:
        if (/^on[A-Z]/.test(key)) {
          el.addEventListener(key.slice(2).toLowerCase(), value)
        } else if (domPropsRE.test(key)) {
          el[key] = value === '' ? true : value
          if (value === '' || value === false) {
            el.removeAttribute(key)
          } else {
            el.setAttribute(key, value)
          }
        } else {
          el.setAttribute(key, value)
        }
    }
  }
}
function mountChildren(container, vnode) {
  const { shapeFlag, children } = vnode
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    mountText(children, container)
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    children.forEach((child) => {
      mount(child, container)
    })
  }
}
