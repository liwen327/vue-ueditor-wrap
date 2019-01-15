<template>
  <div class="detail_wrap">
    <el-form :model="detailRuleForm"
             :rules="rules"
             ref="detailRuleForm"
             label-width="130px"
             class="demo-detailRuleForm">
      <div class="form-block">
        <h2 class="form-title">学校基本信息</h2>
      </div>
      <el-form-item label="学校名称"
                    prop="schoolName">
        <el-input v-model="detailRuleForm.schoolName"></el-input>
      </el-form-item>
      <el-form-item label="校训"
                    prop="schoolMotto">
        <el-input type="textarea"
                  :rows="3"
                  v-model="detailRuleForm.schoolMotto"></el-input>
      </el-form-item>
      <el-form-item label="校徽"
                    prop="schoolBadge"
                    hide-required-asterisk="false">
        <el-upload class="upload-demo"
                   :action="uploadImgUrl"
                   v-model="detailRuleForm.schoolBadge"
                   :limit="1"
                   accept="image/jpeg,image/jpeg,image/gif,image/png"
                   enctype="multipart/form-data"
                   :on-change="onUploadChange"
                   :on-success="uploadSucc"
                   :on-remove="handleRemove"
                   :file-list="schoolBadgeList"
                   list-type="picture">
          <el-button size="small"
                     type="primary">点击上传</el-button>
          <div slot="tip"
               class="el-upload__tip">只能上传jpeg/jpg/png/gif格式的图片，建议尺寸200*200px，大小不超过2M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="首页banner"
                    prop="schoolBanner"
                    hide-required-asterisk="false">
        <el-upload class="upload-demo"
                   :action="uploadImgUrl"
                   v-model="detailRuleForm.schoolBanner"
                   :limit="1"
                   accept="image/jpeg,image/jpeg,image/gif,image/png"
                   enctype="multipart/form-data"
                   :on-change="onUploadBannerChange"
                   :on-success="uploadBannerSucc"
                   :on-remove="handleBannerRemove"
                   :file-list="schoolBannerList"
                   list-type="picture">
          <el-button size="small"
                     type="primary">点击上传</el-button>
          <div slot="tip"
               class="el-upload__tip">只能上传jpeg/jpg/png/gif格式的图片，建议尺寸1400*410px，大小不超过2M</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="学校地址"
                    prop="schoolAddress">
        <el-input v-model="detailRuleForm.schoolAddress"></el-input>
      </el-form-item>
      <!-- <el-form-item label="所属站点"
                    prop="siteId"
                    hide-required-asterisk="false">
        <el-select v-model="detailRuleForm.siteId"
                   placeholder="请选择">
          <el-option v-for="item in siteIdList"
                     :key="item.id"
                     :label="item.siteName"
                     :checked="item.checked"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="教育集团"
                    prop="schoolEduGroup"
                    hide-required-asterisk="false">
        <el-input v-model="detailRuleForm.schoolEduGroup"></el-input>
      </el-form-item>
      <el-form-item label="官网地址"
                    prop="schoolNetUrl"
                    hide-required-asterisk="false">
        <el-input v-model="detailRuleForm.schoolNetUrl"></el-input>
      </el-form-item>
      <el-form-item label="授牌编号"
                    prop="schoolPlaque"
                    hide-required-asterisk="false">
        <el-input v-model="detailRuleForm.schoolPlaque"></el-input>
      </el-form-item>
      <el-form-item label="联系人信息"
                    prop="contactName"
                    hide-required-asterisk="false">
        <el-input v-model="detailRuleForm.contactName"></el-input>
      </el-form-item>
      <el-form-item label="联系人职务"
                    prop="contactPosition"
                    hide-required-asterisk="false">
        <el-input v-model="detailRuleForm.contactPosition"></el-input>
      </el-form-item>
      <el-form-item label="手机号"
                    prop="contactPhone">
        <el-input v-model="detailRuleForm.contactPhone"></el-input>
      </el-form-item>

      <el-form-item v-if="detailRuleForm.id===''"
                    label="是否自动创建管理员账号"
                    prop="isCreManaAccount">
        <el-radio-group v-model="detailRuleForm.isCreManaAccount">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
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
// import * as ueditor from '../../../../static/ueditor/ueditor.all2.min.js'
import CFG from '@/common/Config'
export default {
  name: 'add-user',
  data () {
    return {
      detailRuleForm: {
        id: '',
        schoolId: localStorage.getItem("userBlId") || '',
        siteId: '',
        schoolName: '',
        schoolMotto: '',
        schoolBadge: '',
        schoolBanner: '',
        schoolProvince: '',
        schoolCity: '',
        schoolArea: '',
        schoolAddress: '',
        schoolEduGroup: '',
        schoolNetUrl: '',
        schoolPlaque: '',
        contactName: '',
        contactPosition: '',
        contactPhone: '',
        isCreManaAccount: '',
        manaAccount: '',
        // schoolCtd: '',//运营人员添加学校时先不传这个字段
        optPerson: parseInt(localStorage.getItem("userId"))
      },
      rules: {
        schoolName: [{
          required: true,
          message: '请输入学校名称',
          trigger: 'blur'
        }],
        schoolMotto: [{
          required: true,
          message: '请输入校训',
          trigger: 'blur'
        }],
        schoolBadge: [{
          required: true,
          message: '请上传校徽',
          trigger: 'change'
        }],
        schoolBanner: [{
          required: true,
          message: '请上传学校banner',
          trigger: 'change'
        }],
        schoolAddress: [{
          required: true,
          message: '请输入学校地址',
          trigger: 'blur'
        }],
        siteId: [{
          required: true,
          message: '请输入所属站点',
          trigger: 'change'
        }],
        /* 
        schoolEduGroup: [{
          required: false,
          message: '请输入教育集团',
          trigger: 'blur'
        }], */
        schoolNetUrl: [{
          required: true,
          message: '请输入管网地址',
          trigger: 'blur'
        }],
        contactName: [{
          required: true,
          message: '请输入联系人信息',
          trigger: 'blur'
        }],
        contactPosition: [{
          required: true,
          message: '请输入联系人职务',
          trigger: 'blur'
        }],
        contactPhone: [{
          required: true,
          message: '请输入联系人手机号',
          trigger: 'blur'
        },
        {
          min: 11,
          max: 11,
          message: '长度11个字符',
          trigger: 'blur'
        }],
        isCreManaAccount: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }],
      },
      siteIdList: [],
      schoolBadgeList: [],
      schoolBannerList: [],
      uploadImgUrl: `${CFG.API_URL}xsnSchool/uploadSchoolFile`,
      token: ''

    }
  },
  created () {
    this.getSchoolList()
  },
  mounted () {
  },
  methods: {
    //移除
    handleRemove (file, schoolBadgeList) {
      console.log("handleRemove:----", file, schoolBadgeList);
    },//移除
    handleBannerRemove (file, schoolBannerList) {
      console.log("handleRemove:----", file, schoolBannerList);
    },
    onUploadChange (file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/gif' || 'image/png';
      const isLt1M = file.size / 1024 / 1024 < 2;

      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!');
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 2MB!');
      }
      return isIMAGE && isLt1M;

    },
    uploadSucc (response, file, schoolBadgeList) {
      // console.log("fileSuccess:=====",response)
      if (response.retCode === "00000") {
        this.detailRuleForm.schoolBadge = response.vo.uploadUri
        this.schoolBadgeList = schoolBadgeList
      }
    },
    onUploadBannerChange (file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/gif' || 'image/png';
      const isLt1M = file.size / 1024 / 1024 < 2;

      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!');
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 2MB!');
      }
      return isIMAGE && isLt1M;

    },
    uploadBannerSucc (response, file, schoolBannerList) {
      // console.log("fileSuccess:=====",response)
      if (response.retCode === "00000") {
        this.detailRuleForm.schoolBanner = response.vo.uploadUri
        this.schoolBannerList = schoolBannerList
      }
    },
    getSchoolList () {

      // if (this.detailRuleForm.id) {
      //进入编辑详情页面的查看详情接口
      optSchoolService.getEditSchoolList(parseInt(this.detailRuleForm.schoolId)).then((result) => {
        if (result.retCode === '00000') {
          // console.log("getUser:====", result)

          this.detailRuleForm = result.vo
          if (result.vo.schoolCtd !== null) {
            if (result.vo.schoolBadge === '' || result.vo.schoolBadge === null) {
              this.schoolBadgeList = []
            } else {
              this.schoolBadgeList = [{
                name: "已上传校徽",
                url: result.vo.schoolBadge
              }]
            }

            if (result.vo.schoolBanner === '' || result.vo.schoolBanner === null) {
              this.schoolBannerList = []
            } else {
              this.schoolBannerList = [{
                name: "已上传banner",
                url: result.vo.schoolBanner
              }]
            }
          } else {
            this.detailRuleForm.id = ''
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
      /* } else {    //addSchool
        optSchoolService.getSiteList().then((result) => {
          if (result.retCode === '00000') {
            // console.log("getUser:====", result)
            this.siteIdList = result.voList
 
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
      } */

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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const schoolDetailForm = {
            id: this.detailRuleForm.id,
            schoolId: this.detailRuleForm.schoolId,
            schoolName: this.detailRuleForm.schoolName,
            schoolMotto: this.detailRuleForm.schoolMotto,
            schoolBadge: this.detailRuleForm.schoolBadge,
            schoolBanner: this.detailRuleForm.schoolBanner,
            schoolProvince: this.detailRuleForm.schoolProvince,
            schoolCity: this.detailRuleForm.schoolCity,
            schoolArea: this.detailRuleForm.schoolArea,
            schoolAddress: this.detailRuleForm.schoolAddress,
            siteId: this.detailRuleForm.siteId,
            schoolEduGroup: this.detailRuleForm.schoolEduGroup,
            schoolNetUrl: this.detailRuleForm.schoolNetUrl,
            contactName: this.detailRuleForm.contactName,
            contactPosition: this.detailRuleForm.contactPosition,
            contactPhone: this.detailRuleForm.contactPhone,
            isCreManaAccount: this.detailRuleForm.isCreManaAccount,
            manaAccount: this.detailRuleForm.manaAccount,
            optPerson: parseInt(localStorage.getItem("userId")),
            token: this.token
          }
          console.log("articleDetailForm:====", schoolDetailForm)


          optSchoolService.addEditSchool(schoolDetailForm).then((result) => {
            if (result.retCode === '00000') {
              this.$message({
                message: '学校编辑成功',
                type: 'success'
              })
              // this.$router.replace('/school/basic')
              location.reload()
            } else {
              this.$message({
                message: result.retInfo || '学校编辑失败，请重试',
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
    reFresh () {
      window.location.reload()    }
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
