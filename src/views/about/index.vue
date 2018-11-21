<template>
  <div>
    <topBar :showHome='showHome' :title="$t('关于我们')"></topBar>
    <div class="content">
      <div>{{$t('EOS红包是由火币矿池（www.huobipool.com）和麒麟社区开发的在线领取和派发EOS红包的平台')}}</div>
      <div>{{$t('用户可以凭口令领取红包，也可以派发普通红包和拼手气红包')}}</div>
      <div>{{$t('目前支持EOS,EGT币种、中英文版本')}}</div>
    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'

export default {
  name: 'about',
  components: { topBar },
  data () {
    return {
      showHome: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
  margin rem(24) rem(16)
  color #6B5334
  line-height rem(25)
  div
    margin-bottom rem(20)
</style>
