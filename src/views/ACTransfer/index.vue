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
      <div class="common-content">hb.huobi</div>

      <div class="title"><p>转账金额</p></div>
      <div class="common-content">0.62<span class="unit">EOS</span></div>

      <div class="title"><p>备注</p><p class="copy">复制</p></div>
      <div class="packet-number common-content">{{ remark }}</div>
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
      showHome: true,
      remark: ''
    }
  },
  created () {
    let query = this.$route.query
    console.log(query)
    // ACCOUNTCREATE-账号名-公钥
    this.remark = 'ACCOUNTCREATE-' + query.accountName + '-' + query.publicKey
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
      width calc(100% - 20px)
      border 0 none
      padding 10px
      margin-top 4px
      height rem(28)
      background-color #F8F8F8
      word-break break-all
      font-size 16px
      .unit
        font-size 12px
        margin-left 6px
    .packet-number
      height rem(92)
      background-color #F8F8F8
</style>
