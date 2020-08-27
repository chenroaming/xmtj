import axiosConfig from '@/utils/axios.js'
import Qs from 'qs'
// 创建正式用例接口基础配置
const service = axiosConfig.ajax()

// 获取查询机构列表
export function getCourtInfoByType(params) {
  return service({
    url: '/court/court/getCourtInfoByType.jhtml',
    method: 'get',
    params
  })
}

// 获取折线图
export function searchLine(data) {
  return service({
    url: '/court/xmechar/searchLine.jhtml',
    method: 'post',
    data: Qs.stringify({ ...data })
  })
}

// 获取分流中心
export function searchUnit() {
  return service({
    url: '/court/xmechar/searchUnit.jhtml',
    method: 'post'
  })
}

// 获取收案类型
export function searchType() {
  return service({
    url: '/court/xmechar/searchType.jhtml',
    method: 'post'
  })
}

// 获取热点案由
export function searchReason() {
  return service({
    url: '/court/xmechar/searchReason.jhtml',
    method: 'post'
  })
}

// 获取案件列表数量
export function searchWait() {
  return service({
    url: '/court/xmechar/searchWait.jhtml',
    method: 'post'
  })
}

// 编辑机构
export function editCourtInfo(data) {
  return service({
    url: '/court/court/editCourtInfo.jhtml',
    method: 'post',
    data: data
  })
}

// 编辑解纷员
export function editMediator(data) {
  return service({
    url: '/court/mediateter/editMediator.jhtml',
    method: 'post',
    data: data
  })
}

// 添加机构
export function addCourt(data) {
  return service({
    url: '/court/court/addCourt.jhtml',
    method: 'post',
    data: data
  })
}

// 添加解纷员
export function addMediator(data) {
  return service({
    url: '/court/mediateter/addMediator.jhtml',
    method: 'post',
    data: data
  })
}

// 添加解纷员
export function listCourtByType(params) {
  return service({
    url: '/court/court/listCourtByType.jhtml',
    method: 'get',
    params
  })
}

// 获取公告
export function listAffiche(params) {
  return service({
    url: '/web/affiche/listAffiche.jhtml',
    method: 'get',
    params
  })
}

// 发送公告
export function addAffiche(data) {
  return service({
    url: '/web/affiche/addAffiche.jhtml',
    method: 'post',
    data
  })
}

// 发送公告
export function readAffiche(data) {
  return service({
    url: '/web/affiche/readAffiche.jhtml',
    method: 'post',
    data
  })
}

// 解除机构
export function delCourt(data) {
  return service({
    url: '/court/court/delCourt.jhtml',
    method: 'post',
    data
  })
}
