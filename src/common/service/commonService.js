import http from '../HttpInterceptor'
import CFG from '../Config'

const commonService = {
  /**
   * 获取token 

   * @param pageNo
   * @param pageSise
   * @returns {boolean}
   */
  getToken() {
    return http
      .post(`${CFG.API_URL}xsnToken`)
      .then(function (response) {
        return response.data
      })
  }
}
export default commonService
