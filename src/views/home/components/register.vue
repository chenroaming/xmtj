<template>
  <div class="login-wrapper">
    <el-button round size="small" @click="showModal">注册</el-button>
    <el-dialog
      :close-on-click-modal="false"
      width="500px"
      title="注册"
      append-to-body
      :visible.sync="dialogFormVisible"
    >
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
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { register, phoneCode } from '@/api/user/user'
import { validPhone, validIDCard } from '@/utils/validate'
const checkIdCard = (rule, value, callback) => {
  if (!validIDCard(value)) {
    return callback(new Error('请输入正确的身份证号'))
  } else {
    callback()
  }
}
// 验证手机号
const validatePhone = (rule, value, callback) => {
  if (!validPhone(value)) {
    callback(new Error('手机号码格式不正确'))
  } else {
    callback()
  }
}
export default {
  components: {
  },
  props: {

  },
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
        phone: [{ validator: validatePhone, trigger: ['change', 'blur'] }],
        code: [{ required: true, message: '请输入验证码', trigger: ['change', 'blur'] }],
        password: [{ required: true, message: '请输入密码', trigger: ['change', 'blur'] }],
        password2: [{ required: true, message: '请输入密码', trigger: ['change', 'blur'] }]
      },
      codeText: '获取验证码',
      isLoading: false,
      dialogFormVisible: false
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    showModal() {
      this.dialogFormVisible = true
    },
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
            this.dialogFormVisible = false
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

<style scoped lang="scss">
.login-wrapper {
  display: inline-block;
  margin-left: 10px;
}
.log-btn {
  width: 100%;
}
.smalltxt {
  position: absolute;
  right: 10px;
  top: 0;
  a {
    color: #606266;
  }
}
</style>
