import { SYS_NAME } from '@/utils/constVal'
import { detailCase } from '@/api/case/index.js'
const appCaseId = `${SYS_NAME}_caseId`
console.log(appCaseId)
const cases = {
  state: {
    caseId: localStorage.getItem(appCaseId) || '', // 案件id
    caseInfo: {} // 案件详情
  },
  mutations: {
    // 保存用户个人信息
    SET_CASEID: (state, caseId) => {
      localStorage.setItem(appCaseId, caseId)
      state.caseId = caseId
    },
    SET_CASEINFO: (state, info) => {
      state.caseInfo = info
    }
  },
  getters: {
    getCaseId: state => state.caseId,
    getCaseInfo: state => state.caseInfo || {}
  },
  actions: {
    GetCaseInfo({ commit, state }) {
      return new Promise((resolve) => {
        detailCase({ lawCaseId: state.caseId }).then(res => {
          if (res.state === 100) {
            commit('SET_CASEINFO', res.lawCase)
            resolve(res.lawCase)
          } else {
            console.error('获取案件详情出错')
          }
        })
      })
    }
  }
}
export default cases
