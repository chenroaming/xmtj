import axiosConfig from '@/utils/axios.js'
// 创建正式用例接口基础配置
const service = axiosConfig.ajax()

// 进入房间
export function intoRoom(params) {
  return service({
    url: '/court/room/intoRoom.jhtml',
    method: 'GET',
    params
  })
}

// 关闭房间
export function closeRoom(params) {
  return service({
    url: '/court/room/closeRoom.jhtml',
    method: 'GET',
    params
  })
}
