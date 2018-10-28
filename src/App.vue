<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import * as tip from '@/utils/tips'

export default {
  name: 'App',
  created () {
    window['tip'] = tip
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
