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
      time: '',
      seconds: ''
    }
  },
  created () {
    this.seconds = this.countDate
    let _that = this
    this.countDown(this.seconds)
    setInterval(function () {
      _that.countDown(_that.seconds)
    }, 60000)
  },
  methods: {
    countDown (time) {
      let hour = parseInt(time / 60 / 60) // 小时
      let minute = parseInt(time / 60 % 60) // 分钟
      hour = hour < 10 ? `0${hour}` : hour
      minute = minute < 10 ? `0${minute}` : minute
      time = time - 60
      this.seconds = time
      this.time = `${hour}:${minute}`
    }
  }
}
</script>
<style lang="stylus" scoped>
.count-down
  color #FF9200
  background-color #FFF5E8
  padding 2px 3px
  font-weight 500
  display flex
  justify-content center
  align-items center
</style>
