export function isObject(target) {
  return typeof target === 'object' && target !== null
}
export function isArray(target) {
  return Array.isArray(target)
}
export function isString(target) {
  return typeof target === 'string'
}
export function isNumber(target) {
  return typeof target === 'number'
}
export function isBoolean(target) {
  return typeof target === 'boolean'
}
export function isFunction(target) {
  return typeof target === 'function'
}
export function hasChanged(value, oldValue) {
  return value !== oldValue && !(Number.isNaN(value) && Number.isNaN(oldValue))
}
