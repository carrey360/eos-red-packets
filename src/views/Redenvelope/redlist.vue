<template>
  <div class="red-list">
    <top-bar title="红包列表" />
    <div class="red-list_wrap">
      <div class="item_header"><span>EOS QTY</span><span>STATUS</span></div>
      <div class="item">
        <div class="item_left">
          <span>--</span>
          <span class="luck">Luck</span>
        </div>
        <div class="item_right">
          <span class="await_pay">Awaiting payment</span>
        </div>
      </div>
      <div class="item">
        <div class="item_left">
          <span class="num">2.24325</span><span class="coin">EOS</span>
          <span class="share">Share</span>
          <count-down :count-date="44296" />
        </div>
        <div class="item_right">
          <span>2/12</span>
        </div>
      </div>
      <div class="item">
        <div class="item_left">
          <span class="num">2.24325</span><span class="coin">EOS</span>
          <span class="luck">Luck</span>
        </div>
        <div class="item_right">
          <span>6/6</span>
        </div>
      </div>
      <div class="item">
        <div class="item_left">
          <span class="num">2.24325</span><span class="coin">EOS</span>
          <span class="share">Share</span>
          <count-down :count-date="44296" />
        </div>
        <div class="item_right">
          <span class="expired">Expired</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from '@/components/topBar'
import CountDown from '@/components/Countdown'
export default {
  name: 'red-list',
  components: {
    TopBar, CountDown
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
          font-size rem(26)
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
