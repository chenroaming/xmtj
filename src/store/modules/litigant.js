const litigant = {
  state: {
    lawCaseId: '',
    registerCourt: {},
    briefName: window.localStorage.getItem('brief') || '', // 案由
    courtData: {}, // 组织解纷
    mediator: {} // 解纷员
  },
  mutations: {
    // 暂存案件信息
    SET_CASEID: (state, lawCaseId) => {
      state.lawCaseId = lawCaseId
    },
    SET_COURT: (state, registerCourt) => {
      state.registerCourt = registerCourt
    },
    // 暂存案由
    SET_BRIEF: (state, name) => {
      state.briefName = name
    },
    // 暂存组织解纷
    SET_COURTDATA: (state, data) => {
      state.courtData = data
    },
    // 暂存解纷员
    SET_MEDIATOR: (state, data) => {
      state.mediator = data
    }
  },
  getters: {
    getLawCaseId: state => state.lawCaseId,
    getRegisterCourt: state => state.registerCourt
  },
  actions: {

  }
}
export default litigant
