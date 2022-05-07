import { hasChanged, isObject, isArray } from '../utils'
import { track, trigger } from './effect'

const proxyMap = new WeakMap()
export function reactive(target) {
  if (!isObject(target)) {
    return target
  }
  if (isReactive(target)) {
    return target
  }
  if (proxyMap.has(target)) {
    return proxyMap.get(target)
  }
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      if (key === '__v_isReactive') {
        return true
      }
      const res = Reflect.get(target, key, receiver)
      track(target, key)
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const oldValueLength = target.length
      const res = Reflect.set(target, key, value, receiver)
      if (hasChanged(oldValue, value)) {
        trigger(target, key)
        if (isArray(target) && hasChanged(oldValueLength, target.length)) {
          trigger(target, 'length')
        }
      }
      return res
    },
  })
  proxyMap.set(target, proxy)
  return proxy
}
export function isReactive(target) {
  return isObject(target) && target.__v_isReactive === true
}
