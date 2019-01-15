<template>
  <div class="detail_wrap">
    <el-form :model="userRuleForm"
             :rules="rules"
             ref="userRuleForm"
             label-width="130px"
             class="demo-userRuleForm">
      <div class="form-block">
        <h2 class="form-title">{{userRuleForm.id ? '编辑' :'添加'}}话题</h2>
      </div>
      <el-form-item label="内容类型"
                    prop="conType">
        <el-radio-group v-model="userRuleForm.conType">
          <el-radio :label="3">站内文章</el-radio>
          <el-radio :label="6">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="推荐站点"
                    prop="roleType">
        <el-select v-model="userRuleForm.roleType"
                   placeholder="请选择">
          <el-option label="学校用户"
                     value="school"></el-option>
          <el-option label="地方频道用户"
                     value="channel"></el-option>
          <el-option label="系统用户"
                     value="systemUser"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推荐内容频道"
                    prop="roleType">
        <el-select v-model="userRuleForm.roleType"
                   placeholder="请选择">
          <el-option label="学校用户"
                     value=""></el-option>
          <el-option label="地方频道用户"
                     value=""></el-option>
          <el-option label="系统用户"
                     value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="序号"
                    prop="roleType">
        <el-select v-model="userRuleForm.roleType"
                   placeholder="请选择">
          <el-option label="学校用户"
                     value=""></el-option>
          <el-option label="地方频道用户"
                     value=""></el-option>
          <el-option label="系统用户"
                     value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章ID"
                    prop="ID"
                    hide-required-asterisk="false">
        <el-input v-model="userRuleForm.ID"></el-input>
      </el-form-item>
      <el-form-item label="文章标题"
                    prop="title"
                    hide-required-asterisk="false">
        <el-input v-model="userRuleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="所属栏目"
                    prop="roleType">
        <el-select v-model="userRuleForm.roleType"
                   placeholder="请选择">
          <el-option label="学校用户"
                     value=""></el-option>
          <el-option label="地方频道用户"
                     value=""></el-option>
          <el-option label="系统用户"
                     value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="摘要"
                    prop="intro"
                    hide-required-asterisk="false">
        <el-input type="textarea"
                  v-model="userRuleForm.intro"></el-input>
      </el-form-item>
      <el-form-item label="推荐状态"
                    prop="roleType">
        <el-select v-model="userRuleForm.roleType"
                   placeholder="请选择">
          <el-option label="学校用户"
                     value=""></el-option>
          <el-option label="地方频道用户"
                     value=""></el-option>
          <el-option label="系统用户"
                     value=""></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('userRuleForm')">提交</el-button>
        <el-button @click="resetForm('userRuleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'add-user',
  data () {
    return {
      userRuleForm: {
        id: this.$route.query.id,
        conType: '',
        intro: '',
        roleType: '',
        intro: ''
      },
      rules: {
        conType: [{
          required: true,
          message: '请选择内容类型',
          trigger: 'blur'
        }],
        intro: [{
          required: true,
          message: '请输入角色描述',
          trigger: 'blur'
        }],
        roleType: [{
          required: true,
          message: '请选择角色类型',
          trigger: 'change'
        }],
        access: [{
          type: 'array',
          required: true,
          message: '请至少选择一个用户角色',
          trigger: 'change'
        }]
      }
    }
  },
  created () { },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  },
  components: {}
}
</script>

<style lang="stylus">
.form-block {
  padding-bottom: 20px;
}
</style>
