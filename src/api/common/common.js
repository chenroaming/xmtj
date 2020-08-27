import axiosConfig from '@/utils/axios.js'
// 创建正式用例接口基础配置
const service = axiosConfig.ajax()

// 获取机构（没过权限）
export function getMediater(params = {}) { // courtType 0是分流中心 ，1是联动单位，3是解纷组织
  // params.courtType = 1
  // params.pageSize = 100
  return service({
    url: '/court/view/getMediater.jhtml',
    method: 'get',
    params
  })
}

// 获取案由
export function brief(params) {
  return service({
    url: '/court/case/getBrief.jhtml',
    method: 'GET',
    params
  })
}

// 获取解纷人员
export function getMediaterUser(params) {
  return service({
    url: '/court/mediateter/getMByCId.jhtml',
    method: 'GET',
    params
  })
}



// 获取机构信息
export function getCourtInfo(params) {
  return service({
    url: '/court/court/getCourtInfo.jhtml',
    method: 'GET',
    params
  })
}

// 根据id获取当前用户信息
export function getAdminInfoById(params) {
  return service({
    url: '/main/getAdminInfoById.jhtml',
    method: 'GET',
    params
  })
}

// 获取智慧研判内容
export function char1(params) {
  return service({
    url: '/court/view/char1.jhtml',
    method: 'post',
    params
  })
}

// 获取机构数据（过权限）
export function getMediater1(params = {}) { // courtType 0是分流中心 ，1是联动单位，3是解纷组织
  params.pageSize = 100
  return service({
    url: '/court/mediateter/getMediater.jhtml',
    method: 'get',
    params
  })
}
