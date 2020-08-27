<template>
  <div class="login-wrapper">
    <el-button type="primary" round size="small" @click="showModal">登录</el-button>
    <el-dialog
      :close-on-click-modal="false"
      width="500px"
      title="登陆"
      append-to-body
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="loginForm" class="form-content" :model="loginForm" :rules="loginRules">
        <el-form-item label="账号" prop="username" :label-width="formLabelWidth">
          <el-input v-model="loginForm.username" type="text" />
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>
        <el-form-item class="check-wrapper">
          <div class="checkBox">
            <el-checkbox v-model="remenberCheck" @change="remenberCheckChange">记住我</el-checkbox>
          </div>
          <div class="smalltxt">
            <a class="a" @click="getpwd">忘记密码?</a>
          </div>
        </el-form-item>
        <el-form-item class="btn-wrapper">
          <el-button class="log-btn" type="primary" :loading="isLoading" @click="submitForm()">登录</el-button>
          <!-- <el-button class="reg-btn">注册</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>
    <forget :for-get-visible.sync="forGetVisible" />
  </div>
</template>

<script>
import loginMixin from './login.mixin'
import { SYS_NAME } from '@/utils/constVal'
import forget from './forget'
export default {
  components: {
    forget
  },
  mixins: [loginMixin],
  props: {

  },
  data() {
    return {
      local_username: `${SYS_NAME}_userName`, // 记住账号密码时localstorage保存的账号键名
      local_userpwd: `${SYS_NAME}_userPwd`, // 记住账号密码时localstorage保存的密码键名
      loginForm: {
        // 登陆用户信息
        username: localStorage.getItem(this.local_username) || '',
        password: localStorage.getItem(this.local_userpwd) || ''
      },
      remenberCheck: false,
      dialogFormVisible: false,
      formLabelWidth: '60px',
      forGetVisible: false
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 显示登陆模态框
    showModal() {
      this.dialogFormVisible = true
    },
    // 忘记密码
    getpwd() {
      this.forGetVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.login-wrapper {
  display: inline-block;
  margin-left: 10px;
}
.check-wrapper {
  margin-top: -15px;
  .checkBox {
    float: left;
    margin-left: 10px;
  }
  .smalltxt {
    float: right;
  }
}
.log-btn {
  width: 100%;
}
::v-deep .el-dialog__body {
  padding: 30px 50px;
}
</style>
