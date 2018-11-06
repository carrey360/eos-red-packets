import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
let endpoint = 'http://52.194.36.198:8888'
let chainId = '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191'
let scatterHost = 'api-kylin.eosasia.one'
let scatterPort = 80

if (process.env.NODE_ENV === 'production') {
  endpoint = 'http://peer1.eoshuobipool.com:80'
  chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
  scatterHost = 'peer1.eoshuobipool.com'
  scatterPort = 80
}
let defaultPrivateKey = '5Jq1XzuZ1dsGb2LSgsfA9nmpSEUpo3NnRkAYb9MdzRuFoTHZsEC'

const store = new Vuex.Store({
  state: {
    code: '',
    redPubKeyName: 'redPublicKey',
    redPriKeyName: 'redPriateKey',
    tranAccountName: 'redpacketeos',
    projectName: 'red-packets',
    scatterNetwork: {
      blockchain: 'eos',
      host: scatterHost,
      port: scatterPort,
      protocol: 'http',
      chainId: chainId
    },
    eosConfig: {
      chainId: chainId,
      keyProvider: [defaultPrivateKey],
      httpEndpoint: endpoint,
      expireInSeconds: 60,
      broadcast: true,
      verbose: false,
      sign: true
    },
    eosjsConfig: {
      endpoint: endpoint
    },
    defaultPrivateKey: defaultPrivateKey,
    defaultAccount: 'eosfreetouse'
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
