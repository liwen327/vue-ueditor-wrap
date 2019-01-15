import http from '../HttpInterceptor'
import CFG from '../Config'

const roleService = {
  /**
   * 获取用户内容列表

   * @param pageNo
   * @param pageSise
   * @returns {boolean}
   */
  roleList(searchData) {
    return http
      .post(`${CFG.API_URL}system/roleList`, {
        name: searchData.name,
        page: searchData.page,
        pageSize: searchData.pageSize
      })
      .then(function (response) {
        return response.data
      })
  },

  /**
   * 删除角色
   */
  /* deleteUser(userId) {
    return http
      .post(`${CFG.API_URL}user/deleteUser`, {
        userId
      })
      .then(function (response) {
        return response.data
      })
  }, */
  /**
   * 新增角色
   * @returns {number}   updateRole
   */
  addRole(addParams) {
    return http.post(`${CFG.API_URL}system/addRole`, addParams).then(function (response) {
      return response.data
    })
  },
  /**
   * 编辑角色
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
}
export default roleService
