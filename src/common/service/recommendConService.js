import http from '../HttpInterceptor'
import CFG from '../Config'

const recommendConService = {
  /**
   * 获取用户内容列表

   * @param pageNo
   * @param pageSise
   * @returns {boolean}
   */
  conList(searchData) {
    return http
      .post(`${CFG.API_URL}xsnRecommend/xsnRecommendList`, {
        reTitle: searchData.reTitle,
        reSiteId: searchData.reSiteId,
        rePositionId: searchData.rePositionId,
        reChannelId: searchData.reChannelId,
        rePositionId: searchData.rePositionId,
        reStatus: parseInt(searchData.reStatus),
        startTime: searchData.dateIngerval.length > 0 ? searchData.dateIngerval[0] + ' 00:00:00' : '',
        endTime: searchData.dateIngerval.length > 0 ? searchData.dateIngerval[1] + ' 23:59:59' : '',
        reType: searchData.reType,
        menuType: searchData.menuType,
        pageSize: searchData.pageSize,
        page: searchData.page
      })
      .then(function (response) {
        return response.data
      })
  },


  /**
   * 操作：推荐和取消推荐
   */
  optRecommend(id, reStatus) {
    return http.post(`${CFG.API_URL}xsnRecommend/checkXsnRecommend`, {
      id,
      reStatus
    }).then(function (response) {
      return response.data
    })
  },
  /**
   * 进入编辑详情时查询列表
   * @returns {number}   
   */
  getEditRecoList(id) {
    return http
      .post(`${CFG.API_URL}xsnRecommend/detailXsnRecommend`, {
        id
      })
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 新增和编辑
   * @returns {number}   updateRole
   */
  addEditRecommend(detailParams) {
    return http.post(`${CFG.API_URL}xsnRecommend/addOrUpdXsnRecommend`, detailParams).then(function (response) {
      return response.data
    })
  },
  /**
   * 获取站点,列表   
   */
  getSiteList() {
    return http
      .post(`${CFG.API_URL}xsnSite/xsnSiteSelList`)
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 获取站点,内容频道，推荐位及序号列表   
   */
  getSiteChannelList(reSiteId, reType) {
    return http
      .post(`${CFG.API_URL}xsnRecommend/xsnRecommendSelect`, {
        reSiteId,
        reType
      })
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 输入文章iD时调用查询文章详情的接口，把文章详情回填到页面中
   * @returns {number}   updateRole
   */
  getArticleDetail(id) {
    return http.post(`${CFG.API_URL}xsnArticle/detailXsnArticle`, {
      id
    }).then(function (response) {
      return response.data
    })
  },
  /**
   * 输入学校名称时调用查询学校列表的接口  auto-complete   
   * @returns {number}   updateRole
   */
  getSchoolList(siteId) {
    return http.post(`${CFG.API_URL}xsnSchool/xsnSchoolList`, {
      siteId
    }).then(function (response) {
      return response.data
    })
  },
  /**
   * 输入名师工作室名称时调用查询名师工作室的接口  auto-complete   
   * @returns {number}   updateRole
   */
  getTeacherList(schoolId, page = -1) {
    return http.post(`${CFG.API_URL}xsnStudio/xsnStudioList`, {
      schoolId,
      page
    }).then(function (response) {
      return response.data
    })
  },
  /**
   * 输入名师工作室名称时调用查询名师工作室的接口  auto-complete   
   * @returns {number}   updateRole
   */
  getReporterList(schoolId, page = -1) {
    return http.post(`${CFG.API_URL}xsnRepoter/xsnRepoterList`, {
      schoolId,
      page
    }).then(function (response) {
      return response.data
    })
  }
}
export default recommendConService
