<template>
  <el-aside width="150px">
    <el-menu default-active="2"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">

      <el-submenu v-for="(item,index) in menuList"
                  :key="index"
                  :index="item.name"
                  @click="jumpTo(item.resurl)">
        <template slot="title">
          <!-- <i class="el-icon-location"></i> -->
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group v-if="item.rescList.length > 0">
          <!--<template slot="title">
  分组一
</template>-->
          <el-menu-item v-for="(subItem,i) in item.rescList"
                        :key="i"
                        :index="subItem.name"
                        @click="jumpTo(subItem.resurl)">
            {{subItem.name}}
            <!-- <router-link :to="{path:'JSON.stringfy(subItem.resurl)'}">{{subItem.name}}</router-link> -->
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>

  </el-aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import loginService from '../../common/service/loginService'
import store from '@/store/index'
export default {
  name: 'list-sidebar',
  store,
  data () {
    return {
      activeBar: 'active_bar',
      indexSide: 0
    }
  },
  /* props: {
    ads: {
      type: Array,
      required: true
    }
  }, */
  created () {

    // this.$store.dispatch('MENU_LIST')
    this.getManaList(() => {
      this.getMenuList()
    })
    // console.log(this.$store)

  },
  methods: {
    getManaList (callbackFn) {
      let userId = JSON.parse(localStorage.getItem("userId"))
      loginService.getManaList(userId).then(data => {
        // console.log("mana data====:", data)
        let { retCode, retInfo, voList } = data
        if (retCode !== '00000') {
          this.$message({
            message: retInfo,
            type: 'error'
          })
        } else {
          localStorage.setItem("manaType", JSON.stringify(voList[0].manaType))
          localStorage.setItem("manaId", JSON.stringify(voList[0].manaId))
          localStorage.setItem("userType", JSON.stringify(voList[0].manaType))
          localStorage.setItem("userBlId", JSON.stringify(voList[0].manaId))
          callbackFn()
          if (voList.length > 1) {
            // console.log('data manalist:==', voList[0])

            // localStorage.setItem("manaName", JSON.stringify(voList[0].manaName))


          }

          // this.$router.push({ path: '/home' })
        }
      })
    },
    getMenuList () {
      /* const userid = JSON.parse(localStorage.getItem("userId"))
      const user = {
        userId: userid,
        manaType: JSON.parse(localStorage.getItem("manaType")),
        manaId: JSON.parse(localStorage.getItem("manaId"))
      }
      loginService.getMenuList(user).then((response) => {
        if (response.retCode === '00000') {
          this.menuList = response.voList || []
          this.menuList.forEach(function (item) {
            if (item.rescList.length > 0) {
              item.rescList.forEach(function (subItem, i) {
                if (subItem.id === 36) {   //"站点配置管理"
                  subItem.resurl = "/operation/system/channel/list"
                }
                if (subItem.id === 37) {   //"内容频道配置管理"
                  subItem.resurl = "/operation/system/conchannel/list"
                }
                if (subItem.id === 38) {   //"内容分类配置管理"
                  subItem.resurl = "/operation/system/conclssify/list"
                }
                if (subItem.id === 39) {   //"角色管理"
                  subItem.resurl = "/operation/system/rolemanage/list"
                }
                if (subItem.id === 40) {   //"用户管理"
                  subItem.resurl = "/operation/system/user/list"
                }
                if (subItem.id === 41) {   //"内容列表"
                  subItem.resurl = "/operation/content/list"
                }
                if (subItem.id === 17) {   //"待审核文章"
                  subItem.resurl = "/operation/check/list"
                }
                if (subItem.id === 33) {   //"待审核学校列表"
                  subItem.resurl = "/operation/school/check"
                }
                if (subItem.id === 42) {   //"已通过审核的学校列表"
                  subItem.resurl = "/operation/school/list"
                }
                if (subItem.id === 46) {   //"话题管理列表"
                  subItem.resurl = "/operation/topic/list"
                }
                if (subItem.id === 26) {   //"内容位推荐列表"
                  subItem.resurl = "/operation/recommend/content/list"
                }
                if (subItem.id === 27) {   //"轮播图推荐列表"
                  subItem.resurl = "/operation/recommend/carousel/list"
                }
                if (subItem.id === 28) {   //"热文章推荐列表"
                  subItem.resurl = "/operation/recommend/hotarticle/list"
                }
                if (subItem.id === 29) {   //"热话题推荐列表"
                  subItem.resurl = "/operation/recommend/hottopic/list"
                }
                if (subItem.id === 30) {   //"热校圈推荐列表"
                  subItem.resurl = "/operation/recommend/school/list"
                }
                if (subItem.id === 31) {   //"名师工作室推荐列表"
                  subItem.resurl = "/operation/recommend/teacher/list"
                }
                if (subItem.id === 47) {   //"记者推荐列表"
                  subItem.resurl = "/operation/recommend/reporter/list"
                }
                //学校后台内容管理
                if (subItem.id === 2) {   //"学校后台内容管理列表"
                  subItem.resurl = "/school/content/list"
                }
                //学校后台栏目管理
                if (subItem.id === 48) {   //"学校后台栏目管理列表"
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
              if (item.id === 45) {   //"话题管理"
                item.resurl = "/operation/topic/list"

              }
            }
          })
          this.loading = false
        }
      }).catch((error) => {
        this.$message.error({
          message: error.message || '系统繁忙，请稍候再试',
          type: 'success',
          center: true,
          customClass: 'common_tip'
        })
        this.loading = false
      }) */


      store.dispatch('MENU_LIST')
      /* console.log("menuList:===", store.state.app.menuList)
      console.log("menuList:===", store.state.app.isMultiUser)
      console.log("menuList:===", this.menuList)
      let leftMenuList = store.state.app.menuList
      store.dispatch('MENU_LIST').then(() => {
        leftMenuList.forEach(function (item) {
          if (item.rescList.length > 0) {
            item.rescList.forEach(function (subItem, i) {
              if (subItem.id === 36) {   //"站点配置管理"
                subItem.resurl = "/operation/system/channel/list"
              }
              if (subItem.id === 37) {   //"内容频道配置管理"
                subItem.resurl = "/operation/system/conchannel/list"
              }
              if (subItem.id === 38) {   //"内容分类配置管理"
                subItem.resurl = "/operation/system/conclssify/list"
              }
              if (subItem.id === 39) {   //"角色管理"
                subItem.resurl = "/operation/system/rolemanage/list"
              }
              if (subItem.id === 40) {   //"用户管理"
                subItem.resurl = "/operation/system/user/list"
              }
              if (subItem.id === 41) {   //"内容列表"
                subItem.resurl = "/operation/content/list"
              }
              if (subItem.id === 17) {   //"待审核文章"
                subItem.resurl = "/operation/check/list"
              }
              if (subItem.id === 33) {   //"待审核学校列表"
                subItem.resurl = "/operation/school/check"
              }
              if (subItem.id === 42) {   //"已通过审核的学校列表"
                subItem.resurl = "/operation/school/list"
              }
              if (subItem.id === 46) {   //"话题管理列表"
                subItem.resurl = "/operation/topic/list"
              }
              if (subItem.id === 26) {   //"内容位推荐列表"
                subItem.resurl = "/operation/recommend/content/list"
              }
              if (subItem.id === 27) {   //"轮播图推荐列表"
                subItem.resurl = "/operation/recommend/carousel/list"
              }
              if (subItem.id === 28) {   //"热文章推荐列表"
                subItem.resurl = "/operation/recommend/hotarticle/list"
              }
              if (subItem.id === 29) {   //"热话题推荐列表"
                subItem.resurl = "/operation/recommend/hottopic/list"
              }
              if (subItem.id === 30) {   //"热校圈推荐列表"
                subItem.resurl = "/operation/recommend/school/list"
              }
              if (subItem.id === 31) {   //"名师工作室推荐列表"
                subItem.resurl = "/operation/recommend/teacher/list"
              }
              if (subItem.id === 47) {   //"记者推荐列表"
                subItem.resurl = "/operation/recommend/reporter/list"
              }
              //学校后台内容管理
              if (subItem.id === 2) {   //"学校后台内容管理列表"
                subItem.resurl = "/school/content/list"
              }
              //学校后台栏目管理
              if (subItem.id === 48) {   //"学校后台栏目管理列表"
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
            if (item.id === 45) {   //"话题管理"
              item.resurl = "/operation/topic/list"

            }
          }
        })
      }) */


    },
    //跳转到的页面
    jumpTo (toUrl) {
      this.$router.push({
        path: toUrl
      })
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    /* ...mapActions([
      'MENU_LIST'
    ]) */
  },
  components: {
    // AppHeader
  },
  computed: {
    ...mapGetters([
      'menuList'
    ])
  }
}
</script>

<style lang="stylus" scope>
.el-menu {
  height: 100%;

  >.router-link-active, .el-menu-item a:hover {
    background: #eee !important;
    color: #333 !important;
  }

  .menu_list {
    color: #999;
    display: block;
    padding: 0 45px;
  }
}

.el-menu-item {
  padding: 0 !important;
}

.active_bar {
  background: #ca0c16;
  color: #fff !important;
}

.el-submenu .el-menu-item {
  padding-left: 30px !important;
  min-width: auto !important;
}

.el-submenu__title {
  padding: 0 !important;
}

.el-submenu__title span {
  display: inline-block;
  margin-left: 8px;
}

.el-menu-item [class^=el-icon-] {
  margin-right: 2px !important;
}

.el-menu .el-menu-item a {
  color: #fff !important;
}

.el-menu .el-menu-item a:hover {
  background-color: rgb(67, 74, 80) !important;
  color: #fff !important;
}

.el-submenu [class^=el-icon-] {
  margin-right: 0 !important;
  width: 20px;
}
</style>
