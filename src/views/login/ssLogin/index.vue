<template>
  <div id="login">
    <div class="login-box">
      <img src="../../../assets/images/logo.png" class="logo" alt="">
      <p class="title">登录账号</p>
      <div class="loginBox" @keydown.enter="submitForm">
        <div class="form-wrapper">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            status-icon
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                type="text"
                auto-complete="off"
                placeholder="请输入账号"
              />
            </el-form-item>
            <el-form-item prop="password" style="position: relative;">
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                placeholder="请输入密码"
              />
              <div class="smalltxt">
                <a class="a" @click="getpwd">忘记密码?</a>
              </div>
            </el-form-item>
            <el-form-item class="check-wrapper">
              <div class="checkBox">
                <el-checkbox v-model="remenberCheck" @change="remenberCheckChange">记住密码</el-checkbox>
              </div>
            </el-form-item>
            <el-form-item class="btn-wrapper">
              <el-button type="primary" class="log-btn" @click="submitForm()">登录</el-button>
              <!-- <el-button class="reg-btn">注册</el-button> -->
            </el-form-item>
            <el-form-item class="check-wrapper">
              <span @click="goRegister">没有账号？去注册></span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import loginMixin from '../login.mixin'
import { SYS_NAME } from '@/utils/constVal'
export default {
  name: 'Login',
  mixins: [loginMixin],
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
      title: '诉源社会治理统一服务'
    }
  },
  methods: {
    goRegister() {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>
<style lang="scss" src="./login.scss"></style>
