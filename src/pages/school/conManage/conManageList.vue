<template>
  <div class="list_wrap">
    <el-row type="flex">
      <el-form :model="searchData"
               ref="searchDataForm"
               :inline="true">
        <el-form-item prop="articleTitle"
                      label="文章名称">
          <el-input v-model="searchData.articleTitle"
                    placeholder="文章名称"></el-input>
        </el-form-item>
        <el-form-item prop="subjectId"
                      label="所属栏目">
          <el-select v-model="searchData.subjectId"
                     placeholder="请选择所属栏目">
            <el-option v-for="item in subjectList"
                       :key="item.id"
                       :label="item.subjectName"
                       :checked="item.checked"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="dateIngerval"
                      label="提交时间">
          <el-date-picker v-model="searchData.dateIngerval"
                          type="daterange"
                          range-separator="-"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="status"
                      label="审批状态">
          <el-select v-model="searchData.status"
                     placeholder="请选择内容分类">
            <el-option label="待审核"
                       value="0"></el-option>
            <el-option label="初审通过"
                       value="1"></el-option>
            <el-option label="审核完成"
                       value="2"></el-option>
            <el-option label="审核驳回"
                       value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="flag"
                      label="文章状态">
          <el-select v-model="searchData.flag"
                     placeholder="请选择文章状态">
            <el-option label="已删除"
                       value="0"></el-option>
            <el-option label="新建"
                       value="1"></el-option>
            <el-option label="已修改"
                       value="2"></el-option>
            <el-option label="定时发布"
                       value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="articleType"
                      label="类型">
          <el-select v-model="searchData.articleType"
                     placeholder="请选择">
            <el-option label="文章"
                       value="1"></el-option>
            <el-option label="微文章"
                       value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="id"
                      label="文章id">
          <el-input v-model="searchData.id"
                    placeholder="文章id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSearch">查询</el-button>
          <el-button @click="resetForm('searchDataForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <div class="list_wrap">
      <div class="list_t">
        <h3 class="list_t_t">文章列表</h3>
        <div class="con_btn_wrap">
          <router-link :to="{path:'detail'}">
            <el-button>添加文章</el-button>
          </router-link>
          <!-- <router-link :to="{path:'minidetail'}">
            <el-button>添加微文章</el-button>
          </router-link> -->

          <el-button type="danger"
                     @click="multiDelete">删除</el-button>
        </div>
      </div>

      <el-table ref="multipleTable"
                :data="conTableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="60">
        </el-table-column>
        <el-table-column label="ID"
                         width="60">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="文章标题"
                         width="260">
          <template slot-scope="scope">
            <a :href="'http://cnypa.vocy.cn/post/'+scope.row.id"
               target="_blank"
               class="article_a">{{ scope.row.articleTitle }}</a></template>
        </el-table-column>
        <el-table-column prop="subjectName"
                         label="所属栏目"
                         width="120">
        </el-table-column>
        <!-- <el-table-column prop="author"
                         label="作者信息"
                         show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column prop="optTime"
                         label="提交时间"
                         width="200"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="statusName"
                         label="审批状态"
                         width=""
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="flagName"
                         label="文章状态"
                         width="100"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="operate"
                         label="操作"
                         width="200">
          <template slot-scope="scope">
            <a :href="'http://cnypa.vocy.cn/preview/'+scope.row.id"
               target="_blank"
               class="article_a">
              <el-button size="mini">预览</el-button>
            </a>
            <router-link :to="{path: 'detail', query: { id: scope.row.id.toString()}}">
              <el-button size="mini">编辑</el-button>
            </router-link>
            <el-button size="mini"
                       type="danger"
                       v-model="scope.row.id"
                       @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
            <!-- @click="handleDelete(scope.$index, scope.row)" -->
            <!-- @click="delFormVisible = true,deleteArti(scope.row.id)" -->

          </template>
        </el-table-column>
      </el-table>
      <!-- 删除弹框 -->
      <el-dialog title="请选择内容删除的原因："
                 :visible.sync="delFormVisible">
        <el-form :model="delForm">
          <el-form-item label=""
                        :label-width="formLabelWidth">
            <el-radio-group v-model="delForm.reason">
              <el-radio v-for="item in reasonList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="delFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="deleteArti">确 定 删 除</el-button>
        </div>
      </el-dialog>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="searchData.currentPage"
                     :page-size="searchData.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="searchData.total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
import optConService from '../../../common/service/optConManaService'
export default {
  name: 'con-list',
  props: {
    conId: [Number, String]
  },
  data () {
    return {
      loading: false,
      searchData: {
        articleTitle: '',
        subjectId: '',
        dateIngerval: [],
        status: '',
        flag: '',
        articleType: '',
        id: '',
        sourceFrom: '',
        siteId: '',
        schoolId: '',
        optPerson: '',
        pageSize: 20,
        currentPage: 1,
        page: 1,
        total: 0,
      },
      subjectList: [],
      reasonList: [
        {
          id: '1',
          name: '垃圾营销'
        },
        {
          id: '2',
          name: '涉黄信息'
        },
        {
          id: '3',
          name: '不实信息'
        },
        {
          id: '4',
          name: '人身攻击'
        },
        {
          id: '5',
          name: '有害信息'
        },
        {
          id: '6',
          name: '抄袭内容'
        },
        {
          id: '7',
          name: '违法信息'
        },
        {
          id: '8',
          name: '其他'
        }
      ],
      delForm: {
        reason: ''
      },
      delFormVisible: false,
      formLabelWidth: '10px',
      conTableData: [],
      artiData: {
        id: 0,
        index: 0
      },//记录每一条的信息，便于取id
      delarr: [],//存放删除的数据
      multipleSelection: [],//多选的数据
    }
  },
  created () {
    this.getSiteSubjectList()
    this.getConList()
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.onSearch()
    },
    onSearch () {
      let userId = JSON.parse(localStorage.getItem('userId')) || ''
      if (this.searchData.sourceFrom === "1") {
        this.searchData.optPerson = userId
      }
      // console.log("searchData:====", this.searchData)
      this.searchData.page = 1
      this.searchData.pageSize = 20
      this.getConList()
    },
    getSiteSubjectList () {

      let userType = JSON.parse(localStorage.getItem('userType')) || ''    //userType=1是系统用户 userType=2是学校用户 userType=3是地主站点用户 
      let userBlId = JSON.parse(localStorage.getItem('userBlId')) || ''
      if (userType === 2) {
        let schParams = {
          schoolId: userBlId
          // name:''
          // isArticleAdd: 1
        }
        //学校用户获取内容分类下拉列表
        optConService.getSchSubjectList(schParams).then((result) => {
          if (result.retCode === '00000') {
            this.subjectList = result.voList
          }
        })
      } if (userType === 3 || userType === 1) {
        let isChannelPop = 1
        //站点或系统用户获取内容分类下拉列表
        optConService.getSubjectList({ isChannelPop: 1 }).then((result) => {    //getSubjectList
          if (result.retCode === '00000') {
            // console.log("内容分类：===", result)
            this.subjectList = result.voList
          }
        })
      }

    },
    //获取内容列表
    getConList () {
      this.loading = true
      let userType = JSON.parse(localStorage.getItem('userType')) || ''
      let userBlId = JSON.parse(localStorage.getItem('userBlId')) || ''
      if (userType === 2) {
        this.searchData.schoolId = userBlId
      } if (userType === 3) {
        this.searchData.siteId = userBlId
      }

      // console.log("searchData:=====", this.searchData)
      optConService.conList(this.searchData).then((response) => {
        // console.log("conList:=====", response)
        if (response.retCode === '00000') {
          this.conTableData = response.voList || []
          this.searchData.total = response.total
          //提交时间改变格式
          this.conTableData.forEach((item, index) => {
            item.optTime = this.formatTime(item.optTime)
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
      })
    },
    formatTime (createTime) {
      if (createTime) {
        var year = new Date(createTime).getFullYear();
        var month = new Date(createTime).getMonth() + 1;
        month = month < 10 ? ('0' + month) : month;
        var day = new Date(createTime).getDate();
        day = day < 10 ? ('0' + day) : day;
        var hour = new Date(createTime).getHours();
        hour = hour < 10 ? ('0' + hour) : hour;
        var minute = new Date(createTime).getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second = new Date(createTime).getSeconds();
        second = second < 10 ? ('0' + second) : second;
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
      }

    },
    // 操作多选
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 单行删除
    handleDelete (index, row) {
      console.log(index, row)
      /* this.artiData.id = id
      this.artiData.index = index */
      this.delarr.push(row.id)
      this.delFormVisible = true
    },
    //批量删除
    multiDelete () {

      this.delFormVisible = true;//显示删除弹框

      const length = this.multipleSelection.length;

      for (let i = 0; i < length; i++) {

        this.delarr.push(this.multipleSelection[i].id)   //id为表格列表每条数据的id

      }
      console.log("this.delarr:===", this.delarr)

    },
    // 确定删除

    deleteArti () {
      //删除接口

      // optConService.deleteArticle(this.artiData.id).then((response) => {

      optConService.deleteArticle(this.delarr).then((response) => {
        if (response.retCode === '00000') {
          console.log("删除文章：====", response)
          // console.log("this.artiData.index:===",this.artiData.index)
          //判断是单个删除还是多个删除
          /* if (this.delarr.length === 1) {
            this.conTableData.splice(this.artiData.index, 1)
          } else {

            this.delarr.forEach((item, i) => {
              // this.conTableData.splice(this.artiData.index, 1)
              this.conTableData.splice(i, 1)
            })
          } */
          //删除成功后再调用列表的接口
          this.getConList()
          this.$message({
            type: 'success',
            message: response.retInfo
          })

          this.loading = false
        } else {
          this.$message({
            type: 'error',
            message: response.retInfo
          })
        }
      }).catch((error) => {
        this.$message.error({
          message: error.message || '系统繁忙，请稍候再试',
          type: 'success',
          center: true,
          customClass: 'common_tip'
        })
        this.loading = false
      })

      this.delFormVisible = false;//关闭删除提示模态框

    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.searchData.pageSize = val
      this.getConList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.searchData.page = val
      this.getConList()
    },
  },
  components: {
    // listSidebar
  }
}
</script>
<style lang="stylus">
.article_a {
  color: #333;
  text-decoration: none;
}

.article_a:hover {
  color: #f56c6c;
}
</style>
