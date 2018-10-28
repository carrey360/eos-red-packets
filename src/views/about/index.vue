<template>
  <div>
    <topBar :showHome='showHome' title="关于我们"></topBar>
    <div class="content">
      <div>2.0阶段。2018年5月14日推出EOS超级社区，POW机制和DPOS机制双面开花，2018年6月19日实现</div>
      <div>2.0阶段。2018年5月14日推出EOS超级社区，POW机制和DPOS机制双面开花，2018年6月19日实现</div>
      <div>2.0阶段。2018年5月14日推出EOS超级社区，POW机制和DPOS机制双面开花，2018年6月19日实现</div>
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
