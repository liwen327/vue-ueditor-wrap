<template>

  <el-container>
    <el-header>
      <app-header></app-header>
    </el-header>
    <el-container>
      <list-sidebar></list-sidebar>
      <el-main>
        <!-- <div class="show-home">
          <div v-if="showHome">欢迎您！</div>
        </div> -->
        <!-- <div class="show-home"
             v-if="showHome">欢迎您！</div> -->
        <!-- <div style= "position:fixed;left:149px;top:42px;">
              <img src="../assets/1052.jpg"></img>
            </div> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AppHeader from '../AppHeader'
import listSidebar from './sideBar/listSidebar'
// import loginService from '../common/service/loginService'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      showHome: true,
      collapsed: false
    }
  },
  created () {
    //点击进页面时不显示“欢迎您”
    /* const winHref = window.location.href
    if (winHref.indexOf("home") > -1) {
      this.showHome = true
    } else {
      this.showHome = false
    } */

  },
  mounted () {

    if (this.$route.path.indexOf('home') < 0) {
      this.showHome = false
      // this.$store.dispatch('dicInit')
    } else {
      this.showHome = true
    }
  },
  methods: {
    //折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed;
    },
    showMenu (i, status) {
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
    },/* ,
    ...mapActions([
      'FETCH_LOADING'
      // TODO 暂时不用action在页面分发 统一在http.js dispatch
    ]) */

  },
  components: {
    AppHeader,
    listSidebar
  },
  computed: {
    ...mapGetters([
      'fetchLoading',
      'username'
    ])
  }
}
</script>
<style scoped lang="stylus">
.el-header {
  height: 42px !important;
  padding: 0;
}

.side_bar {
  width: 150px;
}
</style>
