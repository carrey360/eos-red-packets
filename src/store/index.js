import Vuex from 'vuex'
import Vue from 'vue'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'
import WebStorageCache from 'web-storage-cache'

Vue.use(Vuex)
let endpoint = 'http://52.194.36.198:8888'
let chainId = '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191'
let scatterHost = 'api-kylin.eosasia.one'
let scatterPort = 80
let scatterProtocol = 'http'
let apiHost = 'http://192.168.2.1:8080'

if (process.env.NODE_ENV === 'production') {
  endpoint = 'https://api.redpacketeos.com'
  chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
  scatterHost = 'api.redpacketeos.com'
  scatterPort = 443
  scatterProtocol = 'https'
  apiHost = 'http://10.102.5.139:8000'
}
let defaultPrivateKey = '5Jq1XzuZ1dsGb2LSgsfA9nmpSEUpo3NnRkAYb9MdzRuFoTHZsEC'
const store = new Vuex.Store({
  state: {
    code: '',
    redPubKeyName: 'redPublicKey',
    redPriKeyName: 'redPriateKey',
    tranAccountName: 'redpacketeos',
    projectName: 'red-packets',
    receivedAccountName: 'inputedName',
    scatterNetwork: {
      blockchain: 'eos',
      host: scatterHost,
      port: scatterPort,
      protocol: scatterProtocol,
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
    defaultAccount: 'eosfreetouse',
    scatter: null,
    accountIdentity: null,
    wsCache: '',
    apiHost: apiHost
  },
  actions: {
    connectScatter ({ commit, state }) {
      ScatterJS.plugins(new ScatterEOS())
      ScatterJS.scatter.connect(state.projectName).then(connected => {
        if (!connected) return false
        commit('CONNECT_SCATTER', ScatterJS.scatter)
        const requiredFields = {accounts: [state.scatterNetwork]}
        ScatterJS.scatter.getIdentity(requiredFields).then(() => {
          commit('GET_INDENTITY', ScatterJS.scatter.identity.accounts.find(x => x.blockchain === 'eos'))
        })
      })
    }
  },
  getters: {
    getCode: (state) => state.code
  },
  mutations: {
    'setCode': (state, data) => {
      state.code = data.code
    },
    'CONNECT_SCATTER': (state, data) => {
      state.scatter = data
    },
    'GET_INDENTITY': (state, data) => {
      state.accountIdentity = data
    },
    'SetWebStorageCache': (state) => {
      let wsCache = new WebStorageCache()
      state.wsCache = wsCache
    }
  }
})

export default store
