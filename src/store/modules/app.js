// import api from '@/apis/http'
import * as types from './../types.js'
import loginService from '@/common/service/loginService'
const state = {
  // 请求数据时加载状态loading
  fetchLoading: false,
  user: null,
  token: null,
  isMultiUser: false,
  menuList: [],
  manaList: [],
  manaName: ''
}

const getters = {
  // 请求数据时加载状态
  fetchLoading: state => state.fetchLoading,
  user: state => state.user,
  token: state => state.token,
  isMultiUser: state => state.isMultiUser,
  menuList: state => state.menuList,
  manaList: state => state.manaList,
  manaName: state => state.manaName
}


const actions = {
  // 请求数据时状态loading
  FETCH_LOADING({
    commit
  }, res) {
    // console.log('进入action===传入的res', res)
    commit(types.FETCH_LOADING, res)
  },
  userLogin({
    commit
  }, res) {
    commit(types.USER_LOGIN, res)
  },
  USER_MULTI({
    commit
  }) {
    let userId = JSON.parse(localStorage.getItem("userId"))
    // commit('isMultiUser', res)
    loginService.getManaList(userId).then(data => {

      if (data.retCode === '00000') {
        if (data.voList.length > 1) {
          commit(types.USER_MULTI, true)
          commit(types.MANA_LIST, data.voList)
          commit(types.MANA_NAME, data.voList[0].manaName)
          // localStorage.setItem("manaList", JSON.stringify(data.voList))

        }

      }
    })
  },
  MENU_LIST({
    commit
  }, res) {
    let menuParams = {
      userId: JSON.parse(localStorage.getItem("userId")),
      manaId: JSON.parse(localStorage.getItem("manaId")),
      manaType: JSON.parse(localStorage.getItem("manaType"))
    }
    // commit('isMultiUser', res)
    loginService.getMenuList(menuParams).then(data => {

      if (data.retCode === '00000') {
        // console.log("voList:===", data.voList)
        data.voList.forEach(function (item) {
          if (item.rescList.length > 0) {
            item.rescList.forEach(function (subItem, i) {
              if (subItem.id === 36) { //"站点配置管理"
                subItem.resurl = "/operation/system/channel/list"
              }
              if (subItem.id === 37) { //"内容频道配置管理"
                subItem.resurl = "/operation/system/conchannel/list"
              }
              if (subItem.id === 38) { //"内容分类配置管理"
                subItem.resurl = "/operation/system/conclssify/list"
              }
              if (subItem.id === 39) { //"角色管理"
                subItem.resurl = "/operation/system/rolemanage/list"
              }
              if (subItem.id === 40) { //"用户管理"
                subItem.resurl = "/operation/system/user/list"
              }
              if (subItem.id === 41) { //"内容列表"
                subItem.resurl = "/operation/content/list"
              }
              if (subItem.id === 17) { //"待审核文章"
                subItem.resurl = "/operation/check/list"
              }
              if (subItem.id === 33) { //"待审核学校列表"
                subItem.resurl = "/operation/school/check"
              }
              if (subItem.id === 42) { //"已通过审核的学校列表"
                subItem.resurl = "/operation/school/list"
              }
              if (subItem.id === 46) { //"话题管理列表"
                subItem.resurl = "/operation/topic/list"
              }
              if (subItem.id === 26) { //"内容位推荐列表"
                subItem.resurl = "/operation/recommend/content/list"
              }
              if (subItem.id === 27) { //"轮播图推荐列表"
                subItem.resurl = "/operation/recommend/carousel/list"
              }
              if (subItem.id === 28) { //"热文章推荐列表"
                subItem.resurl = "/operation/recommend/hotarticle/list"
              }
              if (subItem.id === 29) { //"热话题推荐列表"
                subItem.resurl = "/operation/recommend/hottopic/list"
              }
              if (subItem.id === 30) { //"热校圈推荐列表"
                subItem.resurl = "/operation/recommend/school/list"
              }
              if (subItem.id === 31) { //"名师工作室推荐列表"
                subItem.resurl = "/operation/recommend/teacher/list"
              }
              if (subItem.id === 47) { //"记者推荐列表"
                subItem.resurl = "/operation/recommend/reporter/list"
              }
              //学校后台内容管理
              if (subItem.id === 2) { //"学校后台内容管理列表"
                subItem.resurl = "/school/content/list"
              }
              //学校后台栏目管理
              if (subItem.id === 48) { //"学校后台栏目管理列表"
                subItem.resurl = "/school/subject/list"
              }
              //学校后台小记者管理
              if (subItem.id === 10) {
                subItem.resurl = "/school/reporter/list"
              }
              //学校后台学校基本信息
              if (subItem.id === 50) {
                subItem.resurl = "/school/basic"
              }
              //学校后台学校简介
              if (subItem.id === 51) {
                subItem.resurl = "/school/introdution"
              }
              //学校后台学校基本信息
              if (subItem.id === 52) {
                subItem.resurl = "/school/sing"
              }
              //学校后台学校简介
              if (subItem.id === 53) {
                subItem.resurl = "/school/contact"
              }
            })
          } else {
            // item.resurl = "item"
            if (item.id === 45) { //"话题管理"
              item.resurl = "/operation/topic/list"

            }
          }
        })
        commit(types.MENU_LIST, data.voList)
      } else {
        this.$message({
          message: data.retInfo || '系统繁忙，请稍候再试',
          type: 'error',
          center: true,
          customClass: 'common_tip'
        })
      }
    })
  }
}

const mutations = {
  // 请求数据时loading
  [types.FETCH_LOADING](state, res) {
    state.fetchLoading = res
  },
  userLogin(state, data) {
    state.user = data
    state.token = data
  },
  userLogout(state, data) {
    state.user = data
    state.token = null
  },
  [types.USER_MULTI](state, data) {
    state.isMultiUser = data
  },
  [types.MENU_LIST](state, data) {
    state.menuList = data
  },
  [types.MANA_LIST](state, data) {
    state.manaList = data
  },
  [types.MANA_NAME](state, data) {
    state.manaName = data
  }
  /* ,
    dicInit: (state, data) => {
      state.adShapeList = data.adShapeList
      state.resourcePlatformList = data.resourcePlatformList
      state.productList = data.productList
    } */
}
export default {
  state,
  getters,
  actions,
  mutations
}
