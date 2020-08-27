<template>
  <div id="login">
    <div class="icon-wrapper">
      <img src="@/assets/logo.png">
    </div>
    <div class="loginConbox">
      <!-- 内容 -->
      <div class="loginBox" @keydown.enter="submitForm">
        <el-row class="loginCon">
          <el-col :span="13" style="text-align: center;">
            <div class="form-wrapper">
              <div class="title">{{ title }}</div>
              <!-- <div class="title">诉源社会治理统一服务</div> -->
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
                    placeholder="账号"
                  />
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="loginForm.password"
                    type="password"
                    auto-complete="off"
                    placeholder="密码"
                  />
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
                  <el-button class="log-btn" :loading="isLoading" @click="submitForm()">登录</el-button>
                  <!-- <el-button class="reg-btn">注册</el-button> -->
                </el-form-item>
              </el-form>
            </div>

            <div class="prompt1">
              <span>请使用谷歌浏览器(69版本以上)</span>
              <a href="https://cstj.olcourt.cn//chrome/67.0.3396.62_chrome_installer_x64.exe">浏览器下载</a>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="technical-support">技术支持:厦门纵横集团</div>
    <modal
      :title="'忘记密码'"
      :modal-visible="modalVisible"
      :is-submit="isSubmit"
      @changeModalVisible="changeModalVisible"
      @submitModal="submitPwd"
    >
      <div class="form-item">
        <div class="label">手机号</div>
        <div class="input">
          <el-input v-model="pwdParam.phone" type="number" placeholder="请输入内容">
            <template slot="append">
              <div class="code" @click="getCode">{{ codeTxt }}</div>
            </template>
          </el-input>
        </div>
      </div>
      <div class="form-item">
        <div class="label">验证码</div>
        <div class="input">
          <el-input v-model="pwdParam.code" type="number" placeholder="请输入内容" />
        </div>
      </div>
      <div class="form-item">
        <div class="label">新密码</div>
        <div class="input">
          <el-input v-model="pwdParam.pwd1" type="password" placeholder="请输入内容" />
        </div>
      </div>
      <div class="form-item">
        <div class="label">确认密码</div>
        <div class="input">
          <el-input v-model="pwdParam.pwd2" type="password" placeholder="请输入内容" />
        </div>
      </div>
    </modal>
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
  }
}
</script>
<style lang="scss" src="./login.scss"></style>
