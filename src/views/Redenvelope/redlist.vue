<template>
  <div class="red-list">
    <top-bar title="红包列表" />
    <div class="red-list_wrap">
      <div class="item_header"><span>EOS {{$t('数量')}}</span><span>{{$t('状态')}}</span></div>
      <!-- <div class="item" @click="detail(1)">
        <div class="item_left">
          <span>--</span>
          <span class="luck">Luck</span>
        </div>
        <div class="item_right">
          <span class="await_pay">Awaiting payment</span>
        </div>
      </div>
      <div class="item" @click="detail(2)">
        <div class="item_left">
          <span class="num">2.24325</span><span class="coin">EOS</span>
          <span class="share">Share</span>
          <count-down :count-date="44296" />
        </div>
        <div class="item_right">
          <span>2/12</span>
        </div>
      </div>
      <div class="item" @click="detail(2)">
        <div class="item_left">
          <span class="num">2.24325</span><span class="coin">EOS</span>
          <span class="luck">Luck</span>
        </div>
        <div class="item_right">
          <span>6/6</span>
        </div>
      </div>
      <div class="item" @click="detail(2)">
        <div class="item_left">
          <span class="num">2.24325</span><span class="coin">EOS</span>
          <span class="share">Share</span>
          <count-down :count-date="44296" />
        </div>
        <div class="item_right">
          <span class="expired">Expired</span>
        </div>
      </div> -->
      <div class="item" @click="detail(item.id)" v-for="(item, key) in historyList" :key="key">
        <div class="item_left">
          <span class="num">{{ item.amount }}</span>
          <span v-if="item.type == 4" class="share">{{$t('拼')}}</span>
          <span v-if="item.type == 3" class="luck">{{$t('普')}}</span>
          <count-down v-if="item.countDate" :count-date="item.countDate"/>
        </div>
        <div class="item_right">
          <span>{{ item.data.length }}/{{ item.limit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from '@/components/topBar'
import CountDown from '@/components/Countdown'
import { JsonRpc } from 'eosjs'

export default {
  name: 'red-list',
  components: {
    TopBar, CountDown
  },
  data () {
    return {
      historyList: []
    }
  },
  created () {
    let params = {
      json: true,
      code: this.$store.state.tranAccountName,
      scope: this.$store.state.tranAccountName,
      table: 'coupons',
      // lower_bound: '1146',
      // limit: 1,
      key_type: 'i64',
      index_position: '1'
    }
    const rpc = new JsonRpc(this.$store.state.eosjsConfig.endpoint)
    this.getTableRows(rpc, params)
  },
  methods: {
    detail (id) {
      this.$router.push({path: 'detail', query: {id: id}})
    },
    async getTableRows (rpc, params) {
      const response = await rpc.get_table_rows(params)
      if (response.rows) {
        let result = response.rows.map(item => {
          let nowTime = parseInt((new Date()).getTime() / 1000)
          if (item.expire > nowTime) {
            item.countDate = item.expire - nowTime
          }
          return item
        })
        this.historyList = result
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.red-list
  &_wrap
    .item_header
      height rem(26)
      padding 0 rem(15)
      display flex
      justify-content space-between
      align-items center
      background-color #F8F8F8
      font-size rem(12)
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
