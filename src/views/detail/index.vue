<template>
  <div class="receive-warrap">
    <topBar></topBar>
    <div class="dispatch-info">
      <img src="@/assets/red-top.png"/>
      <div class="from">From HIf528fed125</div>
      <div class="total">Total<span class="amount">256.6666</span> EOS <span class="luck">luck</span></div>
      <div class="blessing">恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财</div>
      <div class="send-time">
        <div>创建时间：2018-10-17 09:56</div>
        <div class="status"><IconFont name="icon-loudoudaojishi" type="svg" class="iconfont"/> 12:35</div>
      </div>
    </div>

    <div class="copy-content">
      <div class="title"><p>账号</p><p class="copy">复制</p></div>
      <div class="tip">Use this code to serch the packet amount</div>
      <div class="common-input"></div>

      <div class="title"><p>红包串号</p><p class="copy">复制</p></div>
      <div class="tip">Share this code to your friends via IM</div>
      <div class="packet-number common-input"></div>
    </div>

    <div class="fengeline"></div>

    <div class="amount-info">Redeemed 4/5, 99.8547/256.666 EOS</div>
    <ul class="receive-list">
      <li><div>HIf528fed125</div><div>0.1254 EOS</div></li>
      <li><div>HIf528fed125</div><div>0.1254 EOS</div></li>
      <li><div>HIf528fed125</div><div>0.1254 EOS</div></li>
      <li><div>HIf528fed125</div><div>0.1254 EOS</div></li>
      <li><div>HIf528fed125</div><div>0.1254 EOS</div></li>
      <li><div>HIf528fed125</div><div>0.1254 EOS</div></li>
      <li><div>HIf528fed125</div><div>0.1254 EOS</div></li>
      <li><div>HIf528fed125</div><div>0.1254 EOS</div></li>
      <li><div>HIf528fed125</div><div>0.1254 EOS</div></li>
      <li><div>HIf528fed125</div><div>0.1254 EOS</div></li>
      <li><div>HIf528fed125</div><div>0.1254 EOS</div></li>
      <li><div>HIf528fed125</div><div>0.1254 EOS</div></li>
    </ul>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import IconFont from '@/components/Iconfont'

export default {
  name: 'receive',
  components: { topBar, IconFont },
  data () {
    return {
      account: '',
      showError: false,
      errorMsg: '账号错误'
    }
  },
  methods: {
    receive () {
      if (this.account) {
        this.$router.push('success')
      } else {
        this.showError = true
        this.errorMsg = '请输入账号'
        let timeout = ''
        timeout = setTimeout(() => {
          this.showError = false
          clearTimeout(timeout)
        }, 1000)
      }
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
    width calc(100% - 10px)
    border 0 none
    padding-left 10px
    margin-top 4px
    height rem(74)
    background-color #F8F8F8
  .packet-number
    height rem(158)
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
