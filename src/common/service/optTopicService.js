import http from '../HttpInterceptor'
import CFG from '../Config'

const optTopicService = {
  /**
   * 获取用户内容列表

   * @param pageNo
   * @param pageSise
   * @returns {boolean}
   */
  conList(searchData) {
    return http
      .post(`${CFG.API_URL}xsnTopic/xsnTopicList`, {
        topicName: searchData.topicName,
        status: searchData.subjectId,
        startTime: searchData.dateIngerval.length > 0 ? searchData.dateIngerval[0] + ' 00:00:00' : '',
        endTime: searchData.dateIngerval.length > 0 ? searchData.dateIngerval[1] + ' 23:59:59' : '',
        pageSize: searchData.pageSize,
        page: searchData.page,
      })
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 启用停用主题
   */
  startStopTopic(params) {
    return http
      .post(`${CFG.API_URL}xsnTopic/startOrEndXsnTopic`, params)
      .then(function (response) {
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
   * 编辑/增加话题
   */
  editAddTopic(detailParams) {
    return http
      .post(`${CFG.API_URL}xsnTopic/addOrUpdXsnTopic`, detailParams)
      .then(function (response) {
        return response.data
      })
  }



}
export default optTopicService
