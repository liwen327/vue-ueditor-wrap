import http from '../HttpInterceptor'
import CFG from '../Config'

const optConService = {
  /**
   * 获取用户内容列表

   * @param pageNo
   * @param pageSise
   * @returns {boolean}
   */
  conList(searchData) {
    return http
      .post(`${CFG.API_URL}xsnArticle/xsnArticleList`, {
        articleTitle: searchData.articleTitle,
        subjectId: searchData.subjectId,
        startTime: searchData.dateIngerval.length > 0 ? searchData.dateIngerval[0] + ' 00:00:00' : '',
        endTime: searchData.dateIngerval.length > 0 ? searchData.dateIngerval[1] + ' 23:59:59' : '',
        status: searchData.status,
        flag: searchData.flag,
        articleType: searchData.articleType,
        id: searchData.id,
        sourceFrom: searchData.sourceFrom,
        siteId: searchData.siteId,
        schoolId: searchData.schoolId,
        optPerson: searchData.optPerson,
        pageSize: searchData.pageSize,
        page: searchData.page,
      })
      .then(function (response) {
        return response.data
      })
  },

  /**
   * 删除文章
   */
  deleteArticle(ids) {
    return http
      .post(`${CFG.API_URL}xsnArticle/delXsnArticleById`, {
        ids
      })
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 进入文章编辑文章详情时查询列表
   * @returns {number}   updateRole
   */
  getEditArtiList(id) {
    return http.post(`${CFG.API_URL}xsnArticle/detailXsnArticle`, {
      id
    }).then(function (response) {
      return response.data
    })
  },
  /**
   * 地方站点下拉列表
   * @returns {number}   updateRole
   */
  getSiteList() {
    return http.post(`${CFG.API_URL}xsnSite/xsnSiteSelList`).then(function (response) {
      return response.data
    })
  },
  /**
   * 内容分类下拉列表
   * @returns {number}   updateRole
   */
  getSchSubjectList(params) {
    return http.post(`${CFG.API_URL}xsnSubject/xsnSchSubjectList`, params).then(function (response) {
      return response.data
    })
  },
  getSubjectList(params) {
    return http.post(`${CFG.API_URL}xsnSubject/xsnSubjectList`, params).then(function (response) {
      return response.data
    })
  },
  /**
   * 新增
   * @returns {number}   updateRole
   */
  addEditArticle(addParams) {
    return http.post(`${CFG.API_URL}xsnArticle/addOrUpdXsnSiteArticle`, addParams).then(function (response) {
      return response.data
    })
  },
  /**
   * 编辑
   * @returns {number}   updateRole
   */
  updateRole(updateParams) {
    return http.post(`${CFG.API_URL}system/updateRole`, updateParams).then(function (response) {
      return response.data
    })
  },
  /**
   * 进入到角色详情时查询接口
   */
  getRoleInfo(roleId) {
    return http.post(`${CFG.API_URL}system/getRoleInfo`, roleId).then(function (response) {
      return response.data
    })
  },
  /**
   * 学校编辑、新增文章获取小记者下拉列表
   */
  getReporterList(schoolId, page) {
    return http.post(`${CFG.API_URL}xsnRepoter/xsnRepoterList`, {
      schoolId,
      page
    }).then(function (response) {
      return response.data
    })
  },
}
export default optConService
