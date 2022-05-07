let activeEffectStacks
const effectStack = []
export function effect(fn, options = {}) {
  const run = () => {
    try {
      activeEffectStacks = run
      effectStack.push(activeEffectStacks)
      return fn()
    } finally {
      effectStack.pop()
      activeEffectStacks = effectStack.at(-1)
    }
  }
  if (!options.lazy) {
    run()
  }
  run.scheduler = options.scheduler
  return run
}
const targetMaps = new WeakMap()
export function track(target, key) {
  if (!activeEffectStacks) {
    return
  }
  // 获取当前活动的effect
  let depsMap = targetMaps.get(target)
  if (!depsMap) {
    // 如果没有，则创建一个
    targetMaps.set(target, (depsMap = new Map()))
  }
  // 获取当前effect的依赖
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffectStacks)
  console.log('targetMaps', targetMaps)
}
export function trigger(target, key) {
  const depsMap = targetMaps.get(target)
  if (!depsMap) {
    return
  }
  const deps = depsMap.get(key)
  if (!deps) {
    return
  }
  deps.forEach((effect) => {
    if (effect.scheduler) {
      effect.scheduler(effect)
    } else {
      effect()
    }
  })
}
