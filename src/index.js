// import { ref } from './reactive/ref'
// import { effect } from './reactive/effect'
// import { computed } from './reactive/computed'

/**
 * reactive demo start
 */
/*
import { reactive } from './reactive/reactive'
import { effect } from './reactive/effect'

const observed = (window.observed = reactive({
  count1: 1,
  count2: 2,
}))
const observed = (window.observed = reactive([1, 2, 3]))
// effect(() => {
//   console.log('observed.count', observed.count)
// })
effect(() => {
  console.log('observed.length', observed.length)
})
effect(() => {
  console.log('observed index 4', observed[4])
})*/
/*effect(() => {
  effect(() => {
    console.log('observed.count2', observed.count2)
  })
  console.log('observed.count1', observed.count1)
})*/

/**
 * ref demo start
 */
/*const count = (window.count = ref(1))
effect(() => {
  console.log('count...', count.value)
})*/

/**
 * computed demo start
 * */
/*const c = (window.c = computed(() => {
  console.log('computed...')
  return count.value * 2
}))*/

/*
const c = (window.c = computed({
  get() {
    console.log('computed get...')
    return count.value * 2
  },
  set(newValue) {
    count.value = newValue
  },
}))
*/
function showAlert() {
  alert('hello')
}
function showInput(e) {
  console.log(e.target.value)
}

import { render, h } from './runtime'

const vnode = h('div', { class: 'red', ref: 'div', 'data-num': '1', id: 'div', style: { color: 'red' } }, [
  h('h1', {}, 'hello world'),
  h('input', { type: 'checkbox', checked: false }, 'hello world'),
  h('input', { value: 'hello', ref: 'input', onInput: showInput }),
  h('button', { onClick: showAlert }, 'click me'),
])
render(vnode, document.body)
