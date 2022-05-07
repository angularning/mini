import { effect, track, trigger } from './effect'
import { isFunction } from '../utils'

export function computed(getterOrOptions) {
  let getter, setter
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions
    setter = () => {
      console.warn('Computed value is read-only.')
    }
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }
  return new ComputedImpl(getter, setter)
}

class ComputedImpl {
  constructor(getter, setter) {
    this._value = undefined
    this._setter = setter
    this.dirty = true
    this.effect = effect(getter, {
      lazy: true,
      scheduler: () => {
        if (!this.dirty) {
          this.dirty = true
          trigger(this, 'value')
        }
      },
    })
  }
  get value() {
    if (this.dirty) {
      this._value = this.effect()
      this.dirty = false
      track(this, 'value')
    }
    return this._value
  }
  set value(value) {
    this._setter(value)
  }
}
