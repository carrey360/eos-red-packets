<template>
  <div class="receive-warrap">
    <topBar title="领红包" :showHome="showHome"></topBar>
    <div class="dispatch-info">
      <img src="@/assets/red-top.png"/>
      <div class="from">From {{ info.sender }}</div>
      <div class="total">
        Total<span class="amount">{{ info.amount }}</span>
        <span v-if="info.type == 3" class="luck">{{$t('普')}}</span>
        <span class="share" v-if="info.type == 4">{{$t('拼')}}</span>
      </div>
      <div class="blessing">{{ info.memo }}</div>
      <div class="receive-info">
        <div>{{ claimAmount }}</div>
        <div>{{$t('保存到您的EOS账号')}}</div>
      </div>
      <div class="send-time">
        <div>{{$t('创建时间')}}：{{ info.expire | formatDate('YYYY-MM-DD HH:mm') }}</div>
        <div class="status"><count-down v-if="info.countDate" :count-date="info.countDate"/></div>
      </div>
    </div>
    <div class="amount-info">{{$t('兑换')}} {{ info.data.length }}/{{ info.limit }}, 99.8547/{{ info.amount }}</div>
    <ul class="receive-list">
      <li v-for="(item, key) in info.data" :key="key" :class="item.isCurUser ? 'active' : ''"><div>HIf528fed125</div><div>0.1254 EOS</div></li>
    </ul>
    <loading v-if='showLoading'></loading>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import IconFont from '@/components/Iconfont'
import CountDown from '@/components/Countdown'
import loading from '@/components/loading'
import { formatDate } from '@/utils/filter'
import { JsonRpc } from 'eosjs'

export default {
  name: 'receive',
  components: { topBar, IconFont, CountDown, loading },
  data () {
    return {
      showHome: true,
      showLoading: true,
      curAccountName: '',
      claimAmount: '',
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
    this.curAccountName = query.accountName
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
    const rpc = new JsonRpc(this.$store.state.eosjsConfig.endpoint)
    this.getTableRows(rpc, params)
  },
  methods: {
    async getTableRows (rpc, params) {
      const response = await rpc.get_table_rows(params)
      if (response.rows) {
        let result = response.rows[0]
        let nowTime = parseInt((new Date()).getTime() / 1000)
        if (result.expire > nowTime) {
          result.countDate = result.expire - nowTime
        }
        result.expire = result.expire - 24 * 60 * 60
        result.data.map(item => {
          if (item.user === this.curAccountName) {
            item.isCurUser = true
            this.claimAmount = item.amount
          }
          return item
        })
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
      padding rem(10) rem(16) rem(16)
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
  .receive-info
    padding-top rem(6)
    background url(../../assets/success-bg.png) no-repeat 0 0
    height rem(94)
    margin 0 rem(16)
    background-size cover
    border 1px dashed #E6DFD9
    color #A69987
    font-size 12px
    text-align center
    & > div:first-child
      margin-top rem(8)
      font-size rem(44)
      color #5D4220
      span
        font-size 12px
        margin-left rem(12)
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
      &.active
        color #CE2344
</style>
