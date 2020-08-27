import axiosConfig from '@/utils/axios.js'
import Qs from 'qs'
// 创建正式用例接口基础配置
const service = axiosConfig.ajax()

// 用户登录
export const login = params => {
  params.placeType = 1 // 区分登陆石狮1仓山2
  return service({
    url: '/main/login.jhtml',
    method: 'post',
    params
  })
}

// 查看用户信息
export const userInfo = () => {
  return service({
    url: '/main/getUserInfo.jhtml',
    method: 'get'
  })
}

// 获取登陆ID
export const getLoginId = () => {
  return service({
    url: '/court/group/getLoginId.jhtml',
    method: 'get'
  })
}

// 退出
export const loginOut = () => {
  return service({
    url: '/main/loginOut.jhtml',
    method: 'get'
  })
}

// 获取验证码
export const forgetPwdCode = params => {
  return service({
    url: '/main/forgetPwdCode.jhtml',
    method: 'post',
    data: params
  })
}
// 忘记密码提交
export const forgetPwd = params => {
  return service({
    url: '/main/forgetPwd.jhtml',
    method: 'post',
    data: params
  })
}
// 重置密码
export const modifyPassword = params => {
  return service({
    url: '/main/modifyPassword.jhtml',
    method: 'post',
    data: params
  })
}

// 获取手机验证码
export function phoneCode(data) {
  return service({
    url: '/main/phoneCode.jhtml',
    method: 'post',
    data: Qs.stringify({ ...data })
  })
}

// 注册
export function register(data) {
  return service({
    url: '/user/regist.jhtml',
    method: 'post',
    data: data
  })
}

// 获取手机验证码
export function forgetPwd2(data) {
  return service({
    url: '/user/forgetPwd.jhtml',
    method: 'post',
    data: data
  })
}
