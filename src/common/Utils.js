let VueCookie = require('vue-cookie')

/**
 * 从Cookie 中获取当前用户信息
 * @returns {*}
 */
export const getUserFromCookie = () => {
  let userObj = null
  let token = VueCookie.get('MPToken')
  if (token) {
    userObj = {
      token: token,
      userName: ''
    }
  }
  return userObj
}

// 数据缓存对象
const cache = {}

/**
 * 获取url中的参数
 * 获取 url 中的参数并缓存
 * 再次获取相同参数不再求值直接返回
 */
export const getUrlData = name => {
  if (cache[name] !== undefined) return cache[name]
  const search = location.href.substring(location.href.indexOf('?') + 1)
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const ret = search.match(reg)
  cache[name] = ret !== null ? ret[2] : null
  return cache[name]
}

export const deBounce = function (fn, delay) {
  // 定时器，用来 setTimeout
  var timer

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    var context = this
    var args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
export const handleData = function (handle, val) {
  for (var i = 0; i < handle.length; i++) {
    if (val && val[handle[i].opensite] && val[handle[i].opensite].length) {
      val[handle[i].opensite] = val[handle[i].opensite].reverse()
      for (var k = 0; k < val[handle[i].opensite].length; k++) {
        val[handle[i].opensite][k].textColor = 'remove_text'
        handle.splice(i + 1, 0, val[handle[i].opensite][k])
        val[handle[i].opensite].splice(k, 1)
        k--
        if (!val[handle[i].opensite].length) {
          handle.splice(i, 1)
          // i--
          // continue
        }
        // continue
      }
    }
  }
  console.log('handle1111=====', handle)
  return handle
}
export default {
  getUserFromCookie: getUserFromCookie,
  getUrlData: getUrlData,
  deBounce: deBounce,
  handleData: handleData
}
