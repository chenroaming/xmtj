import axios from 'axios'

// http://ow365.cn/?i=您的网站ID&furl=要预览的Office文件下载地址
const webID = 21206
const webUrl = 'https://cstj.olcourt.cn/'

// 获取聊天记录缩略图
export function chatRecord(url) {
  return axios({
    url: `?i=${webID}&ssl=1&furl=${webUrl}${url}`,
    baseURL: `/web365`
  })
}
