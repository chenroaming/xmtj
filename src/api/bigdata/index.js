import axiosConfig from '@/utils/axios.js'
// 创建正式用例接口基础配置
const service = axiosConfig.ajax()

// 获取token
export function getRoomToken(params) {
  return service({
    url: '/court/room/getRoomToken.jhtml',
    method: 'post',
    data: params
  })
}

// 受邀请方同意/拒绝视频连线
export function beInviteIntoRoom(params) {
  return service({
    url: '/court/room/beInviteIntoRoom.jhtml',
    method: 'post',
    data: params
  })
}
