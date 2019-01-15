import axios from 'axios'
import store from '../store'
import {
  Message
} from 'element-ui'
// import CFG from '../common/Config'
// axios 配置
// axios.defaults.timeout = 5000
let axiosDate
// http request 拦截器
axios.interceptors.request.use(
  config => {
    // console.log('request interceptor :', config)
    config.withCredentials = true // 开启跨域能力 是否携带cookie
    /* console.log("store.state.app.token======", store.state.app.token)
    if (store.state.app.token) {
      config.headers.Authorization = `token ${store.state.app.token}`
    } */
    if ((config.data && config.data.loading === 'false') || (config.params && config.params.loading === 'false')) {} else {
      axiosDate = new Date()
      store.dispatch('FETCH_LOADING', true)
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log('response interceptor  success:', response)
    let oDate = new Date()
    let time = oDate.getTime() - axiosDate.getTime()
    if (time < 2000) time = 2000
    setTimeout(() => {
      store.dispatch('FETCH_LOADING', false)
    }, time)
    store.dispatch('FETCH_LOADING', false)
    // console.log('response interceptor :', response)
    return response
  },
  error => {
    store.dispatch('FETCH_LOADING', false)
    axiosDate = new Date()
    console.log("error:  ", error)
    var errorMsg = ''

    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          router.replace({
            path: '/login',
            /* query: {
              redirect: router.currentRoute.fullPath
            } */
          });

      }

      /* if (error.response.data && error.response.data.retCode && error.response.data.retInfo) {
        errorMsg = error.response.data && error.response.data.retCode && error.response.data.retInfo
        return Promise.reject(error.response.data)
      } else {
        errorMsg = (error.response.status + ' ' + error.response.statusText) || '系统异常,请稍后再试'
      } */
    } else {
      errorMsg = '服务超时,请稍后重试'
    }
    Message({
      type: 'error',
      message: errorMsg,
      showClose: true,
      center: true,
      customClass: 'common_tip'
    })

    let errorData = {
      'code': 0,
      'message': errorMsg
    }
    return Promise.reject(errorData)
  }
)

export default axios
