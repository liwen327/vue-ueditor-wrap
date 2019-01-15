<template>
  <div class="detail_wrap">
    <el-form :model="detailRuleForm"
             :rules="rules"
             ref="detailRuleForm"
             label-width="60px"
             class="demo-detailRuleForm">
      <div class="form-block">
        <h2 class="form-title">学校校歌</h2>
      </div>

      <el-form-item label="内容"
                    prop="schoolSong"
                    class="ueditor_wrap">
        <vue-ueditor-wrap v-model="detailRuleForm.schoolSong"
                          :destroy="true"
                          ref="editor"
                          @ready="ready"></vue-ueditor-wrap>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('detailRuleForm')">保存</el-button>

        <el-button @click="reFresh()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import optSchoolService from '../../../common/service/optSchoolManaService'
import commonService from '../../../common/service/commonService'
import VueUeditorWrap from 'vue-ueditor-wrap'
import CFG from '@/common/Config'
export default {
  name: 'add-user',
  data () {
    return {
      detailRuleForm: {
        id: '',
        schoolId: localStorage.getItem("userBlId"),
        schoolSong: '',
        schoolItdc: '',
        schoolContacts: ''
      },
      rules: {
        siteId: [{
          required: true,
          message: '请选择所属站点',
          trigger: 'change'
        }],
        content: [{
          required: true,
          message: '请输入文章内容',
          trigger: 'blur'
        }]
      },
      token: ''
    }
  },
  created () {
    // console.log("CFG.API_URL:", CFG.API_URL)
    this.getSiteSubjectList()
    this.disableBack()
  },
  mounted () {
  },
  methods: {
    //禁用后退
    disableBack () {
      //处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外   
      function banBackSpace (e) {
        var ev = e || window.event;//获取event对象      
        var obj = ev.target || ev.srcElement;//获取事件源      

        var t = obj.type || obj.getAttribute('type');//获取事件源类型     

        //获取作为判断条件的事件类型   
        var vReadOnly = obj.getAttribute('readonly');
        var vEnabled = obj.getAttribute('enabled');
        //处理null值情况   
        vReadOnly = (vReadOnly == null) ? false : vReadOnly;
        vEnabled = (vEnabled == null) ? true : vEnabled;

        //当敲Backspace键时，事件源类型为密码或单行、多行文本的，   
        //并且readonly属性为true或enabled属性为false的，则退格键失效   
        var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea")
          && (vReadOnly == true || vEnabled != true)) ? true : false;

        //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效   
        var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea")
          ? true : false;

        //判断   
        if (flag2) {
          return false;
        }
        if (flag1) {
          return false;
        }
      }

      //禁止后退键 作用于Firefox、Opera   
      document.onkeypress = banBackSpace;
      //禁止后退键  作用于IE、Chrome   
      document.onkeydown = banBackSpace;
    },
    getSiteSubjectList () {


      //进入编辑文章详情页面的查看文章详情接口
      optSchoolService.getEditSchoolList(parseInt(this.detailRuleForm.schoolId)).then((result) => {
        if (result.retCode === '00000') {
          // console.log("getUser:====", result)

          this.detailRuleForm = result.vo
          if (result.vo.schoolCtd !== null) {
            if (result.vo.schoolCtd.schoolSong) {
              this.detailRuleForm.schoolSong = result.vo.schoolCtd.schoolSong
            } if (result.vo.schoolCtd.id) {
              this.detailRuleForm.id = result.vo.schoolCtd.id
            }
          } else {
            this.detailRuleForm.id = null
            this.detailRuleForm.schoolId = localStorage.getItem("userBlId") || ''
          }



        } else {
          this.$message({
            message: '获取失败',
            type: 'error',
            onClose: () => {
              this.loading = false
            }
          })
        }
      })

      //获取token
      commonService.getToken().then((response) => {
        if (response.retCode === '00000') {
          this.token = response.vo

        } else {
          this.$message({
            message: response.retInfo || '参数错误',
            type: 'error',
            onClose: () => {
              this.loading = false
            }
          })
        }
      })


    },
    ready (editorInstance) {
      /* console.log(`编辑器实例${editorInstance.key}: `, editorInstance)
      console.log("UE.Editor:----", editorInstance.getContent) */
      UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
      UE.Editor.prototype.getActionUrl = function (action) {
        if (action == 'uploadImg') {
          return `${CFG.API_URL}xsnArticle/uploadUeditorImg`;//本地
          // return 'http://' +window.location.host + '/vocy/vocyArticle/uploadImg';//生产
        } else if (action == 'uploadVideo') {
          return `${CFG.API_URL}xsnArticle/uploadUeditorVideo`;
          // return 'http://' + window.location.host + '/vocy/vocyArticle/uploadVideo';//生产
        } else {
          return this._bkGetActionUrl.call(this, action);
        }
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let detailParams = {
            id: this.detailRuleForm.id,
            schoolId: this.detailRuleForm.schoolId,
            schoolSong: this.detailRuleForm.schoolSong,
            schoolItdc: this.detailRuleForm.schoolItdc,
            schoolContacts: this.detailRuleForm.schoolContacts,
            token: this.token
          }

          optSchoolService.editSchool(detailParams).then((result) => {
            if (result.retCode === '00000') {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              // this.$router.replace('/school/sing')
              location.reload()
            } else {
              this.$message({
                message: result.retInfo || '保存失败，请重试',
                type: 'error',
                onClose: () => {
                  this.loading = false
                }
              })
            }
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      // this.$refs[formName].resetFields();
      // this.$router.push('/school/content/list')
    }
  },
  components: {
    VueUeditorWrap
  }
}
</script>

<style lang="stylus">
.form-block {
  padding-bottom: 20px;
}

.ueditor_wrap {
  width: 500px;
}

.el-form-item__content {
  line-height: 20px !important;
}
</style>
<<style lang="stylus" scoped>
  .el-radio-group{
    line-height:50px!important;
  }
</style>