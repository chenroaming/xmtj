import { SYS_NAME } from '@/utils/constVal'
import { userInfo, getLoginId, loginOut } from '@/api/user/user'
const app = SYS_NAME
const user_Info = app + '-userInfo'
const user_role = app + '-userRole'
const user_loginId = app + '_loginId'
const user = {
  state: {
    userRole: localStorage.getItem(user_role)
      ? JSON.parse(localStorage.getItem(user_role))
      : '', // 用户角色
    userInfo: localStorage.getItem(user_Info)
      ? JSON.parse(localStorage.getItem(user_Info))
      : '', // 用户个人信息,
    loginId: localStorage.getItem(user_loginId)
      ? JSON.parse(localStorage.getItem(user_loginId))
      : '' // 登陆ID,
  },
  mutations: {
    // 保存用户个人信息
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_USERROLE: (state, role) => {
      state.userRole = role
    },
    SET_LOGINID: (state, role) => {
      state.loginId = role
    }
  },
  getters: {
    getUserInfo: state => state.userInfo, // 获取用户个人信息
    getUserRole: state => state.userRole, // 获取用户个人角色
    getLoginId: state => state.loginId
  },
  actions: {
    GetUserInfo({ commit }) {
      return new Promise((resolve) => {
        userInfo().then(res => {
          if (res.state == 100) {
            const data = res
            localStorage.setItem(user_Info, JSON.stringify(data))
            commit('SET_USERINFO', data)
          } else {
            localStorage.removeItem(user_Info)
            localStorage.removeItem(user_role)
            localStorage.removeItem(user_loginId)
          }
          resolve(res)
        })
      })
    },
    GetLoginId({ commit }) {
      return new Promise((resolve) => {
        getLoginId().then(res => {
          if (res.state == 100) {
            const data = res.loginId
            localStorage.setItem(user_loginId, JSON.stringify(data))
            commit('SET_LOGINID', data)
          } else {
            localStorage.removeItem(user_Info)
            localStorage.removeItem(user_role)
            localStorage.removeItem(user_loginId)
          }
          resolve(res)
        })
      })
    },
    // 退出登录
    LogOut() {
      return new Promise((resolve, reject) => {
        loginOut()
          .then(() => {
            localStorage.removeItem(user_Info)
            localStorage.removeItem(user_role)
            localStorage.removeItem(user_loginId)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
export default user
