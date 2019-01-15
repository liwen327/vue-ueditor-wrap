import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import login from '../pages/login/login'

import Home from '../pages/home'


// 运营后台内容管理
import optContent from '../pages/operation/conManage/conManage'
import optConList from '../pages/operation/conManage/conManageList'
import optArtiDetail from '../pages/operation/conManage/optArtiDetail'
import optMiniArtiDetail from '../pages/operation/conManage/optMiniArtiDetail'



Vue.use(VueRouter)
VueRouter.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

const router = new VueRouter({
  // mode: 'history',
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login,
      // props: (route) => ({ groupId: route.query.groupId, resourceId: route.query.resourceId }),
      meta: {
        title: '新少年内容管理系统v1.0'
      }
    },
    {
      path: '/home',
      component: Home,
      name: '欢迎您！',
      iconCls: 'el-icon-message', //图标样式class
      meta: {
        loginRequired: true,
        title: '欢迎页'
      },
      children: [
        
        // 运营后台 内容管理  
        {
          path: '/operation/content',
          component: optContent,
          props: (route) => ({
            conId: route.query.conId
          }),
          children: [{
              path: 'list',
              component: optConList,
              meta: {
                loginRequired: true,
                title: '运营后台内容管理列表'
              }
            },
            {
              path: 'detail',
              component: optArtiDetail,
              meta: {
                loginRequired: true,
                title: '运营后台增加编辑文章'
              }
            },
            {
              path: 'minidetail',
              component: optMiniArtiDetail,
              meta: {
                loginRequired: true,
                title: '运营后台增加编辑微文章'
              }
            }
          ]
        },
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

// 用户登录初始化
let userInfo = JSON.parse(localStorage.getItem("userName"))
if (userInfo) {
  store.commit('userLogin', userInfo)
}

// 路由守卫配置
router.beforeEach((to, from, next) => {
  // 百度pv统计代码
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 检查路由元信息,是否必须登录
  if (to.matched.some(record => record.meta.loginRequired)) {
    // 获取当前用户登录状态
    console.info("store.state.app.user=====", store.state.app.user)
    // 用户登录初始化
    let userInfo = JSON.parse(localStorage.getItem("userName"))
    // console.log("userInfo======", userInfo)
    if (userInfo) {
      store.commit('userLogin', userInfo)
    }
    // let loggedIn = store.state.app.user
    let loggedIn = userInfo
    // let loggedIn = localStorage.getItem("userName")
    if (!loggedIn) {
      next({
        path: '/login'
      })
      next(false)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
