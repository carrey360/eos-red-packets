import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    code: '',
    redPubKeyName: 'redPublicKey',
    redPriKeyName: 'redPriateKey'
  },
  getters: {
    getCode: (state) => state.code
  },
  mutations: {
    'setCode': (state, data) => {
      state.code = data.code
    }
  }
})

export default store
