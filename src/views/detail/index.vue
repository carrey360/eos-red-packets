<template>
  <div class="receive-warrap">
    <topBar :title="$t('红包详情')" :showHome="showHome"></topBar>
    <div class="dispatch-info">
      <img src="@/assets/red-top.png"/>
      <div class="from">From {{ info.sender }}</div>
      <div class="total">
        Total<span class="amount">{{ info.amount }}</span>
        <span class="luck" v-if="info.type == 1">{{$t('普')}}</span>
        <span class="share" v-if="info.type == 2">{{$t('拼')}}</span>
        <span class="jian" v-if="info.type == 3">{{$t('建')}}</span>
      </div>
      <div class="blessing">{{ info.memo }}</div>
      <div class="send-time">
        <div>{{$t('创建时间')}}：{{ info.expire | formatDate('YYYY-MM-DD HH:mm') }}</div>
        <div class="status"><count-down v-if="info.countDate" :count-date="info.countDate"/></div>
      </div>
    </div>

    <div class="copy-content">
      <div class="title"><p>{{$t('红包')}}ID</p><p class="copy account" :data-clipboard-text="redID" @click="copy('.account')">{{$t('复制')}}</p></div>
      <div class="tip">{{$t('通过该ID可以查看红包信息')}}</div>
      <div class="common-input">{{ redID }}</div>

      <div v-show="curUserPublik == info.pubkey">
        <div class="title"><p>{{$t('红包串')}}</p><p class="copy packetStr" :data-clipboard-text="packetStr" @click="copy('.packetStr')">{{$t('复制')}}</p></div>
        <div class="tip">{{$t('分享该串给您朋友，让你朋友领取红包')}}</div>
        <textarea class="packet-number common-input" disabled="disabled" cols="3" rows="9" v-model="packetStr"></textarea>
      </div>
    </div>

    <div class="fengeline"></div>

    <div class="amount-info">{{$t('兑换')}} {{ info.log.length }}/{{ info.limit }}, {{receiveAmount.toFixed(4)}}/{{ info.amount }}</div>
    <ul class="receive-list">
      <li v-for="(item, key) in info.log" :key="key"><div>{{ item.who }}</div><div>{{ item.amount }}</div></li>
    </ul>
    <div v-show="info.log.length == 0" class="list-noData">{{$t('暂无数据')}}</div>
    <loading v-if='showLoading'></loading>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import IconFont from '@/components/Iconfont'
import { copy, getTableRow } from '@/utils/'
import CountDown from '@/components/Countdown'
import loading from '@/components/loading'
import {hash2Ggc} from '@/utils/murmurhash2_gc'
import { generatePacketCode } from '@/utils'
import { formatDate } from '@/utils/filter'

export default {
  name: 'detail',
  components: {topBar, IconFont, CountDown, loading},
  data () {
    return {
      showHome: true,
      redID: '',
      packetStr: '',
      showLoading: true,
      receiveAmount: 0, // 已领取金额
      curUserPublik: localStorage.getItem(this.$store.state.redPubKeyName),
      info: {
        id: '',
        type: '',
        limit: 0,
        sender: '',
        pubkey: '',
        amount: 0,
        memo: '',
        expire: 0,
        log: []
      }
    }
  },
  created () {
    if (!this.$store.state.wsCache) {
      this.$store.commit('SetWebStorageCache', {})
    }
    let query = this.$route.query
    let params = {
      json: true,
      code: this.$store.state.tranAccountName,
      scope: this.$store.state.tranAccountName,
      table: 'redpacket',
      lower_bound: query.id,
      limit: 1,
      key_type: 'i64',
      index_position: 1
    }
    this.redID = query.id
    let _that = this
    getTableRow(this, params, (response) => {
      _that.handleResponse(response)
    }, () => {
      window.tip(this.$t('失败'))
      _that.showLoading = false
    })
  },
  methods: {
    handleResponse (response) {
      if (response.rows) {
        let result = response.rows[0]
        let nowTime = parseInt((new Date()).getTime() / 1000)
        if (result.expire > nowTime) {
          result.countDate = result.expire - nowTime
        }
        result.log.map(item => {
          this.receiveAmount += parseFloat(item.amount)
        })
        result.expire = result.expire - 24 * 60 * 60

        //  红包串
        let privarekey = localStorage.getItem(this.$store.state.redPriKeyName)
        let selfPrivarekey = this.$store.state.wsCache.get('red_' + result.id)
        const lang = localStorage.getItem('redLang')
        let memoPrivateKey = selfPrivarekey || privarekey
        let hash = hash2Ggc(result.id + '_' + memoPrivateKey)
        // this.packetStr = generatePacketCode(result.memo, result.type, result.id, result.limit, memoPrivateKey, lang)
        this.packetStr = generatePacketCode(result.memo, result.id, hash, lang)
        this.info = result
      }
      this.showLoading = false
    },
    copy (className) {
      copy(className, this)
    },
    async getTableRows (rpc, params) {
      const response = await rpc.get_table_rows(params)
      return response
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
      font-size 12px
      color #5D4220
      margin-top rem(8)
      text-align center
      .amount
        font-size 16px
        margin 0 rem(6)
      .luck
        background-color #E4F1FE
        font-size 12px
        color #288EFB
        padding 0 2px
      .share
        background-color #DCF2E8
        font-size 12px
        color #3ECF8B
        padding 0 2px
      .jian
        background-color #FFEAEE
        font-size 12px
        color #EB5984
        padding 0 2px
    .blessing
      font-size 12px
      color #5D4220
      line-height rem(18)
      text-align center
      padding rem(8) rem(30)
    .send-time
      display flex
      justify-content space-between
      padding rem(16)
      font-size 12px
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
    height rem(26)
    line-height rem(26)
    background-color #F8F8F8
    word-break break-all
    resize none
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
      font-size 14px
      font-weight 500
      display flex
      height rem(50)
      align-items center
      justify-content space-between
      border-bottom 1px solid #F9F9F9
</style>
