<template>
  <div class="detail_wrap">
    <el-form :model="detailRuleForm"
             :rules="rules"
             ref="detailRuleForm"
             label-width="90px"
             class="demo-detailRuleForm">
      <div class="form-block">
        <h2 class="form-title">{{detailRuleForm.id ? '编辑' :'添加'}}文章</h2>
      </div>
      <el-form-item label="文章名称"
                    prop="articleTitle">
        <el-input v-model.trim="detailRuleForm.articleTitle"></el-input>
      </el-form-item>
      <el-form-item label="副标题"
                    prop="subTitle">
        <el-input v-model.trim="detailRuleForm.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="作者"
                    prop="author">
        <el-input v-model.trim="detailRuleForm.author"></el-input>
      </el-form-item>
      <el-form-item label="转自"
                    prop="reprintFrom"
                    hide-required-asterisk="false">
        <el-input v-model.trim="detailRuleForm.reprintFrom"></el-input>
      </el-form-item>

      <el-form-item label="摘要"
                    prop="summary">
        <el-input type="textarea"
                  :rows="4"
                  v-model.trim="detailRuleForm.summary"></el-input>
      </el-form-item>
      <el-form-item label="相关话题"
                    prop="articleTopic">
        <el-input v-model.trim="detailRuleForm.articleTopic"></el-input>
      </el-form-item>

      <el-form-item v-if="userType===1"
                    label="所属站点"
                    prop="siteId">
        <el-select v-model="detailRuleForm.siteId"
                   placeholder="请选择">
          <el-option v-for="item in siteIdList"
                     :key="item.id"
                     :label="item.siteName"
                     :checked="item.checked"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容分类"
                    prop="subjectId">
        <el-select v-model="detailRuleForm.subjectId"
                   placeholder="请选择">
          <el-option v-for="item in subjectList"
                     :key="item.id"
                     :label="item.subjectName"
                     :checked="item.checked"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键词"
                    prop="keyWords"
                    hide-required-asterisk="false">
        <el-input v-model.trim="detailRuleForm.keyWords"></el-input>
      </el-form-item>
      <el-form-item label="封面图"
                    prop="coverImg"
                    hide-required-asterisk="false">
        <!-- <el-input v-model="detailRuleForm.coverImg"></el-input> -->
        <el-upload class="upload-demo"
                   :action="uploadImgUrl"
                   v-model="detailRuleForm.coverImg"
                   :limit="1"
                   accept="image/jpeg,image/jpeg,image/gif,image/png"
                   enctype="multipart/form-data"
                   :on-change="onUploadChange"
                   :on-success="uploadSucc"
                   :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :file-list="fileList"
                   list-type="picture">
          <el-button size="small"
                     type="primary">点击上传</el-button>
          <div slot="tip"
               class="el-upload__tip">只能上传jpeg/jpg/png/gif格式的图片，且不超过5M</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="内容"
                    prop="content"
                    class="ueditor_wrap">
        <vue-ueditor-wrap v-model.trim="detailRuleForm.content"
                          :destroy="true"
                          ref="editor"
                          mode="observer"
                          :observerDebounceTime="100"
                          :observerOptions="{ attributes: true, characterData: true, childList: true, subtree: true }"
                          :config="myConfig"
                          @ready="ready"></vue-ueditor-wrap>
        <!-- <div id="ueditor"
               type="text/plain"></div> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('detailRuleForm')">提交</el-button>
        <router-link :to="{path:'list'}">
          <el-button @click="resetForm('detailRuleForm')">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import optConService from '../../../common/service/optConManaService'
import commonService from '../../../common/service/commonService'
import VueUeditorWrap from 'vue-ueditor-wrap'
// import * as ueditor from '../../../../static/ueditor/ueditor.all2.min.js'
import CFG from '@/common/Config'
export default {
  name: 'add-user',
  data () {
    return {
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 540,
        // 初始容器宽度
        initialFrameWidth: '900',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: `${CFG.API_URL}ueditor/jsp/controller.jsp`,
        // UEditor 资源文件存放的根目录，如果你使用的是 vue-cli 3.x，设置为'/UEditor/'（参考下方的常见问题2）
        UEDITOR_HOME_URL: '/static/UEditor/',
        //通过 imageUrlPrefix 配置项给返回路径添加前缀
        // imageUrlPrefix: "http://local.cnypa.vocy.cn",

        toolbars: [
          ['fullscreen', 'source', 'undo', 'redo',
            'bold', //加粗
            'indent', //首行缩进
            //'italic', //斜体
            //'strikethrough', //删除线
            'forecolor', //字体颜色
            'justifyleft', //居左对齐
            'justifyright', //居右对齐
            'justifycenter', //居中对齐
            'justifyjustify', //两端对齐
            //'source', //源代码
            'simpleupload', //单图上传
            'insertimage', //多图上传
            'insertvideo', //视频
            'link', //超链接
            'unlink', //取消链接 
            //'selectall', //全选
            //'horizontal', //分隔线
            'pasteplain', //纯文本粘贴模式
            'removeformat', //清除格式
          ],
          [
            'underline', //下划线
            'blockquote', //引用
            'insertorderedlist', //有序列表
            'insertunorderedlist', //无序列表        
            'rowspacingtop', //段前距
            'rowspacingbottom', //段后距
            'fontfamily', //字体
            'fontsize', //字号
            'paragraph', //段落格式
            'spechars', //特殊字符
            //'pagebreak', //分页
            //'imagenone', //默认
            //'imageleft', //左浮动
            //'imageright', //右浮动
            //'imagecenter', //居中
            //'wordimage', //图片转存
            'edittip ', //编辑提示
            'autotypeset', //自动排版
            //'template', //模板
          ]
        ]
      },
      detailRuleForm: {
        id: this.$route.query.id || '',
        articleTitle: '',
        subTitle: '',
        author: '',
        reprintFrom: '',
        summary: '',
        articleTopic: '',
        siteId: '',
        subjectId: '',
        keyWords: '',
        coverImg: '',
        content: ''
      },
      rules: {
        articleTitle: [{
          required: true,
          message: '请输入文章名称',
          trigger: 'blur'
        }],
        subTitle: [{
          required: true,
          message: '请输入文章副标题名称',
          trigger: 'blur'
        }],
        author: [{
          required: true,
          message: '请输入文章作者信息',
          trigger: 'blur'
        }],
        reprintFrom: [{
          required: true,
          message: '请输入转载信息',
          trigger: 'blur'
        }],
        summary: [{
          required: false,
          message: '请输入文章摘要',
          trigger: 'blur'
        }],
        articleTopic: [{
          required: false,
          message: '请输入话题名称',
          trigger: 'blur'
        }],
        siteId: [{
          required: true,
          message: '请选择所属站点',
          trigger: 'change'
        }],
        subjectId: [{
          required: true,
          message: '请选择内容分类',
          trigger: 'change'
        }],
        keyWords: [{
          required: true,
          message: '请输入关键词',
          trigger: 'blur'
        }],
        coverImg: [{
          required: true,
          message: '请上传封面图',
          trigger: 'change'
        }],
        content: [{
          required: true,
          message: '请输入文章内容',
          trigger: 'blur'
        }]
      },
      siteIdList: [],
      subjectList: [],
      fileList: [],
      uploadImgUrl: `${CFG.API_URL}xsnArticle/uploadArticleFile`,
      token: '',
      userType: parseInt(localStorage.getItem("userType")),
      checkedSite: []
    }
  },
  created () {
    this.getSiteSubjectList()
    this.disableBack()
    // console.log("CFG:==", CFG)
  },
  mounted () {
    // location.reload()
  },
  methods: {
    //移除
    handleRemove (file, fileList) {
      console.log("handleRemove:----", file, fileList);
    },
    handlePreview (file) {
      console.log("handlePreview:====", file);
    },
    onUploadChange (file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/gif' || 'image/png';
      const isLt1M = file.size / 1024 / 1024 < 5;

      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!');
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 5MB!');
      }
      return isIMAGE && isLt1M;

    },
    uploadSucc (response, file, fileList) {
      // console.log("fileSuccess:=====",response)
      // console.log("fileList:===", fileList)
      if (response.retCode === "00000") {
        this.detailRuleForm.coverImg = response.vo.uploadUri
        this.fileList = fileList
      }

    },
    getSiteSubjectList () {

      //获取token
      commonService.getToken().then((response) => {
        // console.log("addSite:=====", response)
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

      if (this.detailRuleForm.id) {
        //进入编辑文章详情页面的查看文章详情接口
        optConService.getEditArtiList(parseInt(this.detailRuleForm.id)).then((result) => {
          if (result.retCode === '00000') {
            // console.log("getUser:====", result)

            this.detailRuleForm = result.vo
            this.detailRuleForm.content = result.vo.content.content
            //获取站点列表
            this.siteIdList = result.vo.xsiteList
            //获取内容分类列表
            this.subjectList = result.vo.xsubList
            if (result.vo.coverImg === '') {
              this.fileList = []
            } else {
              this.fileList = [{
                name: "已上传封面",
                url: result.vo.coverImg
              }]
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
      } else { //addArticle

        let userType = JSON.parse(localStorage.getItem('userType')) || '' //userType=1是系统用户 userType=2是学校用户 userType=3是地主站点用户 
        let userBlId = JSON.parse(localStorage.getItem('userBlId')) || ''
        if (userType === 2) {
          let schParams = {
            schoolId: userBlId,
            isArticleAdd: 1
          }
          //学校用户获取内容分类下拉列表
          optConService.getSchSubjectList(schParams).then((result) => {
            if (result.retCode === '00000') {
              this.subjectList = result.voList
            }
          })
        }
        if (userType === 3 || userType === 1) {
          let isChannelPop = 1
          optConService.getSiteList().then((result) => {
            if (result.retCode === '00000') {
              this.siteIdList = result.voList
              let checkedSiteId = result.voList.filter(item => {
                return item.id === userBlId
              })
              // console.log("checkedSiteId:===", checkedSiteId[0].siteName)
              if (userType === 3) {
                this.detailRuleForm.siteId = checkedSiteId[0].id
              }
            }
          })
          //站点或系统用户获取内容分类下拉列表
          optConService.getSubjectList({
            isChannelPop: 1
          }).then((result) => { //getSubjectList
            if (result.retCode === '00000') {
              // console.log("内容分类：===", result)
              this.subjectList = result.voList
            }
          })
        }
      }

    },
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
    ready (editorInstance) {
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance)
      console.log("UE.Editor:----", editorInstance.getContent)
      UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
      UE.Editor.prototype.getActionUrl = function (action) {
        if (action == 'uploadImg') {
          return `${CFG.API_URL}xsnArticle/uploadUeditorImg`; //本地
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
          let ueditorContent = {
            content: this.detailRuleForm.content
          }
          const articleDetailForm = {
            id: parseInt(this.$route.query.id ? this.$route.query.id : ''),
            articleType: 1,
            articleFrom: 3,
            articleTitle: this.detailRuleForm.articleTitle,
            subTitle: this.detailRuleForm.subTitle,
            author: this.detailRuleForm.author,
            reprintFrom: this.detailRuleForm.reprintFrom,
            summary: this.detailRuleForm.summary,
            articleTopic: this.detailRuleForm.articleTopic,
            siteId: this.detailRuleForm.siteId,
            subjectId: this.detailRuleForm.subjectId, //内容分类
            keyWords: this.detailRuleForm.keyWords,
            coverImg: this.detailRuleForm.coverImg,
            content: ueditorContent,
            optPerson: parseInt(localStorage.getItem("userId") || ''),
            token: this.token
            // "optPerson": JSON.parse(localStorage.getItem("userId"))
          }
          // console.log("articleDetailForm:====", articleDetailForm)
          if (this.detailRuleForm.id) {

            optConService.addEditArticle(articleDetailForm).then((result) => {
              if (result.retCode === '00000') {
                this.$message({
                  message: '文章编辑成功',
                  type: 'success',
                  onClose: () => {
                    this.$router.push('/operation/content/list')
                  }
                })
              } else {
                this.$message({
                  message: result.retInfo || '文章编辑失败，请重试',
                  type: 'error',
                  onClose: () => {
                    this.loading = false
                  }
                })
              }
            })
          } else {

            // console.log("addForm:====", articleDetailForm)
            optConService.addEditArticle(articleDetailForm).then((result) => {
              console.log("coverImg:---", this.fileList)
              if (result.retCode === '00000') {
                this.$message({
                  message: '文章新建成功',
                  type: 'success',
                  onClose: () => {
                    this.$router.push({
                      path: '/operation/content/list'
                    })
                  }
                })
              } else {
                this.$message({
                  message: result.retInfo || '文章新建失败，请重试',
                  type: 'error',
                  onClose: () => {
                    this.loading = false
                  }
                })
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      // this.$refs[formName].resetFields();
      this.$router.push('/operation/content/list')
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
