<template>
  <div class="receive-warrap">
    <topBar></topBar>
    <div class="dispatch-info">
      <img src="@/assets/red-top.png"/>
      <div class="from">From HIf528fed125</div>
      <div class="total">Total<span class="amount">256.6666</span> EOS <span class="luck">luck</span></div>
      <div class="blessing">恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财恭喜发财</div>
      <div class="receive-info">
        <div>0.2586<span>EOS</span></div>
        <div>保存到您的EOS账号</div>
      </div>
      <div class="send-time">
        <div>创建时间：2018-10-17 09:56</div>
        <div class="status"><IconFont name="icon-loudoudaojishi" type="svg" class="iconfont"/> 12:35</div>
      </div>
    </div>
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
      showError: true,
      errorMsg: '账号错误'
    }
  },
  methods: {
    receive () {
      this.showError = true
      let timeout = ''
      timeout = setTimeout(() => {
        this.showError = false
        clearTimeout(timeout)
      }, 1000)
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
      .amount
        font-size rem(16)
        margin 0 rem(6)
      .luck
        background-color #E4F1FE
        font-size rem(12)
        color #288EFB
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
</style>
