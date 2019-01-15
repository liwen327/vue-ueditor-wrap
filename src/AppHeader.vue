<template>
  <div class="top_header">
    <el-row>
      <el-col :span="15">
        <div class="logo">
          <router-link :to="{path: '/home'}">
            <img class="logo_img"
                 src="/static/img/logo_new.png" /><span class="logo_text">管理平台</span>
          </router-link>
          <span v-if="isMultiUser"
                class="header_change">
            <em>{{manaName}}</em>
            <strong class="el-icon-menu"
                    @click="changeWork">切换工作台</strong>
          </span>
        </div>
      </el-col>
      <el-col :span="8">
        <ul class="header-right">
          <li v-if="parseInt(userType)===2">| &nbsp;&nbsp;<a :href="'http://cnypa.vocy.cn/school/' + userBlId"
               target="_blank">学校主页</a>
          </li>
          <li>| &nbsp;&nbsp;
            <router-link :to="{path:'/modifypwd'}">修改密码</router-link>
          </li>
          <li><a href="javascript:void(0)"
               @click="logout">退出</a></li>
          <li><img src="/static/img/avatar.jpg" />{{userName}}</li>

        </ul>
      </el-col>
    </el-row>
    <el-dialog title="请选择工作台"
               :visible.sync="dialogFormVisible">
      <el-form :model="manaForm">
        <el-form-item label=""
                      :label-width="formLabelWidth">
          <!-- <el-input v-model="form.name"
                      autocomplete="off"></el-input> -->
          <!-- {{manaList}} -->
          <el-radio-group v-model="manaForm.manaData">

            <el-radio v-for="(item) in manaList"
                      :key="item.manaName"
                      :value="item.manaName"
                      :label="item.id">{{item.manaName}}</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="changeUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import store from '@/store/index'
export default {
  name: 'app-header',
  store,
  data () {
    return {
      showQuit: false,
      activeIndex: '1',
      userType: localStorage.getItem("userType"),
      userBlId: localStorage.getItem("userBlId"),
      userName: JSON.parse(localStorage.getItem("userName")),
      // manaName: JSON.parse(localStorage.getItem("manaName")),
      // manaList: JSON.parse(localStorage.getItem("manaList")),
      dialogFormVisible: false,
      manaForm: {
        manaData: 0
      },
      formLabelWidth: '1px'


    }
  },
  created () {
    store.dispatch('USER_MULTI')
    console.log("manalist:==", this.$store.state.app.manaList)

  },
  mounted () {
    this.showQuit = true
  },
  methods: {
    showList (e) {
      this.showQuit = true
    },
    hiddenList (e) {
      this.showQuit = false
    },
    logout () {
      this.$confirm('确认退出吗?', '提示', {
        //type: 'warning'
      }).then(() => {
        localStorage.clear()
        this.$router.push({
          path: '/login'
        })
      }).catch(() => {

      })
    },
    changeWork () {
      this.dialogFormVisible = true
      let lastWork = this.$store.state.app.manaList.filter(item => {
        return item.manaName === this.$store.state.app.manaName
      })
      console.log("lastWork:==", lastWork)
      this.manaForm.manaData = lastWork[0].id
    },
    changeUser () {
      // console.log('fsdfdsf:--', this.manaForm.manaData)
      this.dialogFormVisible = false
      let chooseMana = this.$store.state.app.manaList.filter(item => {
        return this.manaForm.manaData === item.id
      })
      localStorage.setItem('manaType', chooseMana[0].manaType)
      localStorage.setItem('manaId', chooseMana[0].manaId)
      localStorage.setItem('userType', chooseMana[0].manaType)
      localStorage.setItem('userBlId', chooseMana[0].manaId)
      this.$store.state.app.manaName = chooseMana[0].manaName
      store.dispatch('MENU_LIST')
      this.$router.push('/home')
    },
    ...mapActions([
      'MENU_LIST',
      'USER_MULTI'
    ])
  },
  computed: {
    ...mapGetters([
      'user',
      'isMultiUser',
      'manaList',
      'manaName'
    ])
  }
}
</script>

<!-- 修改elementui组件css的样式单独写出来，不加scoped -->
<style lang="stylus" scoped>
.top_header {
  background: #20222A;
  height: 42px !important;
}

.logo {
  font-size: 16px !important;
  color: #fff !important;
  line-height: 42px !important;

  a {
    color: #ffffff !important;
  }
}

.header-right {
  color: #ffffff !important;
  overflow: hidden !important;
  line-height: 42px !important;

  a {
    color: #ffffff !important;
    font-size: 14px !important;
  }

  li {
    float: right !important;
    padding-left: 14px !important;
    font-size: 14px !important;

    img {
      width: 26px !important;
      height: 26px;
      border-radius: 100%;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}

.header-nav-menu {
  a {
    line-height: 42px;
    display: block;
    padding: 0 20px;
  }

  .is-active {
    background-color: #fff !important;
    font-weight: bold;
    color: #c10c16;
  }
}

.el-menu--horizontal > .el-menu-item {
  line-height: 43px;
  height: 42px;
  border-bottom: none;
  padding: 0;
}

.logo_img, .logo_text, .header_change {
  display: inline-block;
  vertical-align: middle;
}

.logo_img {
  width: 10%;
  margin-left: 10px;
  margin-bottom: 3px;
}

.header_change strong {
  font-weight: normal;
  cursor: pointer;
}

.header_change em {
  font-weight: normal;
  font-style: normal;
}
</style>
