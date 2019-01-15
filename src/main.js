// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './common/css/reset.less'
import './common/css/style/base.less'
import './common/css/common.css'
import CFG from './common/Config'
import store from './store/index'
import http from './common/HttpInterceptor'
import './theme/index.css'
import * as filters from './common/filter'
// process.env.MOCK && require('mockjs')

// 全局Filter注册
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

let VueCookie = require('vue-cookie')
Vue.use(VueCookie)

Vue.config.productionTip = false
// 新增element-ui
Vue.use(ElementUI)

/* eslint-disable no-new */
Vue.prototype.CFG = CFG
Vue.prototype.http = http
Vue.prototype.filter = filters
new Vue({
  el: '#app',
  store,
  router,
  http,
  components: {
    App
  },
  template: '<App/>',
  created: function () {
    // console.log('APP CREATED CFG', CFG)
    console.log('mainjs menuList', store.state.app)
  }
})
