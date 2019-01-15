import http from '../HttpInterceptor'
import CFG from '../Config'

const optCheckService = {
  /**
   * 获取用户内容列表

   * @param pageNo
   * @param pageSise
   * @returns {boolean}
   */
  conList(checkData) {
    return http
      .post(`${CFG.API_URL}xsnArticle/xsnArticleList`, checkData)
      .then(function (response) {
        return response.data
      })
  },

  /**
   * 文章驳回
   */
  rejectArticle(ids) {
    return http
      .post(`${CFG.API_URL}xsnArticle/checkBackXsnArticle`, {
        ids
      })
      .then(function (response) {
        return response.data
      })
  },

  /**
   * 文章审核
   */
  checkArticle(ids, status) {
    return http
      .post(`${CFG.API_URL}xsnArticle/checkXsnArticle`, {
        ids,
        status
      })
      .then(function (response) {
        return response.data
      })
  },


}
export default optCheckService
