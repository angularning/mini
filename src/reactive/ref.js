import { track, trigger } from './effect'
import { hasChanged, isObject } from '../utils'

export function ref(target) {
  if (isRef(target)) {
    return target
  }
  return new RefImpl(target)
}
class RefImpl {
  constructor(value) {
    this._value = convert(value)
    this.__isRef = true
  }
  get value() {
    track(this, 'value')
    return this._value
  }
  set value(newVal) {
    if (hasChanged(newVal, this._value)) {
      this._value = convert(newVal)
      trigger(this, 'value')
    }
  }
}
export function isRef(value) {
  return !!(value && value.__isRef === true)
}
function convert(value) {
  return isObject(value) ? reactive(value) : value
}
