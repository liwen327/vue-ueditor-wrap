import http from '../HttpInterceptor'
import CFG from '../Config'
// import Data from '../../data'
// import API from '../../mock/login'


const loginService = {

  /**
   * 登录信息校验
   * @param login
   */
  requestLogin(formData) {
    return http
      .post(`${CFG.API_URL}user/login`, formData) //登录的接口
      .then(function (response) {

        // console.log("logonService succ:  ", response.data)
        return response.data
      })
  },
  getManaList(userId) {
    return http
      .post(`${CFG.API_URL}user/getManaList`, {userId}) //登录的接口
      .then(function (response) {
        return response.data
      })

  },
  getMenuList(userId) {
    return http
      .post(`${CFG.API_URL}user/getMenuList`, userId) //登录的接口
      .then(function (response) {
        return response.data
      })

  }
}
export default loginService
