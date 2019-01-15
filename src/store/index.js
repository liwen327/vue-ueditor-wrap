import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
// polyfill for alipay browser on android
var Promise = require('es6-promise-polyfill').Promise
if (!window.Promise) {
  window.Promise = Promise
}
Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    // 请求数据时加载状态loading
    fetchLoading: false,
    user: null,
    token: null,
    isMultiUser: false,
    menuList: [],
    manaList: [],
    manaName: ''
  },
  modules: {
    app
  }
})

export default Store
