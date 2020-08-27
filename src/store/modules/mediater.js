const mediater = {
  state: {
    mediaterId: '', // 解纷ID
    mediaterInfo: '', // 解纷信息
    roomToken: ''
  },
  mutations: {
    // 解纷ID
    SET_MEDIATERID: (state, id) => {
      state.mediaterId = id
    },
    SET_MEDIATERIDINFO: (state, info) => {
      state.mediaterInfo = info
    },
    // 获取视频的token
    SET_ROOMTOKEN: (state, token) => {
      state.roomToken = token
    }
  },
  getters: {
    getMediaterId: state => state.mediaterId // 获取用户个人信息
  },
  actions: {
  }
}
export default mediater
