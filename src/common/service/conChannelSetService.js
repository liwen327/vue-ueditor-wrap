import http from '../HttpInterceptor'
import CFG from '../Config'

const conChannelSetService = {
  /**
   * 获取用户内容列表

   * @param pageNo
   * @param pageSise
   * @returns {boolean}
   */
  conList(name) {
    return http
      .post(`${CFG.API_URL}xsnChannel/xsnChannelList`, name)
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 删除频道  这个暂时不可以删除
   */
  deleteChannel(id) {
    return http.post(`${CFG.API_URL}xsnChannel/delXsnChannelById`, {
      id
    }).then(function (response) {
      return response.data
    })
  },
  /**
   * 编辑话题获取此话题详情
   */
  getEditChannelDetail(id) {
    return http
      .post(`${CFG.API_URL}xsnChannel/detailXsnChannel`, {
        id
      })
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 增加编辑站点   
   */
  addEditChannel(detailParams) {
    return http.post(`${CFG.API_URL}xsnChannel/addAndUpdXsnChannel`, detailParams).then(function (response) {
      return response.data
    })
  },
  /**
   * 增加频道时获取下拉站点列表   getSiteList
   */
  getSiteList() {
    return http.post(`${CFG.API_URL}xsnSite/xsnSiteSelList`).then(function (response) {
      return response.data
    })
  },
  /**
   * 增加频道时获取系统内容分类聚合多选 框列表
   */
  getSubjectList(isChannelPop=1) {
    return http.post(`${CFG.API_URL}/xsnSubject/xsnSubjectList `, {
      isChannelPop
    }).then(function (response) {
      return response.data
    })
  },
}

export default conChannelSetService
