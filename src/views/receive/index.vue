<template>
  <div class="receive-warrap">
    <topBar title="领红包"></topBar>
    <div class="dispatch-info">
      <img src="@/assets/red-top.png"/>
      <div class="from">From {{ info.sender }}</div>
      <div class="total">
        Total<span class="amount">{{ info.amount }}</span>
        <span v-if="info.type == 3" class="luck">{{$t('普')}}</span>
        <span class="share" v-else>{{$t('拼')}}</span></div>
      <div class="blessing">{{ info.memo }}</div>
      <div class="send-time">
        <div>{{$t('创建时间')}}：{{ info.expire | formatDate('YYYY-MM-DD HH:mm') }}</div>
        <div class="status"><IconFont name="icon-loudoudaojishi" type="svg" class="iconfont"/> 12:35</div>
      </div>
    </div>
    <div class="amount-info">{{$t('兑换')}} {{ info.data.length }}/{{ info.limit }}, 99.8547/{{ info.amount }}</div>
    <ul class="receive-list">
      <li v-for="(item, key) in info.data" :key="key"><div>HIf528fed125</div><div>0.1254 EOS</div></li>
    </ul>
    <div class="inner-div"></div>
    <div class="error-tip" v-if="showError">{{ errorMsg }}</div>
    <div class="input-account">
      <LimitInput class="input" placeholder="请输入您的账号" :isNumber="false" v-model="account"/>
      <div class="no-account">{{$t('还没有EOS账号')}}?<router-link to="account">{{$t('创建')}}</router-link></div>
      <div class="button" @click="receive">领取</div>
    </div>
    <loading v-show='showLoading'></loading>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import IconFont from '@/components/Iconfont'
import loading from '@/components/loading'
import LimitInput from '@/components/LimitInput'
import { formatDate } from '@/utils/filter'
import { formatePacket } from '@/utils/'
// import { Api, JsonRpc, JsSignatureProvider } from 'eosjs'
// import { TextDecoder, TextEncoder } from 'text-encoding'
import { JsonRpc } from 'eosjs'

export default {
  name: 'receive',
  components: { topBar, IconFont, loading, LimitInput },
  data () {
    return {
      account: '',
      showError: false,
      errorMsg: '账号错误',
      showLoading: false,
      info: {
        id: '',
        type: '',
        limit: '',
        sender: '',
        pubkey: '',
        amount: '',
        memo: '',
        expire: 0,
        data: []
      }
    }
  },
  created () {
    let formatCodeJson = formatePacket(this.$store.state.code)
    let params = {
      json: true,
      code: this.$store.state.tranAccountName,
      scope: this.$store.state.tranAccountName,
      table: 'coupons',
      lower_bound: formatCodeJson.id,
      limit: 1,
      key_type: 'i64',
      index_position: '1'
    }
    const rpc = new JsonRpc(this.$store.state.eosjsConfig.endpoint)
    // const signatureProvider = new JsSignatureProvider([this.$store.state.defaultPrivateKey])
    // const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})
    this.getTableRows(rpc, params)
    // this.transact(api)
  },
  methods: {
    async getTableRows (rpc, params) {
      const response = await rpc.get_table_rows(params)
      if (response.rows) {
        this.info = response.rows[0]
      }
    },
    async transact (api) {
      const result = await api.transact({
        actions: [{
          account: 'eosio.token',
          name: 'transfer',
          authorization: [{
            actor: this.$store.state.defaultAccount,
            permission: 'active'
          }],
          data: {
            from: this.$store.state.defaultAccount,
            to: 'eoshuobipool',
            quantity: '1.0000 EOS',
            memo: ''
          }
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 300
      })
      console.log(result, '-=-=-=')
    },
    receive () {
      if (!this.account) {
        this.showError = true
        this.errorMsg = '请输入账号'
        let timeout = ''
        timeout = setTimeout(() => {
          this.showError = false
          clearTimeout(timeout)
        }, 1000)
      } else if (this.account.length !== 12) {
        this.showError = true
        this.errorMsg = '请输入12位有效账号'
        let timeout = ''
        timeout = setTimeout(() => {
          this.showError = false
          clearTimeout(timeout)
        }, 1000)
      } else {
        this.$router.push('success')
      }
    }
  },
  filters: {
    formatDate (value, pattern) {
      return formatDate(value, pattern)
    }
  }
}
</script>

<style lang="stylus" scoped>
.receive-warrap
  img
    width 100%
  .dispatch-info
    background-color #F8F8F8
    .from
      font-size 12px
      color #5D4220
      text-align center
      margin-top rem(8)
    .total
      font-size rem(12)
      color #5D4220
      margin-top rem(8)
      text-align center
      .amount
        font-size rem(16)
        margin 0 rem(6)
      .luck
        background-color #E4F1FE
        font-size rem(12)
        color #288EFB
        padding 0 2px
      .share
        background-color #DCF2E8
        font-size rem(12)
        color #3ECF8B
        padding 0 2px
    .blessing
      font-size rem(12)
      color #5D4220
      line-height rem(18)
      text-align center
      padding rem(8) rem(30)
    .send-time
      display flex
      justify-content space-between
      padding rem(16)
      font-size rem(12)
      color #C9C2B7
      .status
        color #FF9200
  .amount-info
    height rem(50)
    line-height rem(50)
    padding 0 rem(16)
    text-align left
    color #A69987
    border-bottom 1px solid #F9F9F9
  .receive-list
    li
      padding 0 rem(16)
      color #5D4220
      font-size rem(14)
      display flex
      height rem(50)
      align-items center
      justify-content space-between
      border-bottom 1px solid #F9F9F9
  .inner-div
    height rem(160)
  .error-tip
    max-width 750px
    background-color #FFEAED
    text-align center
    color #CE2344
    font-size 12px
    position fixed
    // left 0
    bottom rem(160)
    height rem(34)
    line-height rem(34)
    width 100%
  .input-account
    text-align center
    position fixed
    max-width 750px
    // left 0
    bottom 0
    -webkit-transform translateZ(0)
    height rem(160)
    width 100%
    background-color #CE2344
    .input
      margin-top rem(16)
      // padding rem(18) rem(16)
      padding-left 16px
      height 56px
      width calc(100% - 30px)
      border 0 none
      border-radius 2px
    .no-account
      text-align right
      color #ffffff
      margin-top 4px
      padding-right rem(16)
      font-size 12px
      a
        text-decoration none
        color #FFF7C1
        font-size rem(12)
    .button
      background-color #FCDBB2
      height rem(38)
      line-height rem(38)
      width rem(120)
      border-radius rem(20)
      color #5D4220
      font-size rem(14)
      margin 0 auto
</style>
