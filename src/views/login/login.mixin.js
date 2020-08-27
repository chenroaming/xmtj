import md5 from 'md5'
import { SYS_NAME } from '@/utils/constVal'
import { login, forgetPwdCode, forgetPwd } from '@/api/user/user'
import modal from '@/components/modal/modal'
export default {
  components: {
    modal
  },
  data() {
    return {
      smdl: true,
      remenberCheck: false,
      loginRules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      },
      loginLoading: false,
      selectRoleShow: false,
      roleList: [],
      isSubmit: true,
      modalVisible: false,
      pwdParam: {
        phone: '',
        code: '',
        pwd1: '',
        pwd2: ''
      },
      codeTxt: '获取手机验证码',
      interval: null,
      getCodeTime: 60,
      isLoading: false
    }
  },
  mounted() {
    // 判断是否有记住密码
    const username = localStorage.getItem(this.local_username)
    const password = localStorage.getItem(this.local_userpwd)
    if (username) {
      this.loginForm.username = username // 获取记住的密码填入
      this.loginForm.password = password
      this.remenberCheck = true
    }
  },
  methods: {
    // 提交登录
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        // 格式规范校验成功
        if (valid) {
          // 判断记住用户名是否被勾选
          this.isLoading = true
          if (this.remenberCheck) {
            window.localStorage.setItem(this.local_username, this.loginForm.username)
            window.localStorage.setItem(this.local_userpwd, this.loginForm.password)
          }
          // 处理提交内容
          const sendData = JSON.parse(JSON.stringify(this.loginForm))
          sendData.password = md5(sendData.password)
          this.loginLoading = true
          this.$Message.loading({
            content: '正在登陆，请稍后...',
            duration: 0
          })
          login(sendData).then(res => {
            if (res.state === 100) {
              this.$store.dispatch('GetLoginId')
              this.$Message.destroy()
              this.getRole(res.roleType)
              if (res.roleType === 3) { // 区分当事人和机构
                this.$router.push('/litigant')
              } else {
                this.$router.push('/otherHome')
              }
            } else {
              this.$Message.destroy()
            }
          })
            .finally(() => { this.isLoading = false })
        } else {
          this.$message.error('请完善登录信息后登录！') // 登录失败提示错误
          return false
        }
      })
    },
    remenberCheckChange(val) {
      if (!val) {
        window.localStorage.removeItem(this.local_username)
        window.localStorage.removeItem(this.local_userpwd)
      }
    },
    getRole(role) {
      const app = SYS_NAME
      const user_roles = app + '-userRole'
      // localStorage.setItem(user_Info, JSON.stringify(roles), 60); //60为 1分钟
      localStorage.setItem(user_roles, JSON.stringify(role))
      this.$store.commit('SET_USERROLE', role)
    },
    // 忘记密码
    getpwd() {
      console.log(111)
      this.$router.push({ path: '/forget' })
      // this.modalVisible = true
    },
    changeModalVisible() {
      this.modalVisible = false
    },
    // 获取验证码
    getCode() {
      if (!this.pwdParam.phone) {
        this.$message({
          showClose: true,
          message: '请输入手机号',
          type: 'error'
        })
        return
      }
      const phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (phoneReg.test(this.pwdParam.phone) === false) {
        this.$message({
          showClose: true,
          message: '手机号码格式不正确',
          type: 'error'
        })
        return
      }
      if (this.codeTxt != '获取手机验证码') {
        return
      }
      forgetPwdCode({ phone: this.pwdParam.phone }).then(res => {
        if (res.state == 100) {
          this.interval = setInterval(() => {
            this.codeTxt = `${this.getCodeTime--}秒后可以重新发送`
            if (this.getCodeTime < 0) {
              clearInterval(this.interval)
              this.codeTxt = '获取手机验证码'
              this.getCodeTime = 60
            }
          }, 1000)
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
        }
      })
    },
    // 提交忘记密码
    submitPwd() {
      if (!this.pwdParam.phone) {
        this.$message({
          showClose: true,
          message: '请输入手机号',
          type: 'error'
        })
        return
      }
      if (!this.pwdParam.code) {
        this.$message({
          showClose: true,
          message: '请输入验证码',
          type: 'error'
        })
        return
      }
      if (!this.pwdParam.pwd1) {
        this.$message({
          showClose: true,
          message: '请输入新密码',
          type: 'error'
        })
        return
      }
      if (!this.pwdParam.pwd1) {
        this.$message({
          showClose: true,
          message: '请输入确认密码',
          type: 'error'
        })
        return
      }
      const params = {
        phone: this.pwdParam.phone,
        code: this.pwdParam.code,
        pwd1: md5(this.pwdParam.pwd1),
        pwd2: md5(this.pwdParam.pwd2)
      }
      forgetPwd(params).then(res => {
        if (res.state == 100) {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'success'
          })
          this.modalVisible = false
        }
      })
    }
  }
}
