<template>
  <div class="register">
    <div class="register-box2">
      <img src="../../../assets/images/logo.png" class="logo" alt="">
      <p class="title2">注册账户</p>
      <div class="loginBox" @keydown.enter="submitForm">
        <div class="form-wrapper">
          <el-form
            ref="registerForm"
            :model="registerForm"
            :rules="loginRules"
            status-icon
            class="demo-ruleForm"
          >
            <el-form-item prop="phone">
              <el-input
                v-model="registerForm.phone"
                type="text"
                auto-complete="off"
                placeholder="请输入手机号码"
              />
            </el-form-item>
            <el-form-item prop="code" style="position: relative;">
              <el-input
                v-model="registerForm.code"
                auto-complete="off"
                placeholder="请输入验证码"
              />
              <div class="smalltxt">
                <el-button type="primary" size="mini" :disabled="isLoading" @click="getCode">{{ codeText }}</el-button>
              </div>
            </el-form-item>
            <el-form-item prop="name">
              <el-input
                v-model="registerForm.name"
                type="text"
                placeholder="请输入姓名"
              />
            </el-form-item>
            <el-form-item prop="idCard">
              <el-input
                v-model="registerForm.idCard"
                type="text"
                placeholder="请输入身份证号"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="registerForm.password"
                type="password"
                auto-complete="off"
                show-password
                placeholder="请输入新密码"
              />
            </el-form-item>
            <el-form-item prop="password2">
              <el-input
                v-model="registerForm.password2"
                type="password"
                auto-complete="off"
                show-password
                placeholder="确认密码"
              />
            </el-form-item>
            <el-form-item class="btn-wrapper">
              <el-button type="primary" class="log-btn" @click="submitForm()">注册</el-button>
              <!-- <el-button class="reg-btn">注册</el-button> -->
            </el-form-item>
            <el-form-item class="check-wrapper">
              <span @click="goLogin">已有账号，去登录></span>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register, phoneCode } from '@/api/user/user'
import { validIDCard } from '@/utils/validate'
const checkIdCard = (rule, value, callback) => {
  if (!validIDCard(value)) {
    return callback(new Error('请输入正确的身份证号'))
  } else {
    callback()
  }
}
export default {
  name: 'Register',
  data() {
    return {
      registerForm: {
        name: '',
        phone: '',
        code: '',
        password: '',
        password2: '',
        idCard: ''
      },
      loginRules: {
        name: [{ required: true, message: '请输入姓名', trigger: ['change', 'blur'] }],
        idCard: [{ validator: checkIdCard, trigger: ['change', 'blur'] }],
        phone: [{ required: true, message: '请输入手机号码', trigger: ['change', 'blur'] }],
        code: [{ required: true, message: '请输入验证码', trigger: ['change', 'blur'] }],
        password: [{ required: true, message: '请输入密码', trigger: ['change', 'blur'] }],
        password2: [{ required: true, message: '请输入密码', trigger: ['change', 'blur'] }]
      },
      codeText: '获取验证码',
      isLoading: false
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    submitForm() {
      if (this.registerForm.password !== this.registerForm.password2) {
        return this.$message.warning('两次输入的密码不一致！')
      }
      this.$refs['registerForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        register(this.registerForm).then(res => {
          if (res.state === 100) {
            this.$message.success(res.message)
            this.$router.push({ path: '/login' })
          }
        })
      })
    },
    goLogin() {
      this.$router.push({ path: '/login' })
    },
    getCode() {
      if (!this.registerForm.phone) {
        this.$message.error('请先输入手机号码')
        return
      }
      const params = {
        phone: this.registerForm.phone
      }
      phoneCode(params).then(res => {
        this.isLoading = true
        if (res.state === 100) {
          this.$message.success(res.message)
          let count = 60
          const timer = setInterval(() => {
            count--
            this.codeText = `${count}s`
            if (count < 1) {
              this.codeText = '获取验证码'
              this.isLoading = false
              clearInterval(timer)
            }
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang = "scss">
  .register {
    width: 100vw;
    height: 100vh;
    background: url('../../../assets/images/bg2.png') no-repeat;
    background-size: 100% 100%;
    background-attachment: #fff;
    position: relative;
    .register-box2 {
      width: 80%;
      height: 75%;
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border-radius: 10px;
      .logo {
        display: inline-block;
        width: 225px;
        height: 40px;
        position: absolute;
        top: 24px;
        left: 10px;
      }
    }
  }
  .title2 {
    font-size: 28px;
    font-weight: bold;
    color: #1F92F1;
    margin-top: 3%;
    text-align: center;
  }
  .loginBox {
    padding: 3vh 5vw 0 5vw;

    .title {
      color: #000;
      font-size: 32px;
      font-weight: 600;
    }

    .el-form {
      width: 340px;
      display: inline-block;

      .el-input__inner {
        border: none;
        border-bottom: 1px solid #EBEBF0;
      }

      .el-input__inner::placeholder {
        color: #4D4C65;
      }

      .check-wrapper {
        cursor: pointer;
        overflow: hidden;
        padding-top: 20px;
        text-align: center;
        color: #F7860B;
        font-weight: bold;
        .checkBox {
          float: left;
          margin-left: 6px;

          .el-checkbox__inner {
            border-color: #808495;
          }
        }
      }

      .log-btn {
        width: 300px;
        color: #fff;
        float: left;
        margin-left: 20px;
      }

      .reg-btn {
        width: 150px;
        border-color: #115EFB;
        color: #115EFB;
        float: right;
        margin-right: 6px;
      }
    }

    .prompt1 {
      font-size: 12px;
      margin-top: 15vh;

      a {
        margin-left: 20px;
      }
    }
  }
  .form-wrapper {
    text-align: center;
  }
  .smalltxt {
    position: absolute;
    right: 33px;
    top: 0;
    a {
      color: #606266;
    }
  }
</style>
