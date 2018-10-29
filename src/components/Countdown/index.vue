<template>
  <span v-show="time" class="count-down"><Iconfont name="icon-loudoudaojishi" />&nbsp;{{time}}</span>
</template>
<script>
import Iconfont from '@/components/Iconfont'
export default {
  name: 'count-down',
  components: {
    Iconfont
  },
  props: {
    countDate: Number
  },
  data () {
    return {
      time: ''
    }
  },
  created () {
    let time = this.countDate
    let _that = this
    setInterval(function () {
      // var nowtime = new Date()
      // var time = Math.abs(starttime - nowtime)
      // var day = parseInt(time / 1000 / 60 / 60 / 24) // 天
      let hour = parseInt(time / 60 / 60) // 小时
      let minute = parseInt(time / 60 % 60) // 分钟
      let seconds = parseInt(time % 60) // 秒
      hour = hour < 10 ? `0${hour}` : hour
      minute = minute < 10 ? `0${minute}` : minute
      seconds = seconds < 10 ? `0${seconds}` : seconds
      time--
      _that.time = `${hour}:${minute}:${seconds}`
    }, 1000)
  }
}
</script>
<style lang="stylus" scoped>
.count-down
  color #FF9200
  background-color rgba(255, 146, 0, 0.1)
  padding 2px 3px
  font-weight 500
  display flex
  justify-content center
  align-items center
</style>
