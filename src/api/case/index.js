import axiosConfig from '@/utils/axios.js'
// 创建正式用例接口基础配置
const service = axiosConfig.ajax()

// 案件列表接口
export function listCase(params) {
  return service({
    url: '/web/case/listCase.jhtml',
    method: 'GET',
    params
  })
}

// 获取案件详情接口 传lawCaseId
export function detailCase(params) {
  return service({
    url: '/court/case/detailsCase.jhtml',
    method: 'GET',
    params
  })
}

// 删除案件
export function delCase(params) {
  return service({
    url: '/court/case/deleteCase.jhtml',
    method: 'GET',
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

// 添加编辑案件
export function updateCase(params) {
  return service({
    url: '/web/case/updateCaseInfo.jhtml',
    method: 'POST',
    data: params
  })
}

// 查询案件解纷协议/证据信息/当事人信息
export function protocol(params) {
  return service({
    url: '/court/protocol/getProtocolByCaseId.jhtml',
    method: 'GET',
    params
  })
}

// 上传或修改证据
export function addOrUpdateEvi(params) {
  return service({
    url: '/court/evidence/addOrUpdateEvi.jhtml',
    method: 'POST',
    data: params
  })
}

// 删除证据
export function delEvi(params) {
  return service({
    url: '/court/evidence/delEvi.jhtml',
    method: 'POST',
    data: params
  })
}
/**
 * 上传图片
 * file 图片文件
 */
export function uploadImg(param) {
  return service({
    url: '/court/wxRegister/uploadFrontImage.jhtml',
    method: 'POST',
    header: {
      'Content-Type': 'multipart/form-data'
    },
    name: 'file',
    data: param
  })
}

// 添加当事人
export function addLitigant(params) {
  return service({
    url: '/court/litigant/addLitigant.jhtml',
    method: 'POST',
    params
  })
}

// 修改当事人
export function editLitigant(params) {
  return service({
    url: '/court/litigant/editLitigant.jhtml',
    method: 'POST',
    params
  })
}

// 添加当事人(法人)
export function addCompanyLit(params) {
  return service({
    url: '/court/litigant/addCompanyLit.jhtml',
    method: 'POST',
    params
  })
}

// 修改当事人(法人)
export function editCompanyLit(params) {
  return service({
    url: '/court/litigant/editCompanyLit.jhtml',
    method: 'POST',
    params
  })
}

// 删除当事人
export function deleteLitigant(params) {
  return service({
    url: '/court/litigant/deleteLitigant.jhtml',
    method: 'POST',
    params
  })
}

// 获取当事人信息
export function selectLitigant(params) {
  return service({
    url: '/court/litigant/selectLitigant.jhtml',
    method: 'post',
    params
  })
}

// 添加修改代理人
export function addLawyer(params) {
  return service({
    url: '/court/lawyer/addOrUpdateLawyer.jhtml',
    method: 'POST',
    data: params
  })
}

// 查看代理人详情
export function detailById(params) {
  return service({
    url: '/court/lawyer/detailById.jhtml',
    method: 'get',
    params
  })
}

// 添加删除代理人
export function delLawyer(params) {
  return service({
    url: '/court/lawyer/delLawyer.jhtml',
    method: 'POST',
    data: params
  })
}

// 提交案件
export function addCase(params) {
  return service({
    url: '/court/case/submitCase.jhtml',
    method: 'POST',
    params
  })
}

// 修改办理承受信息
export function operateCase(params) {
  return service({
    url: '/web/case/operateCase.jhtml',
    method: 'POST',
    data: params
  })
}

// 获取下级机构
export function getCourtsByCourt(params) {
  return service({
    url: '/court/mediateter/getCourtsByCourtId.jhtml',
    method: 'get',
    params
  })
}

/**
 * 上传文件
 * file 文件
 */
export function uploadFile(param) {
  return service({
    url: '/court/group/uploadImage.jhtml',
    method: 'POST',
    header: {
      'Content-Type': 'multipart/form-data'
    },
    name: 'file',
    data: param
  })
}

// 获取用户信息 court/room/getUserDetail.jhtml
export function userInfo(params) {
  return service({
    url: 'court/room/getUserDetail.jhtml',
    method: 'get',
    params
  })
}

// 获取聊天历史记录
export function getHistory(params) {
  return service({
    url: 'court/group/getHistory.jhtml',
    method: 'get',
    params
  })
}

// 获取解纷号
export function caseNo(params) {
  params.placeType = 1 // 用来区分地区 1代表厦门
  return service({
    url: 'court/case/getCaseNo.jhtml',
    method: 'get',
    params
  })
}

/**
 * 案件审核
 * @param {案件id--是} caseId
 * @param {1为修改登字号/解纷号 2为审核意见--是} step
 * @param {登字号 （step为1传值）} casenNo
 * @param {解纷号 （step为1传值）} sqCaseNo
 * @param {审核意见 0未审核；1同意；2不同意；3补正 （step为2传值）} acceptance
 * @param {补正意见 （step为2传值）} opinion
 */
export function acceptCase(params) {
  return service({
    url: 'court/case/acceptCase.jhtml',
    method: 'post',
    params
  })
}

// court/case/distributeCase.jhtml
// 分发
export function distributeCase(params) {
  return service({
    url: 'court/case/distributeCase.jhtml',
    method: 'get',
    params
  })
}

// 进入解纷室状态变更
export function intoTalkRoom(params) {
  return service({
    url: 'court/room/talkRoom.jhtml',
    method: 'post',
    data: params
  })
}

// 删除聊天记录
export function deleteMessage(params) {
  return service({
    url: '/court/group/deleteMessage.jhtml',
    method: 'post',
    data: params
  })
}

// 获取证据信息通过ID
export function detailEviById(params) {
  return service({
    url: '/court/evidence/detailEviById.jhtml',
    method: 'post',
    params
  })
}

// 上传证据附件
export function uploadProof(params) {
  return service({
    url: '/court/evidence/uploadProof.jhtml',
    method: 'post',
    data: params
  })
}
// 法院 查询案件列表
export function listCaseCourt(params) {
  return service({
    url: '/web/case/listCaseCourt.jhtml',
    method: 'get',
    params
  })
}

// 身份证号回填
export function backBirthDay(params) {
  return service({
    url: '/court/litigant/backBirthDay.jhtml',
    method: 'get',
    params
  })
}

// 上传文书
export function uploadMediateFiles(params) {
  return service({
    url: '/mediate/file/uploadMediateFiles.jhtml',
    method: 'post',
    data: params
  })
}

// 保存上传文书
export function saveMediateFile(params) {
  return service({
    url: '/mediate/file/saveMediateFile.jhtml',
    method: 'post',
    data: params
  })
}

// 获取日志
export function listCaseLog(params) {
  return service({
    url: '/web/case/listCaseLog.jhtml',
    method: 'get',
    params
  })
}

// 结案处理
export function endCase(params) {
  return service({
    url: '/web/case/endCase.jhtml',
    method: 'post',
    data: params
  })
}

// 导出
export function exportLawCaseInfo(params) {
  return service({
    url: '/web/case/exportLawCaseInfo.jhtml',
    method: 'post',
    data: params
  })
}

// 批量审核/分发/分配
export function batchLawCase(params) {
  return service({
    url: '/web/case/batchLawCase.jhtml',
    method: 'post',
    data: params
  })
}

// 通过url下载
export function downUrl(url) {
  return service({
    url: url,
    method: 'get'
  })
}

// 分流
export function flowCase(params) {
  return service({
    url: '/court/case/flowCase.jhtml',
    method: 'get',
    params
  })
}

// 查看证据
export function evidenceList(params) {
  return service({
    url: '/court/evidence/evidenceList.jhtml',
    method: 'get',
    params
  })
}

// 移动端查看案件详情
export function qrCodeCaseInfo(caseId) {
  return service({
    url: '/court/case/qrCodeCaseInfo.jhtml',
    method: 'get',
    params: {
      caseId
    }
  })
}

// 获取案件二维码
export function qrCodeForCaseLog(caseId) {
  return service({
    url: '/court/case/qrCodeForCase.jhtml',
    method: 'get',
    params: {
      caseId
    }
  })
}

// 获取案件二维码
export function afterEnd(data) {
  return service({
    url: '/court/case/afterEnd.jhtml',
    method: 'post',
    data
  })
}

// 获取法律法规列表
export function searchLaw(params) {
  return service({
    url: '/court/lawquery/search.jhtml',
    method: 'get',
    params
  })
}

// 获取法律法规列表
export function lawDetail(id) {
  return service({
    url: '/court/lawquery/detail.jhtml',
    method: 'get',
    params: {
      id
    }
  })
}
