import http from '../HttpInterceptor'
import CFG from '../Config'

const UserService = {
  getUserInfo() {
    return http
      .post(`${CFG.API_URL}/user/queryUserByCondition`) // 这个是哪个接口？获取用户信息的接口
      .then(function (response) {
        console.log('UserService:', response)
        return response.data
      })
  },
  modifyPwd(modifyData) {
    return http
      .post(`${CFG.API_URL}user/modifyUserPwd`, {
        id: modifyData.id,
        userPassword: modifyData.userPassword,
        userNewPwd: modifyData.userNewPwd,
        confirmPwd: modifyData.confirmPwd,
        token: modifyData.token
      })
      .then(function (response) {
        console.log("modifyPwd:=====", response)
        return response.data
      })
  }
}
export default UserService
