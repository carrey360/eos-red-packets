<template>
  <div class="my-red">
    <top-bar title="发红包" />
    <div class="my-red_wrap">
      <p>请让朋友按照以下信息转账 </p>
      <small>或</small>
      <p>从交易所提币 </p>
      <div class="warn_user">
        目前明确支持的交易所有 OTCBTC、Gate.io、Chaince、 Bitfinex、OKcoin，请不要从其他交易所转入，避免财产损失
      </div>
      <div class="text-box">
        <p><span>收款账户</span><span>复制</span></p>
        <div class="text">
          <input disabled="disabled" type="text" value="固定账号" />
        </div>
      </div>
      <div class="text-box">
        <p><span>备注</span><span>复制</span></p>
        <div class="text">
          <textarea disabled="disabled" cols="3" rows="6" v-model="packetStr"></textarea>
        </div>
      </div>
      <div class="my-red_btn">
        <my-button label="我塞的红包" />
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from '@/components/topBar'
import MyButton from '@/components/Button'
export default {
  name: 'my-red',
  components: {
    TopBar, MyButton
  },
  data () {
    return {
      packetStr: ''
    }
  },
  created () {
    let query = this.$route.query
    this.packetStr = query.packetStr
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
      font-size rem(16)
    .warn_user
      font-size rem(12)
      color #A69987
      margin 12px 0 24px
    .text-box
      margin-bottom 24px
      & > p
        display flex
        justify-content space-between
        font-size rem(12)
        & > span:first-child
          color #5D4220
        & > span:last-child
          color #288EFB
      .text
        min-height 48px
        width 100%
        margin-top 4px
        background-color #F8F8F8
        input, textarea
          background-color #F8F8F8
          padding 13px 15px
          box-sizing border-box
          outline none
          border none
          width 100%
          height 100%
          resize none
    .my-red_btn
      margin-top 64px
</style>
