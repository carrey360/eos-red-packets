<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import * as tip from '@/utils/tips'
import ecc from 'eosjs-ecc'

export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  mounted () {
    window['tip'] = tip
    // 如果第一次进来系统生成唯一的key
    if (!localStorage.getItem(this.$store.state.redPubKeyName)) {
      ecc.randomKey().then(privateKey => {
        localStorage.setItem(this.$store.state.redPriKeyName, privateKey)
        localStorage.setItem(this.$store.state.redPubKeyName, ecc.privateToPublic(privateKey))
      })
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
body{
  padding: 0;
  margin: 0;
  max-width: 640px;
  margin: 0 auto;
  height: 100%
}
</style>
