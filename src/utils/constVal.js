// 全局常量文件
export const SYS_NAME = 'SHUYUAN-sys'
export const ROLEMAP = { // 角色类型map
  1: '解纷机构',
  2: '解纷员',
  3: '当事人',
  4: '法院',
  6: '超级管理员'
}
// export const PROCESSMAP = { // 案件进程map
//   0: "未申请",
//   1: "已申请",
//   2: "已受理",
//   3: "已分发",
//   4: "已分配",
//   5: "解纷中",
//   6: "解纷成功",
//   7: "解纷终止",
//   9: "不受理",
//   10: "司法确认申请书签名阶段",
//   11: "司法确认申请书已提交法院",
//   12: "法院受理并立案",
//   13: "法院退回并补正"
// }
export const PROCESSMAP = { // 案件进程map
  0: '未申请',
  1: '已申请',
  2: '已受理',
  3: '已分发',
  4: '已分配(待化解)',
  5: '化解中',
  6: '化解完毕',
  7: '司法确认申请书签名阶段',
  8: '司法确认申请书已提交法院',
  9: '法院受理并立案',
  10: '法院退回并补正'
}
export const IDENTITYMAP = { // 身份证类别：1.自然人-身份证；2法人-统一信用代码
  1: '自然人',
  2: '法人'
}
export const LITIGANTTYPEMAP = { // 当事人类型：1.自然人-身份证；2法人-统一信用代码
  0: '自然人',
  1: '法人'
}
export const SEXMAP = { // 性别类型 0男 1女
  0: '男',
  1: '女'
}
export const AGENTTYPEMAP = { // 代理人类型
  1: '律师',
  2: '法律工作者',
  3: '单位工作人员',
  4: '近亲属',
  5: '公民'
}
export const LITIGATIONMAP = { // 诉讼地位
  1: '原告',
  2: '被告',
  3: '第三人',
  4: '申请人',
  5: '被申请人'
}
export const OFFICE365RUL = 'https://vip.ow365.cn/' // officeweb365地址
export const OFFICE365ID = 21929 // officeweb365ID
// export const OFFICE365ID = '21929' //officeweb365ID

let BASEIMGURL = '' // 图片地址
let SERVICEURL = '' // 服务器地址
const BASEAPI = '' // baseapi
let SOCKETURL = '' // socket的url
if (process.env.NODE_ENV == 'development') {
  BASEIMGURL = `http://xmtj.olcourt.cn`
  SERVICEURL = `http://xmtj.olcourt.cn/`
  SOCKETURL = `wss:xmtj.olcourt.cn/websocket`
} else {
  BASEIMGURL = `https://xmtj.olcourt.cn`
  SERVICEURL = `https://xmtj.olcourt.cn/`
  SOCKETURL = `wss:xmtj.olcourt.cn/websocket`
}
export {
  BASEIMGURL,
  SERVICEURL,
  BASEAPI,
  SOCKETURL
}

export const APPLICATIONTYPR = { // 申请类型
  0: '解纷',
  1: '仲裁',
  2: '行政复议',
  3: '行政裁决',
  4: '其他'
}
