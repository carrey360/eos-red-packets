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
      <div class="title"><p>收款账号</p><p class="copy account" :data-clipboard-text="account" @click="copy('.account')">复制</p></div>
      <div class="common-content">{{ account }}</div>

      <div class="title"><p>转账金额</p></div>
      <div class="common-content">0.62<span class="unit">EOS</span></div>

      <div class="title"><p>备注</p><p class="copy remark" :data-clipboard-text="remark" @click="copy('.remark')">复制</p></div>
      <div class="packet-number common-content">{{ remark }}</div>
    </div>
    <div v-show="showScatterTransform" class="button" @click="transform">转账</div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import Clipboard from 'clipboard'
import ScatterJS from 'scatterjs-core'

export default {
  name: 'exchange',
  components: { topBar },
  data () {
    return {
      showHome: true,
      remark: '',
      account: this.$store.state.tranAccountName,
      scatter: '',
      eosClient: '',
      showScatterTransform: false,
      scatterNetwork: this.$store.state.scatterNetwork
    }
  },
  created () {
    let query = this.$route.query
    // ACCOUNTCREATE-账号名-公钥
    this.remark = 'ACCOUNTCREATE-' + query.accountName + '-' + query.publicKey + '-' + query.publicKey

    ScatterJS.scatter.connect(this.$store.state.projectName).then(connected => {
      if (!connected) return false
      this.scatter = ScatterJS.scatter
      window.scatter = null
      this.showScatterTransform = true
    }).catch(e => {
      this.showScatterTransform = false
    })
  },
  methods: {
    copy (className) {
      var clipboard = new Clipboard(className)
      clipboard.on('success', e => {
        window.tip('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        window.tip('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    transform () {
      const tokenDetails = {contract: 'eosio.token', symbol: 'EOS', memo: this.remark, decimals: 4}
      this.scatter.requestTransfer(this.scatterNetwork, this.account, '0', tokenDetails).then(result => {
        if (result && result.transaction_id) {
          window.tip('创建账号成功')
        } else {
          window.tip(result.error || '创建失败')
        }
      })
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
  .button
    margin rem(24) auto
    margin-bottom 0
    height 50px
    line-height 50px
    color #5D4220
    background-color #FCDBB2
    border-radius 2px
    font-weight 500
    width calc(100% - 32px)
    font-size 16px
    text-align center
    border-radius 2px
</style>
