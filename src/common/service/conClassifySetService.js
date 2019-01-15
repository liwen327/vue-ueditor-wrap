import http from '../HttpInterceptor'
import CFG from '../Config'

const conClassifySetService = {
  /**
   * 获取用户内容列表

   * @param pageNo
   * @param pageSise
   * @returns {boolean}
   */
  conList(searchData) {
    return http
      .post(`${CFG.API_URL}xsnSubject/xsnSubjectList`, searchData)
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 启用停用系统内容分类
   */
  startStopConClassify(id, isBlock) {
    return http.post(`${CFG.API_URL}xsnSubject/startOrStopXSubjectById`, {
      id,
      isBlock
    }).then(function (response) {
      return response.data
    })
  },

  /**
   * 增加内容分类
   */
  addConClassify(detailParams) {
    return http.post(`${CFG.API_URL}xsnSubject/addXsnSubject`, detailParams).then(function (response) {
      return response.data
    })
  },
  /**
   * 内容分类详情
   */
  getClassifyDetail(id) {
    return http.post(`${CFG.API_URL}xsnSubject/detailXsnSubject`, {
      id
    }).then(function (response) {
      return response.data
    })
  },
  /**
   * 编辑内容分类
   */
  editConClassify(detailParams) {
    return http.post(`${CFG.API_URL}xsnSubject/modifyXsnSubject`, detailParams).then(function (response) {
      return response.data
    })
  }
}
export default conClassifySetService
