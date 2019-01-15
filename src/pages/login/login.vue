<template>
  <el-form :model="ruleForm2"
           :rules="rules2"
           ref="ruleForm2"
           label-position="left"
           label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">新少年内容管理系统v1.0</h3>
    <el-form-item prop="account">
      <el-input type="text"
                v-model="ruleForm2.account"
                auto-complete="off"
                placeholder="账号"
                minlength="3"
                maxlength="15"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password"
                v-model="ruleForm2.checkPass"
                auto-complete="off"
                placeholder="密码"
                minlength="3"
                maxlength="15"></el-input>
    </el-form-item>
    <!-- <div prop="checked">
      <el-checkbox v-model="ruleForm2.checked"
                   :checked="ruleForm2.checked"
                   class="remember">7天自动登录</el-checkbox>
    </div> -->
    <el-form-item style="width:100%;">
      <el-button type="primary"
                 @click.native.prevent="handleSubmit2"
                 :loading="logining">登录</el-button>
      <el-button @click.native.prevent="handleReset2">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import loginService from '../../common/service/loginService'

export default {
  data () {
    return {
      logining: false,
      ruleForm2: {
        account: '',
        checkPass: '',
        checked: true
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          // { validator: validaePass }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    handleReset2 () {
      this.$refs.ruleForm2.resetFields()
    },
    handleSubmit2 (ev) {
      var _this = this
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          // this.logining = true
          var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass, rememberMe: this.ruleForm2.checked }


          loginService.requestLogin(loginParams).then(data => {
            console.log("login data====:", data)
            this.logining = false
            let { retCode, retInfo, vo } = data
            if (retCode !== '00000') {
              this.$message({
                message: retInfo,
                type: 'error'
              })
            } else {
              // localStorage.clear();
              try {
                localStorage.setItem("userName", JSON.stringify(vo.userName))
                localStorage.setItem("userId", JSON.stringify(vo.userId))
                localStorage.setItem("userType", JSON.stringify(vo.userType))
                localStorage.setItem("userBlId", JSON.stringify(vo.userBlId))
              } catch (oException) {
                if (oException.name == 'QuotaExceededError') {
                  console.log('已经超出本地存储限定大小！');
                  // 可进行超出限定大小之后的操作，如下面可以先清除记录，再次保存
                  localStorage.clear()
                  localStorage.setItem("userName", JSON.stringify(vo.userName))
                  localStorage.setItem("userId", JSON.stringify(vo.userId))
                  localStorage.setItem("userType", JSON.stringify(vo.userType))
                  localStorage.setItem("userBlId", JSON.stringify(vo.userBlId))
                }
              }
              this.$router.push({ path: '/home' })
              // this.$router.push({ path: '/operation/system/user/list' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="stylus">
.login-container {
  /* box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02); */
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
}

.remember {
  margin: 0px 0px 35px 0px;
}
</style>
