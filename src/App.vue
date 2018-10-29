<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import * as tip from '@/utils/tips'
import ecc from 'eosjs-ecc'

export default {
  name: 'App',
  created () {
    window['tip'] = tip
    // 如果第一次进来系统生成唯一的key
    if (!localStorage.getItem(this.$store.state.redPubKeyName)) {
      ecc.randomKey().then(privateKey => {
        localStorage.setItem(this.$store.state.redPriKeyName, privateKey)
        localStorage.setItem(this.$store.state.redPubKeyName, ecc.privateToPublic(privateKey))
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
}
body{
  padding: 0;
  margin: 0;
  max-width: 750px;
  margin: 0 auto;
}
</style>
