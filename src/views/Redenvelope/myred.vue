<template>
  <div class="my-red">
    <top-bar :title="$t('发红包')" :showHome="showHome"/>
    <div class="my-red_wrap">
      <p>{{$t('请让朋友按照以下信息转账')}} </p>
      <small>{{$t('或')}}</small>
      <p>{{$t('从交易所提币')}}</p>
      <div class="warn_user">
        {{$t('目前明确支持的交易所有')}} OTCBTC、Gate.io、Chaince、 Bitfinex、OKcoin，{{$t('请不要从其他交易所转入，避免财产损失')}}
      </div>
      <div class="text-box">
        <p><span>{{$t('收款账户')}}</span><span class="account" :data-clipboard-text="account" @click="copy('.account')">{{$t('复制')}}</span></p>
        <div class="text">
          <input disabled="disabled" type="text" :value="account" />
        </div>
      </div>
      <div class="text-box">
        <p><span>{{$t('备注')}}</span><span class="remark" :data-clipboard-text="remark" @click="copy('.remark')">{{$t('复制')}}</span></p>
        <div class="text">
          <textarea disabled="disabled" cols="3" rows="6" v-model="remark"></textarea>
        </div>
      </div>
      <div class="text-box">
        <p><span>{{$t('红包串号')}}</span><span class="packetStr" :data-clipboard-text="packetStr" @click="copy('.packetStr')">{{$t('复制')}}</span></p>
        <div class="text packetStr">
          <textarea class="packetStr" disabled="disabled" cols="3" rows="6" v-model="packetStr"></textarea>
        </div>
      </div>
      <div class="my-red_btn_wrapp">
        <div v-show="showScatterTransfer" @click="transfer">
          <my-button :label="$t('转账')" />
        </div>
        <div>
          <router-link to="redlist"><my-button :label="$t('我塞的红包')"/></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from '@/components/topBar'
import MyButton from '@/components/Button'
import { copy } from '@/utils/'
import ScatterJS from 'scatterjs-core'
import ecc from 'eosjs-ecc'

export default {
  name: 'my-red',
  components: {
    TopBar, MyButton
  },
  data () {
    return {
      showHome: true,
      remark: '',
      packetStr: '',
      showScatterTransfer: false,
      scatter: '',
      account: this.$store.state.tranAccountName,
      scatterNetwork: this.$store.state.scatterNetwork
    }
  },
  created () {
    let query = this.$route.query
    // REDPACKET-红包类型-红包id-红包个数-pubkey-祝福语
    this.remark = 'REDPACKET-' + query.type + '-' + query.uuid + '-' + query.limit + '-' + localStorage.getItem(this.$store.state.redPubKeyName) + '-' + query.blessing
    // 签名
    let params = query.uuid + '_' + query.type + '_' + query.blessing
    let privarekey = localStorage.getItem(this.$store.state.redPriKeyName)
    // 生成红包串号
    this.packetStr = query.blessing + '-' + query.type + '-' + query.uuid + '-' + query.limit + '-' + ecc.sign(params, privarekey)
    // scatter链接
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
    transfer () {
      const tokenDetails = {contract: 'eosio.token', symbol: 'EOS', memo: this.remark, decimals: 4}
      this.scatter.requestTransfer(this.scatterNetwork, this.account, this.$route.query.amount + '', tokenDetails).then(result => {
        if (result && result.transaction_id) {
          window.tip(this.$t('转账成功'))
          this.showScatterTransfer = false
        } else {
          window.tip(result.error)
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.my-red
  &_wrap
    padding 24px 16px
    & > small
      margin 6px 0
      display inline-block
      color #5D4220
    & > p
      color #5D4220
      font-size 16px
    .warn_user
      font-size 12px
      color #A69987
      margin 12px 0 24px
    .text-box
      margin-bottom 24px
      & > p
        display flex
        justify-content space-between
        font-size 12px
        & > span:first-child
          color #5D4220
        & > span:last-child
          color #288EFB
      .text
        min-height 48px
        width 100%
        margin-top 4px
        background-color #F8F8F8
        &.packetStr
          background-color #fffcdd
        input, textarea
          background-color #F8F8F8
          padding 13px 15px
          box-sizing border-box
          outline none
          border none
          width 100%
          height 100%
          resize none
          &.packetStr
            background-color #fffcdd
    .my-red_btn_wrapp
      margin-top 32px
      display flex
      justify-content space-between
      & > div
        width 100%
        &:first-child
          margin-right 10px
</style>
