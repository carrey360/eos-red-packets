import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    code: '',
    redPubKeyName: 'redPublicKey',
    redPriKeyName: 'redPriateKey',
    tranAccountName: 'huobi',
    projectName: 'red-packets',
    scatterNetwork: {
      blockchain: 'eos',
      host: 'api-kylin.eosasia.one',
      port: 80,
      protocol: 'http',
      chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191'
    },
    eosjsConfig: {
      endpoint: 'http://52.194.36.198:8888'
    },
    defaultPrivateKey: '5K3PYvv9bZNxGtt4MmL6UAg2bABmwcYVBmLJdHWmC6Eus34yCfY',
    defaultAccount: 'hb.huobi'
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
