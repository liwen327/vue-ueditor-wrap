import http from '../HttpInterceptor'
import CFG from '../Config'

const schReorterService = {
  /**
   * 获取用户内容列表

   * @param pageNo
   * @param pageSise
   * @returns {boolean}
   */
  conList(searchData) {
    return http.post(`${CFG.API_URL}xsnRepoter/xsnRepoterList`, {
      schoolId: searchData.schoolId,
      repoterName: searchData.repoterName,
      repoterType: searchData.repoterType,
      startTime: searchData.dateIngerval.length > 0 ? searchData.dateIngerval[0] + ' 00:00:00' : '',
      endTime: searchData.dateIngerval.length > 0 ? searchData.dateIngerval[1] + ' 23:59:59' : '',
      pageSize: searchData.pageSize,
      page: searchData.page,
    }).then(function (response) {
      return response.data
    })
  },
  /**
   * 启用停用小记者
   */
  startStopReporter(id, flag) {
    return http
      .post(`${CFG.API_URL}xsnRepoter/stopOrStartXsnRepoterById`, {
        id,
        flag
      })
      .then(function (response) {
        return response.data
      })
  },

  /**
   * 增加编辑小记者
   */
  addModifySchReporter(detailParams) {
    return http.post(`${CFG.API_URL}xsnRepoter/addOrUpdXsnRepoter`, detailParams).then(function (response) {
      return response.data
    })
  },
  /**
   * 编辑小记者查询详情
   */
  getReporterDetail(id) {
    return http
      .post(`${CFG.API_URL}xsnRepoter/detailXsnRepoter`, {
        id
      })
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 编辑学校栏目
   */
  /* editSchReporter(detailParams) {
    return http.post(`${CFG.API_URL}xsnSubject/modifyXsnSubject`, detailParams).then(function (response) {
      return response.data
    })
  } */
}
export default schReorterService
