import http from '../HttpInterceptor'
import CFG from '../Config'

const channelSetService = {
  /**
   * 获取用户内容列表

   * @param pageNo
   * @param pageSise
   * @returns {boolean}
   */
  conList(name) {
    return http
      .post(`${CFG.API_URL}xsnSite/xsnSiteList`, name)
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 启用停用站点
   */
  startStopChannel(id, status) {
    return http.post(`${CFG.API_URL}xsnSite/startOrStopXSiteById`, {
      id,
      status
    }).then(function (response) {
      return response.data
    })
  },

  /**
   * 编辑话题获取此话题详情
   */
  getEditTopicList(id) {
    return http
      .post(`${CFG.API_URL}xsnTopic/detailXsnTopic`, {
        id
      })
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 增加站点
   */
  addSite(detailParams) {
    return http.post(`${CFG.API_URL}xsnSite/addXsnSite`, detailParams).then(function (response) {
      return response.data
    })
  },
  /**
   * 站点详情
   */
  getSiteDetail(id) {
    return http.post(`${CFG.API_URL}xsnSite/detailXsnSite`, {
      id
    }).then(function (response) {
      return response.data
    })
  },
  /**
   * 编辑站点
   */
  editSite(detailParams) {
    return http.post(`${CFG.API_URL}xsnSite/modifyXsnSite`, detailParams).then(function (response) {
      return response.data
    })
  },
  /**
   *进入新增或编辑页面时调用此接口，获取toke存起来，点击提交时把此字段传给后台
   */
  getToken() {
    return http.post(`${CFG.API_URL}xsnToken`).then(function (response) {
      return response.data
    })
  }
}
export default channelSetService
