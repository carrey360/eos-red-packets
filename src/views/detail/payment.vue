<template>
  <div class="payment-warrap">
    <topBar title="红包详情" :showHome="showHome"></topBar>
    <div class="dispatch-info">
      <img src="@/assets/red-top.png"/>
      <div class="from">From HIf528fed125</div>
      <div class="total">Total<span class="amount">256.6666</span> EOS <span class="share">share</span></div>
      <div class="blessing">恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财</div>
    </div>

    <div class="payment-status">
      <span>待支付</span>
    </div>

    <div class="copy-content">
      <div class="title"><p>账号</p><p class="copy account" :data-clipboard-text="account" @click="copy('.account')">复制</p></div>
      <div class="common-input">{{ account }}</div>

      <div class="title"><p>MEMO</p><p class="copy memo" :data-clipboard-text="memo" @click="copy('.memo')">复制</p></div>
      <div class="packet-number common-input">{{ memo }}</div>
    </div>

    <div class="tip">
      <p>Instructions:</p>
      <p>1. Copy memo</p>
      <p>2. Go to any supported app/website to continue the payment</p>
      <p>3. Refresh “sent packets page”</p>
    </div>

    <div class="cancle">取消</div>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import IconFont from '@/components/Iconfont'
import Clipboard from 'clipboard'

export default {
  name: 'payment',
  components: { topBar, IconFont },
  data () {
    return {
      showHome: true,
      account: '',
      memo: ''
    }
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.payment-warrap
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
  .copy-content
    margin 0 rem(16)
    padding-bottom rem(16)
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
    width calc(100% - 10px)
    border 0 none
    padding-left 10px
    margin-top 4px
    height rem(74)
    background-color #F8F8F8
  .packet-number
    height rem(158)
  .payment-status
    color #FF9200
    font-size 12px
    text-align center
    margin-top rem(16)
    span
      background-color #FFF5E8
      padding 4px 8px
      border-radius 2px
  .tip
    color #A69987
    font-size 12px
    margin rem(16)
    padding-bottom rem(40)
    p
      line-height rem(20)
  .cancle
    margin rem(22) rem(16)
    background-color #FCDBB2
    height rem(50)
    line-height rem(50)
    text-align center
    border-radius 2px
    color #5D4220
</style>
