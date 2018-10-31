<template>
  <div class="receive-warrap">
    <topBar title="红包详情" :showHome="showHome"></topBar>
    <div class="dispatch-info">
      <img src="@/assets/red-top.png"/>
      <div class="from">From {{ info.sender }}</div>
      <div class="total">
        Total<span class="amount">{{ info.amount }}</span>
        <span v-if="info.type == 3" class="luck">{{$t('普')}}</span>
        <span class="share" v-if="info.type == 4">{{$t('拼')}}</span>
      </div>
      <div class="blessing">{{ info.memo }}</div>
      <div class="send-time">
        <div>创建时间：{{ info.expire | formatDate('YYYY-MM-DD HH:mm') }}</div>
        <!-- <div class="status"><IconFont name="icon-loudoudaojishi" type="svg" class="iconfont"/> 12:35</div> -->
        <div class="status"><count-down v-if="info.countDate" :count-date="info.countDate"/></div>
      </div>
    </div>

    <div class="copy-content">
      <!-- <div class="title"><p>红包ID</p><p class="copy account" :data-clipboard-text="redID" @click="copy('.account')">{{$t('复制')}}</p></div>
      <div class="common-input">{{ redID }}</div> -->

      <div class="title"><p>红包串号</p><p class="copy packetStr" :data-clipboard-text="packetStr" @click="copy('.packetStr')">{{$t('复制')}}</p></div>
      <div class="tip">分享该串给您朋友，让你朋友领取红包</div>
      <div class="packet-number common-input">{{ packetStr }}</div>
    </div>

    <div class="fengeline"></div>

    <div class="amount-info">{{$t('兑换')}} {{ info.data.length }}/{{ info.limit }}, 99.8547/{{ info.amount }}</div>
    <ul class="receive-list">
      <li v-for="(item, key) in info.data" :key="key"><div>HIf528fed125</div><div>0.1254 EOS</div></li>
    </ul>
    <loading v-if='showLoading'></loading>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import IconFont from '@/components/Iconfont'
import Clipboard from 'clipboard'
import CountDown from '@/components/Countdown'
import loading from '@/components/loading'
import ecc from 'eosjs-ecc'
import { formatDate } from '@/utils/filter'
import { JsonRpc } from 'eosjs'

export default {
  name: 'detail',
  components: {topBar, IconFont, CountDown, loading},
  data () {
    return {
      showHome: true,
      redID: '',
      packetStr: '',
      showLoading: true,
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
    let query = this.$route.query
    let params = {
      json: true,
      code: this.$store.state.tranAccountName,
      scope: this.$store.state.tranAccountName,
      table: 'coupons',
      lower_bound: query.id,
      limit: 1,
      key_type: 'i64',
      index_position: '1'
    }
    this.redID = query.id
    const rpc = new JsonRpc(this.$store.state.eosjsConfig.endpoint)
    this.getTableRows(rpc, params)
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
    async getTableRows (rpc, params) {
      const response = await rpc.get_table_rows(params)
      if (response.rows) {
        let result = response.rows[0]
        let nowTime = parseInt((new Date()).getTime() / 1000)
        if (result.expire > nowTime) {
          result.countDate = result.expire - nowTime
        }
        result.expire = result.expire - 24 * 60 * 60
        //  红包串
        let params = result.id + '_' + result.type + '_queqiqueqiaa_' + result.memo
        let privarekey = localStorage.getItem(this.$store.state.redPriKeyName)
        this.packetStr = result.memo + '-' + result.id + '-' + result.type + '-' + result.limit + '-' + ecc.sign(params, privarekey)
        this.info = result
        this.showLoading = false
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
      font-size rem(12)
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
  .copy-content
    margin 0 rem(16)
    padding-bottom rem(16)
    .tip
      color #C9C2B7
      margin 2px 0 8px 0
      font-size 12px
  .title
    margin-top rem(24)
    display flex
    justify-content space-between
    font-size 12px
    color #5D4220
    .copy
      color #288EFB
      font-size 14px
  .common-input
    width calc(100% - 20px)
    border 0 none
    padding 10px
    margin-top 4px
    height rem(48)
    line-height rem(48)
    background-color #F8F8F8
    word-break break-all
  .packet-number
    height rem(158)
    line-height normal
    background-color #FFFCDD
  .fengeline
    height 8px
    width 100%
    background-color #F8F8F8
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
</style>
