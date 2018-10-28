<template>
  <div class="exchange-warrap">
    <topBar :showHome="showHome"></topBar>
    <div class="exchange-info">
      <p>请让朋友按照以下信息转账</p>
      <p class="huo">或</p>
      <p>从交易所提币</p>
      <p>目前明确支持的交易所有 OTCBTC、Gate.io、Chaince、 Bitfinex、OKcoin，请不要从其他交易所转入，避免财产损失</p>
    </div>
    <div class="exchange-content">
      <div class="title"><p>收款账号</p><p class="copy">复制</p></div>
      <div class="common-content">asdfaf</div>

      <div class="title"><p>公钥</p></div>
      <div class="common-content">asdfasdf</div>

      <div class="title"><p>私钥</p><p class="copy">复制</p></div>
      <div class="packet-number common-content">asdfasdf</div>
    </div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'

export default {
  name: 'exchange',
  components: { topBar },
  data () {
    return {
      showHome: true
    }
  },
  methods: {
    create () {
      this.modalData.showDailog = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.exchange-warrap
  .exchange-info
    color #5D4220
    font-size 16px
    padding rem(24) rem(16) 0
    line-height rem(25)
    .huo
      font-size 12px
      margin 5px 0
    p:last-child
      color #A69987
      font-size rem(12)
      line-height rem(17)
      margin-top 10px
  .exchange-content
    padding 0 rem(16)
    padding-bottom rem(24)
    .title
      margin-top rem(24)
      display flex
      justify-content space-between
      font-size 12px
      color #5D4220
      .copy
        color #288EFB
    .common-content
      width calc(100% - 10px)
      border 0 none
      padding-left 10px
      margin-top 4px
      height rem(48)
      line-height rem(48)
      background-color #F8F8F8
    .packet-number
      height rem(92)
      background-color #F8F8F8
</style>
