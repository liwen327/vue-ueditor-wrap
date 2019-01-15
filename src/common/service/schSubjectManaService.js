import http from '../HttpInterceptor'
import CFG from '../Config'

const schSubjectManaService = {
  /**
   * 获取用户内容列表

   * @param pageNo
   * @param pageSise
   * @returns {boolean}
   */
  conList(searchData) {
    return http
      .post(`${CFG.API_URL}xsnSubject/xsnSchSubjectList`, searchData)
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 启用学校栏目(系统内容分类)
   */
  startSubject(id, schoolId) {
    return http.post(`${CFG.API_URL}xsnSubject/startSchSubjectById`, {
      id,
      schoolId
    }).then(function (response) {
      return response.data
    })
  },
  /**
   * 停用学校栏目(系统内容分类)
   */
  stopSubject(id, schoolId) {
    return http.post(`${CFG.API_URL}xsnSubject/stopSchSubjectById`, {
      id,
      schoolId
    }).then(function (response) {
      return response.data
    })
  },

  /**
   * 增加学校栏目（内容分类）
   */
  addSchSubject(detailParams) {
    return http.post(`${CFG.API_URL}xsnSubject/addSchXsnSubject`, detailParams).then(function (response) {
      return response.data
    })
  },
  /**
   * 编辑栏目查询详情
   */
  getSubjectDetail(id) {
    return http.post(`${CFG.API_URL}xsnSubject/detailXsnSubject`, {
      id
    }).then(function (response) {
      return response.data
    })
  },
  /**
   * 编辑学校栏目
   */
  editSchSubject(detailParams) {
    return http.post(`${CFG.API_URL}xsnSubject/modifyXsnSubject`, detailParams).then(function (response) {
      return response.data
    })
  }
}
export default schSubjectManaService
