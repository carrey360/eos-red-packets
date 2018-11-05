<template>
  <div class="red-about">
    <top-bar :title="$t('红包简介')" :showHome="showHome"/>
    <div class="red-about_wrap">
      <h2>{{$t('简介普通红包')}}</h2>
      <p>{{$t('普通红包可以一对一或者一对多发送，用户设置好红包总金额和红包个数后，会生成一串字符串，可分享至各个社交平台，每个被领取的红包金额相同')}}</p>
      <h2>{{$t('简介拼手气红包')}}</h2>
      <p>{{$t('拼手气红包可以一对多发送，用户设置好红包总金额和红包个数后，会生成一串字符串，可分享至各个社交平台，每个被领取的红包金额随机不等')}}</p>
    </div>
  </div>
</template>
<script>
import TopBar from '@/components/topBar'
export default {
  name: 'red-about',
  components: { TopBar },
  data () {
    return {
      showHome: true
    }
  }
}
</script>
<style lang="stylus" scoped>
.red-about
  &_wrap
    padding 24px 16px
    h2
      color #5D4220
      font-size 16px
      margin-bottom 12px
    p
      color #5D4220
      font-size 14px
      margin-bottom 40px
</style>
