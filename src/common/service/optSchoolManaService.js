import http from '../HttpInterceptor'
import CFG from '../Config'

const optSchoolService = {
  /**
   * 获取用户内容列表

   * @param pageNo
   * @param pageSise
   * @returns {boolean}
   */
  conList(searchData) {
    return http
      .post(`${CFG.API_URL}xsnSchool/xsnSchoolList`, {
        schoolProvince: searchData.schoolProvince,
        schoolCity: searchData.schoolCity,
        schoolArea: searchData.schoolArea,
        schoolName: searchData.schoolName,
        startTime: searchData.dateIngerval.length > 0 ? searchData.dateIngerval[0] + ' 00:00:00' : '',
        endTime: searchData.dateIngerval.length > 0 ? searchData.dateIngerval[1] + ' 23:59:59' : '',
        status: searchData.status,
        pageSize: searchData.pageSize,
        page: searchData.page
      })
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 审核学校
   */
  checkSchool(id, status) {
    return http
      .post(`${CFG.API_URL}xsnSchool/checkXsnSchool`, {
        id,
        status
      })
      .then(function (response) {
        return response.data
      })
  },

  /**
   * 删除学校
   */
  deleteSchool(id) {
    return http
      .post(`${CFG.API_URL}xsnSchool/delXsnSchoolById`, {
        id
      })
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 进入文章编辑文章详情时查询列表
   * @returns {number}   updateRole
   */
  getEditSchoolList(id) {
    return http
      .post(`${CFG.API_URL}xsnSchool/detailXsnSchool`, {
        id
      })
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 新增编辑
   * @returns {number}   updateRole
   */
  addEditSchool(addEditParams) {
    return http.post(`${CFG.API_URL}xsnSchool/addOrUpdXsnSchool`, addEditParams).then(function (response) {
      return response.data
    })
  },
  /**
   * 新增时获取站点的下拉列表
   * @returns {number}   updateRole
   */
  getSiteList() {
    return http.post(`${CFG.API_URL}xsnSite/xsnSiteSelList`).then(function (response) {
      return response.data
    })
  },
  /**
   * 学校后台编辑时保存接口
   * @returns {number}   updateRole
   */
  editSchool(editParams) {
    return http.post(`${CFG.API_URL}xsnSchool/addOrUpdXsnSchoolItdc`, editParams).then(function (response) {
      return response.data
    })
  }
}
export default optSchoolService
