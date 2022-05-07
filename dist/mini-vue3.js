/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _reactive_ref__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reactive/ref */ \"./src/reactive/ref.js\");\n/* harmony import */ var _reactive_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reactive/effect */ \"./src/reactive/effect.js\");\n/* harmony import */ var _reactive_computed__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reactive/computed */ \"./src/reactive/computed.js\");\n\n\n\n\n/**\n * reactive demo start\n */\n/*\nimport { reactive } from './reactive/reactive'\nimport { effect } from './reactive/effect'\n\nconst observed = (window.observed = reactive({\n  count1: 1,\n  count2: 2,\n}))\nconst observed = (window.observed = reactive([1, 2, 3]))\n// effect(() => {\n//   console.log('observed.count', observed.count)\n// })\neffect(() => {\n  console.log('observed.length', observed.length)\n})\neffect(() => {\n  console.log('observed index 4', observed[4])\n})*/\n/*effect(() => {\n  effect(() => {\n    console.log('observed.count2', observed.count2)\n  })\n  console.log('observed.count1', observed.count1)\n})*/\n\n/**\n * ref demo start\n */\nconst count = (window.count = (0,_reactive_ref__WEBPACK_IMPORTED_MODULE_0__.ref)(1))\n;(0,_reactive_effect__WEBPACK_IMPORTED_MODULE_1__.effect)(() => {\n  console.log('count...', count.value)\n})\n\n/**\n * computed demo start\n * */\n/*const c = (window.c = computed(() => {\n  console.log('computed...')\n  return count.value * 2\n}))*/\n\nconst c = (window.c = (0,_reactive_computed__WEBPACK_IMPORTED_MODULE_2__.computed)({\n  get() {\n    console.log('computed get...')\n    return count.value * 2\n  },\n  set(newValue) {\n    count.value = newValue\n  },\n}))\n\n\n//# sourceURL=webpack://mi-vue3/./src/index.js?");

/***/ }),

/***/ "./src/reactive/computed.js":
/*!**********************************!*\
  !*** ./src/reactive/computed.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"computed\": () => (/* binding */ computed)\n/* harmony export */ });\n/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./effect */ \"./src/reactive/effect.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.js\");\n\n\n\nfunction computed(getterOrOptions) {\n  let getter, setter\n  if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.isFunction)(getterOrOptions)) {\n    getter = getterOrOptions\n    setter = () => {\n      console.warn('Computed value is read-only.')\n    }\n  } else {\n    getter = getterOrOptions.get\n    setter = getterOrOptions.set\n  }\n  return new ComputedImpl(getter, setter)\n}\n\nclass ComputedImpl {\n  constructor(getter, setter) {\n    this._value = undefined\n    this._setter = setter\n    this.dirty = true\n    this.effect = (0,_effect__WEBPACK_IMPORTED_MODULE_0__.effect)(getter, {\n      lazy: true,\n      scheduler: () => {\n        if (!this.dirty) {\n          this.dirty = true\n          ;(0,_effect__WEBPACK_IMPORTED_MODULE_0__.trigger)(this, 'value')\n        }\n      },\n    })\n  }\n  get value() {\n    if (this.dirty) {\n      this._value = this.effect()\n      this.dirty = false\n      ;(0,_effect__WEBPACK_IMPORTED_MODULE_0__.track)(this, 'value')\n    }\n    return this._value\n  }\n  set value(value) {\n    this._setter(value)\n  }\n}\n\n\n//# sourceURL=webpack://mi-vue3/./src/reactive/computed.js?");

/***/ }),

/***/ "./src/reactive/effect.js":
/*!********************************!*\
  !*** ./src/reactive/effect.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"effect\": () => (/* binding */ effect),\n/* harmony export */   \"track\": () => (/* binding */ track),\n/* harmony export */   \"trigger\": () => (/* binding */ trigger)\n/* harmony export */ });\nlet activeEffectStacks\nconst effectStack = []\nfunction effect(fn, options = {}) {\n  const effectFn = () => {\n    try {\n      activeEffectStacks = effectFn\n      effectStack.push(activeEffectStacks)\n      return fn()\n    } finally {\n      effectStack.pop()\n      activeEffectStacks = effectStack.at(-1)\n    }\n  }\n  if (!options.lazy) {\n    effectFn()\n  }\n  effectFn.scheduler = options.scheduler\n  return effectFn\n}\nconst targetMaps = new WeakMap()\nfunction track(target, key) {\n  if (!activeEffectStacks) {\n    return\n  }\n  let depsMap = targetMaps.get(target)\n  if (!depsMap) {\n    targetMaps.set(target, (depsMap = new Map()))\n  }\n  let deps = depsMap.get(key)\n  if (!deps) {\n    depsMap.set(key, (deps = new Set()))\n  }\n  deps.add(activeEffectStacks)\n}\nfunction trigger(target, key) {\n  const depsMap = targetMaps.get(target)\n  if (!depsMap) {\n    return\n  }\n  const deps = depsMap.get(key)\n  if (!deps) {\n    return\n  }\n  deps.forEach((effect) => {\n    if (effect.scheduler) {\n      effect.scheduler(effect)\n    } else {\n      effect()\n    }\n  })\n}\n\n\n//# sourceURL=webpack://mi-vue3/./src/reactive/effect.js?");

/***/ }),

/***/ "./src/reactive/ref.js":
/*!*****************************!*\
  !*** ./src/reactive/ref.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isRef\": () => (/* binding */ isRef),\n/* harmony export */   \"ref\": () => (/* binding */ ref)\n/* harmony export */ });\n/* harmony import */ var _effect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./effect */ \"./src/reactive/effect.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./src/utils/index.js\");\n\n\n\nfunction ref(target) {\n  if (isRef(target)) {\n    return target\n  }\n  return new RefImpl(target)\n}\nclass RefImpl {\n  constructor(value) {\n    this._value = convert(value)\n    this.__isRef = true\n  }\n  get value() {\n    (0,_effect__WEBPACK_IMPORTED_MODULE_0__.track)(this, 'value')\n    return this._value\n  }\n  set value(newVal) {\n    if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.hasChanged)(newVal, this._value)) {\n      this._value = convert(newVal)\n      ;(0,_effect__WEBPACK_IMPORTED_MODULE_0__.trigger)(this, 'value')\n    }\n  }\n}\nfunction isRef(value) {\n  return !!(value && value.__isRef === true)\n}\nfunction convert(value) {\n  return (0,_utils__WEBPACK_IMPORTED_MODULE_1__.isObject)(value) ? reactive(value) : value\n}\n\n\n//# sourceURL=webpack://mi-vue3/./src/reactive/ref.js?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"hasChanged\": () => (/* binding */ hasChanged),\n/* harmony export */   \"isArray\": () => (/* binding */ isArray),\n/* harmony export */   \"isFunction\": () => (/* binding */ isFunction),\n/* harmony export */   \"isObject\": () => (/* binding */ isObject)\n/* harmony export */ });\nfunction isObject(target) {\n  return typeof target === 'object' && target !== null\n}\nfunction isArray(target) {\n  return Array.isArray(target)\n}\nfunction isFunction(target) {\n  return typeof target === 'function'\n}\nfunction hasChanged(value, oldValue) {\n  return value !== oldValue && !(Number.isNaN(value) && Number.isNaN(oldValue))\n}\n\n\n//# sourceURL=webpack://mi-vue3/./src/utils/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;