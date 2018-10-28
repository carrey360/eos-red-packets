import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    code: '3333'
  },
  mutations: {
    'setCode': (state, data) => {
      state.code = data.code
    }
  }
})

export default store
