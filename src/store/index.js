import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import user from './modules/user'
import litigant from './modules/litigant'
import cases from './modules/case'
import dossier from './modules/dossier'
import mediater from './modules/mediater'
import bigdata from './modules/bigdata'

export default new Vuex.Store({
  modules: {
    user,
    litigant,
    cases,
    dossier,
    bigdata,
    mediater
  }
})
