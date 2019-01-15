<template>
  <div id="app">
    <Loading v-if="fetchLoading"
             :colorParam='colorParam'
             :heightParam="heightParam"></Loading>
    <!-- <app-header></app-header> -->
    <router-view class="view"
                 v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
import AppHeader from './AppHeader'
import Loading from './components/loading/Loading'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      'heightParam': 2,
      'colorParam': '#b20b13',
      'init': false,
      'isLogin': false,
      isRouterAlive: true
    }
  },
  created () {
  },
  mounted () {
    
  },
  components: {
    AppHeader,
    Loading
  },
  methods: {
    ...mapActions([
      'FETCH_LOADING',
      'USER_MULTI',
      'MENU_LIST'
      // TODO 暂时不用action在页面分发 统一在http.js dispatch
    ])
  },
  computed: {
    ...mapGetters([
      'fetchLoading',
      'isMultiUser',
      'menuList'
    ])
  }
}
</script>

<style lang="stylus">
.list_wrap {
  width: 100%;
  padding-bottom: 50px;
}

.el-container {
  height: 100%;
}

.detail_wrap {
  width: 50%;
}

.detail_wrap .el-input, .detail_wrap .el-textarea {
  width: 100%;
}

.detail_wrap .el-select, .detail_wrap .el-select .el-input {
  width: 100%;
}

/* .el-table__body, .el-table__footer, .el-table__header {
  border-collapse: collapse;
  border: 1px solid #ebeef5;
} */
.el-table--fit {
  border: 1px solid #ebeef5;
  border-bottom: none;
}

.el-pagination {
  text-align: right;
  padding: 20px 0;
}

.el-form--inline .float_right {
  float: right !important;
}

.el-form--inline {
  width: 100% !important;
}

.el-dialog__body {
  padding: 20px;
}

.el-radio {
  margin-right: 30px !important;
}

.el-radio + .el-radio {
  margin: 0 30px 20px 0 !important;
}
</style>
