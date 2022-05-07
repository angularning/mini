import { ref } from './reactive/ref'
import { effect } from './reactive/effect'
import { computed } from './reactive/computed'

/**
 * reactive demo start
 */
import { reactive } from './reactive/reactive'

const observed = (window.observed = reactive({
  count1: 1,
  count2: 2,
}))
// const observed = (window.observed = reactive([1, 2, 3]))
// effect(() => {
//   console.log('observed.count', observed.count)
// })
effect(() => {
  console.log('observed.length', observed.length)
})
effect(() => {
  console.log('observed index 4', observed[4])
})
effect(() => {
  effect(() => {
    console.log('observed.count2', observed.count2)
  })
  console.log('observed.count1', observed.count1)
})

/**
 * ref demo start
 */
const count = (window.count = ref(1))
effect(() => {
  console.log('count...', count.value)
})

/**
 * computed demo start
 * */
/*const c = (window.c = computed(() => {
  console.log('computed...')
  return count.value * 2
}))*/

const c = (window.c = computed({
  get() {
    console.log('computed get...')
    return count.value * 2
  },
  set(newValue) {
    count.value = newValue
  },
}))
