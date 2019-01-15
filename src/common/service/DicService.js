import http from '../HttpInterceptor'
import CFG from '../Config'

const DicService = {
  /**
   * 根据字典表类型查询字典
   * @param typeArr  Array 或 String 格式
   * @returns {Promise<AxiosResponse<any> | never>}
   */
  findByType(typeArr) {
    let configData = Array.isArray(typeArr) ? typeArr.join(',') : typeArr
    return http
      .get(`${CFG.API_URL}resourceManage/config?configData=${configData}`)
      .then(function (response) {
        if (Array.isArray(typeArr)) {
          return response.data.data
        } else {
          return response.data.data[typeArr]
        }
      })
  },
  /**
   * 查
   * @returns {*|Promise<AxiosResponse<any>|never>}
   */
  findArticleType() {
    return this.findByType('articleType')
  }

}
export default DicService
