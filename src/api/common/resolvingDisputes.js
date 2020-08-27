import axiosConfig from '@/utils/axios.js'
// 创建正式用例接口基础配置
const service = axiosConfig.ajax()

//获取解纷资源 组织资源数量、解纷人员数量
export function searchUnit() {
    return service({
      url: '/court/xmechar/searchUnit.jhtml',
      method: 'post',
    })
  }

  