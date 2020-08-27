import axiosConfig from '@/utils/axios.js'
// 创建正式用例接口基础配置
const service = axiosConfig.ajax()

// web获取解纷卷宗
export function listMediateTable(params) {
  return service({
    url: '/mediate/file/listMediateTable.jhtml',
    method: 'GET',
    params
  })
}

// 查询案由/卷宗类型
export function getBrief(params) {
  return service({
    url: '/court/case/getBrief.jhtml',
    method: 'GET',
    params
  })
}
// 获取目录列表
export function listDirType(params) {
  return service({
    url: '/mediate/file/listDirType.jhtml',
    method: 'GET',
    params
  })
}
// 根据卷宗uid/目录uid获取目标目录文件详情
export function detailDirType(params) {
  return service({
    url: '/mediate/file/detailDirType.jhtml',
    method: 'GET',
    params
  })
}
// 编辑/新增 卷宗封面
export function addMediateFile(params) {
  return service({
    url: '/mediate/file/addMediateFile.jhtml',
    method: 'POST',
    data: params
  })
}
// 根据案件id查询当事人及其代理人信息
export function getLitigantInfo(params) {
  return service({
    url: '/court/litigant/getLitigantInfo.jhtml',
    method: 'GET',
    params
  })
}
// （文书）生成人民解纷申请书
export function createPetitionFile(params) {
  return service({
    url: '/mediate/file/createPetitionFile.jhtml',
    method: 'POST',
    data: params
  })
}
// 添加当事人
export function addLitigant(params) {
  return service({
    url: '/court/litigant/addLitigant.jhtml',
    method: 'GET',
    params
  })
}
// 添加当事人（法人）
export function addCompanyLit(params) {
  return service({
    url: '/court/litigant/addCompanyLit.jhtml',
    method: 'GET',
    params
  })
}
// 修改当事人
export function editLitigant(params) {
  return service({
    url: '/court/litigant/editLitigant.jhtml',
    method: 'GET',
    params
  })
}
// 修改当事人（法人）
export function editCompanyLit(params) {
  return service({
    url: '/court/litigant/editCompanyLit.jhtml',
    method: 'GET',
    params
  })
}
// 删除当事人
export function deleteLitigant(params) {
  return service({
    url: '/court/litigant/deleteLitigant.jhtml',
    method: 'GET',
    params
  })
}
// web添加/修改代理人
export function addOrUpdateLawyer(params) {
  return service({
    url: '/court/lawyer/addOrUpdateLawyer.jhtml',
    method: 'POST',
    data: params
  })
}
// 删除代理人
export function delLawyer(params) {
  return service({
    url: '/court/lawyer/delLawyer.jhtml',
    method: 'POST',
    data: params
  })
}
// （文书）人民解纷受理登记表
export function createRegisterFile(params) {
  return service({
    url: '/mediate/file/createRegisterFile.jhtml',
    method: 'POST',
    data: params
  })
}
// （文书）授权委托书
export function createEntrustFile(params) {
  return service({
    url: '/mediate/file/createEntrustFile.jhtml',
    method: 'POST',
    data: params
  })
}
// （文书）权力义务告知书
export function createNotifyFile(params) {
  return service({
    url: '/mediate/file/createNotifyFile.jhtml',
    method: 'POST',
    data: params
  })
}
// （文书）调查记录
export function createExamineFile(params) {
  return service({
    url: '/mediate/file/createExamineFile.jhtml',
    method: 'POST',
    data: params
  })
}
// 上传民事裁定书
export function uploadCivilRuling(params) {
  return service({
    url: '/mediate/file/uploadCivilRuling.jhtml',
    method: 'POST',
    data: params
  })
}
// （文书） 批量/单一 删除文书
export function delMediateFile(params) {
  return service({
    url: '/mediate/file/delMediateFile.jhtml',
    method: 'POST',
    data: params
  })
}
// （文书）人民解纷记录
export function createMediateRecord(params) {
  return service({
    url: '/mediate/file/createMediateRecord.jhtml',
    method: 'POST',
    data: params
  })
}
// （文书）人民解纷回访记录
export function createReturnVisit(params) {
  return service({
    url: '/mediate/file/createReturnVisit.jhtml',
    method: 'POST',
    data: params
  })
}
// 解纷协议书
export function createProtocolFile(params) {
  return service({
    url: '/mediate/file/createProtocolFile.jhtml',
    method: 'POST',
    data: params
  })
}
// 生成民事裁定书
export function createCivilRuling(params) {
  return service({
    url: '/mediate/file/createCivilRuling.jhtml',
    method: 'POST',
    data: params
  })
}
// （文书）卷宗情况说明
export function createTableExplain(params) {
  return service({
    url: '/mediate/file/createTableExplain.jhtml',
    method: 'POST',
    data: params
  })
}
// （文书）司法确认申请书
export function createJudicialFile(params) {
  return service({
    url: '/mediate/file/createJudicialFile.jhtml',
    method: 'POST',
    data: params
  })
}
// （文书）打包下载
export function downZip(params) {
  return service({
    url: '/mediate/file/downZip.jhtml',
    method: 'GET',
    params
  })
}
// （文书） 获取法院（提交司法确认申请书）
export function listCourtToFile(params) {
  return service({
    url: '/court/mediateter/listCourtToFile.jhtml',
    method: 'get',
    params
  })
}
// 查询卷宗
export function getTableByCaseId(params) {
  return service({
    url: '/mediate/file/getTableByCaseId.jhtml',
    method: 'get',
    params
  })
}
// 保存民事裁定书
export function saveCivilRuling(params) {
  return service({
    url: '/mediate/file/saveCivilRuling.jhtml',
    method: 'POST',
    data: params
  })
}
// 查询解纷号（添加卷宗）
export function listSqCaseNo(params) {
  return service({
    url: '/web/case/listSqCaseNo.jhtml',
    method: 'get',
    params
  })
}
// （文书）生成文书回填参数
export function returnFileParams(params) {
  return service({
    url: '/web/case/returnFileParams.jhtml',
    method: 'get',
    params
  })
}
