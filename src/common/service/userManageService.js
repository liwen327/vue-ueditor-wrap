import http from '../HttpInterceptor'
import CFG from '../Config'

const userListService = {

  /**
   * 获取用户内容列表

   * @param pageNo
   * @param pageSise
   * @returns {boolean}
   */
  userList(searchData) {
    return http
      .post(`${CFG.API_URL}user/queryUserByCondition`, {
        userName: searchData.userName,
        page: searchData.page,
        pageSize: searchData.pageSize
      })
      .then(function (response) {
        return response.data
      })
  },

  /**
   * 删除用户
   */
  deleteUser(userId) {
    return http
      .post(`${CFG.API_URL}user/deleteUser`, {
        userId
      })
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 新增用户时获取用户角色多选框列表
   * @returns {number}
   */
  addGetRoleList(roleType, page) {
    return http
      .post(`${CFG.API_URL}system/roleList`, {
        roleType,
        page
      })
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 进入新增或编辑用户界面时查询用户信息
   * @returns {number}
   */
  queryUserById(userId) {
    return http
      .post(`${CFG.API_URL}user/queryUserById`, {
        userId
      })
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 获取学校下拉列表
   * @returns {number}
   */
  getSchList() {
    return http
      .post(`${CFG.API_URL}xsnSchool/xsnSchoolSelList`)
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 获取站点下拉列表
   * @returns {number}
   */
  getSiteList() {
    return http
      .post(`${CFG.API_URL}xsnSite/xsnSiteSelList`)
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 新增用户
   * @returns {number}
   */
  addUser(addParams) {
    return http
      .post(`${CFG.API_URL}user/saveUser`, addParams)
      .then(function (response) {
        return response.data
      })
  },
  /**
   * 编辑用户
   * @returns {number}
   */
  editUser(editParams) {
    return http
      .post(`${CFG.API_URL}user/modifyUser`, editParams)
      .then(function (response) {
        return response.data
      })
  }

}
export default userListService
