<template>
  <div class="exchange-warrap">
    <topBar :title="$t('创建EOS账号')" :showHome="showHome"></topBar>
    <div class="exchange-info">
      <p>{{$t('请让朋友按照以下信息转账')}}</p>
      <p class="huo">{{$t('或')}}</p>
      <p>{{$t('从交易所提币')}}</p>
      <p>{{$t('目前明确支持的交易所有')}} OTCBTC、Gate.io、Chaince、 Bitfinex、OKcoin，{{$t('请不要从其他交易所转入，避免财产损失')}}</p>
    </div>
    <div class="exchange-content">
      <div class="title"><p>{{$t('收款账号')}}</p><p class="copy account" :data-clipboard-text="account" @click="copy('.account')">{{$t('复制')}}</p></div>
      <div class="common-content">{{ account }}</div>

      <div class="title"><p>{{$t('转账金额')}}</p></div>
      <LimitInput numberType="float" :placeholder="$t('请输入转账金额')" left-label="" right-label="EOS" v-model="amount"/>

      <div class="title"><p>{{$t('备注')}}</p><p class="copy remark" :data-clipboard-text="remark" @click="copy('.remark')">{{$t('复制')}}</p></div>
      <div class="packet-number common-content">{{ remark }}</div>
    </div>
    <div v-show="showScatterTransfer" class="button" @click="doTransfer">{{$t('转账')}}</div>
    <div v-show="wantSentPacket" class="button"><router-link to="red">{{$t('发红包')}}</router-link></div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import { copy } from '@/utils/'
import LimitInput from '@/components/LimitInput'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'
import Eos from 'eosjs'

export default {
  name: 'exchange',
  components: { topBar, LimitInput },
  data () {
    return {
      showHome: true,
      remark: '',
      account: this.$store.state.tranAccountName,
      scatter: '',
      eosClient: '',
      showScatterTransfer: false,
      wantSentPacket: false,
      scatterNetwork: this.$store.state.scatterNetwork,
      amount: '0.8000'
    }
  },
  created () {
    ScatterJS.plugins(new ScatterEOS())
    let query = this.$route.query
    // ACCOUNTCREATE-账号名-公钥
    this.remark = 'ACCOUNT-' + query.accountName + '-' + query.publicKey + '-' + query.publicKey

    ScatterJS.scatter.connect(this.$store.state.projectName).then(connected => {
      if (!connected) return false
      this.scatter = ScatterJS.scatter
      window.scatter = null
      this.showScatterTransfer = true
    }).catch(e => {
      this.showScatterTransfer = false
    })
  },
  methods: {
    copy (className) {
      copy(className, this)
    },
    doTransfer () {
      if (!this.amount) {
        window.tip(this.$t('请输入转账金额'))
        return false
      }
      const requiredFields = {accounts: [this.scatterNetwork]}
      this.scatter.getIdentity(requiredFields).then(() => {
        const account = this.scatter.identity.accounts.find(x => x.blockchain === 'eos')
        const eosOptions = {expireInSeconds: 60 * 2}
        const eos = this.scatter.eos(this.$store.state.scatterNetwork, Eos, eosOptions)
        const transactionOptions = { authorization: [`${account.name}@${account.authority}`] }

        eos.transfer(account.name, this.account, (+this.amount).toFixed(4) + ' EOS', this.remark, transactionOptions).then(result => {
          if (result && result.transaction_id) {
            window.tip('创建账号成功')
            this.showScatterTransfer = false
            this.wantSentPacket = true
          } else {
            window.tip(result.error)
          }
        }).catch(() => {
          window.tip(this.$t('失败'))
        })
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
      font-size 12px
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
    >>>.limit-input .red-input
      padding 10px
      div
        width 100%
      input
        text-align left
        padding 0
        width 88%
    .packet-number
      height rem(92)
      background-color #F8F8F8
  .button
    margin rem(24) auto
    margin-bottom 50px
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
    a
      text-decoration none
      color #5D4220
</style>
