<template>
  <div class="red-about">
    <top-bar title="" />
    <div class="red-about_wrap">
      <h2>普通红包</h2>
      <p>一对一或者一对多发送，在设置好红包个数并转账总金额到指定账户之后，会生成固定金额的红包，在分享给好友或群发后，每个被领取的红包金额相同。</p>
      <h2>拼手气红包</h2>
      <p>一对多发送，在设置好红包个数并转账总金额到指定账户之后，可以生成不同金额的红包，在分享给好友或群发后，每个被领取的红包金额随机不等。</p>
    </div>
  </div>
</template>
<script>
import TopBar from '@/components/topBar'
export default {
  name: 'red-about',
  components: { TopBar }
}
</script>
<style lang="stylus" scoped>
.red-about
  &_wrap
    padding 24px 16px
    h2
      color #5D4220
      font-size rem(16)
      margin-bottom 12px
    p
      color #5D4220
      font-size rem(14)
      margin-bottom 40px
</style>
