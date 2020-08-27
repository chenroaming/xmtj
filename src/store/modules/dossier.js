import { getBrief, listCourtToFile } from '@/api/dossier/dossier.js'
const dossier = {
  state: {
    briefList: [], // 案由、卷宗类型
    courtList: [] // 法院
  },
  mutations: {
    // 保存案由、卷宗类型
    SET_BRIEFLIST: (state, data) => {
      state.briefList = data
    },
    SET_COURTLIST: (state, data) => {
      state.courtList = data
    }
  },
  getters: {
    getBriefList: state => state.briefList, // 获取用户个人信息
    getCourtList: state => state.courtList // 获取法院
  },
  actions: {
    // 获取案由、卷宗类型
    getBriefData: ({ commit }) => {
      getBrief({ pageSize: 9999 }).then((res) => {
        commit('SET_BRIEFLIST', res.briefPage.content)
      })
    },
    // 获取法院
    getCourtList: ({ commit }) => {
      listCourtToFile({ pageSize: 9999 }).then((res) => {
        commit('SET_COURTLIST', res.content)
      })
    }
  }
}
export default dossier
