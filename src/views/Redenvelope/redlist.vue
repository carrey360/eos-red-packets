<template>
  <div class="red-list">
    <top-bar :title="$t('红包列表')" :showHome="showHome"/>
    <div class="red-list_wrap">
      <div class="item_header"><span>EOS {{$t('数量')}}</span><span>{{$t('状态')}}</span></div>

      <div class="item" @click="detail(item.id)" v-for="(item, key) in historyList" :key="key">
        <div class="item_left">
          <span class="num">{{ item.amount }}</span>
          <span v-if="item.type == 1" class="luck">{{$t('普')}}</span>
          <span v-if="item.type == 2" class="share">{{$t('拼')}}</span>
          <span v-if="item.type == 3" class="jian">{{$t('建')}}</span>
          <count-down v-if="item.countDate" :count-date="item.countDate"/>
        </div>
        <div class="item_right">
          <span>{{ item.log.length }}/{{ item.limit }}</span>
        </div>
      </div>
      <div v-show="historyList.length == 0" class="list-noData">{{$t('暂无数据')}}</div>

    </div>
    <loading v-if='showLoading'></loading>
  </div>
</template>
<script>
import TopBar from '@/components/topBar'
import CountDown from '@/components/Countdown'
import loading from '@/components/loading'
import {hash2Ggc} from '@/utils/murmurhash2_gc'
import { getTableRow } from '@/utils/'
import ecc from 'eosjs-ecc'

export default {
  name: 'red-list',
  components: {
    TopBar, CountDown, loading
  },
  data () {
    return {
      showHome: true,
      curUserPublik: localStorage.getItem(this.$store.state.redPubKeyName),
      showLoading: true,
      historyList: []
    }
  },
  created () {
    let publicKeyBuffer = ecc.PublicKey(this.curUserPublik).toBuffer()
    let publicKeyArray = Array.prototype.slice.call(publicKeyBuffer)

    let lowerBoundArray = []
    publicKeyArray.map(item => {
      lowerBoundArray.push(String.fromCharCode(item))
    })

    let hash = hash2Ggc(lowerBoundArray.join(''), 0)

    let params = {
      json: true,
      code: this.$store.state.tranAccountName,
      scope: this.$store.state.tranAccountName,
      table: 'redpacket',
      lower_bound: hash,
      upper_bound: hash + 1,
      key_type: 'i64',
      index_position: 4,
      limit: 50
    }
    this.getTableRowsForAjax(params)
  },
  methods: {
    detail (id) {
      this.$router.push({path: 'detail', query: {id: id}})
    },
    getTableRowsForAjax (params) {
      let _that = this
      getTableRow(this, params, function (response) {
        _that.handleResponse(response)
      }, function () {
        window.tip(_that.$t('失败'))
        _that.showLoading = false
      })
    },
    handleResponse (response) {
      if (response.rows) {
        let filterArray = response.rows.filter(item => item.pubkey === this.curUserPublik)
        let result = filterArray.map(item => {
          let nowTime = parseInt((new Date()).getTime() / 1000)
          if (item.expire > nowTime) {
            item.countDate = item.expire - nowTime
          }
          return item
        })
        this.historyList = result
      } else {
        window.tip(response.error)
      }
      this.showLoading = false
    }
  }
}
</script>
<style lang="stylus" scoped>
.red-list
  &_wrap
    .item_header
      height 30px
      padding 0 rem(15)
      display flex
      justify-content space-between
      align-items center
      background-color #F8F8F8
      font-size 14px
    .item
      display flex
      justify-content space-between
      align-items center
      padding 0 rem(15)
      height rem(72.5)
      border-bottom 1px solid #F9F9F9
      &_left
        display flex
        align-items center
        & > span
          margin-right rem(6)
          font-size rem(12)
        .num
          font-size rem(22)
          color #5D4220
        .coin
          color #5D4220
        .luck
          color #288EFB
          font-family Avenir-Medium
          background-color rgba(40, 142, 251, 0.1)
          padding 2px 3px
        .share
          color #3ECF8B
          font-family Avenir-Medium
          background-color rgba(62, 207, 139, 0.1)
          padding 2px 3px
        .jian
          background-color #FFEAEE
          font-family Avenir-Medium
          color #EB5984
          padding 2px 3px
      &_right
        max-width 66px
        text-align right
        & > span
          font-size rem(14)
          color #5D4220
        .await_pay
          color #FF9200
        .expired
          color #C9C2B7
</style>
