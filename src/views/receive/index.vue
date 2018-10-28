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
    <div class="inner-div"></div>
    <div class="error-tip" v-if="showError">{{ errorMsg }}</div>
    <div class="input-account">
      <input placeholder="请输入您的账号" v-model="account"/>
      <div class="no-account">还没有账号？<a href="/account">创建</a></div>
      <div class="button" @click="receive">领取</div>
    </div>
    <loading v-show='showLoading'></loading>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import IconFont from '@/components/Iconfont'
import loading from '@/components/loading'

export default {
  name: 'receive',
  components: { topBar, IconFont, loading },
  data () {
    return {
      account: '',
      showError: false,
      errorMsg: '账号错误',
      showLoading: false
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
  .inner-div
    height rem(160)
  .error-tip
    max-width 750px
    background-color #FFEAED
    text-align center
    color #CE2344
    font-size 12px
    position fixed
    // left 0
    bottom rem(160)
    height rem(34)
    line-height rem(34)
    width 100%
  .input-account
    text-align center
    position fixed
    max-width 750px
    // left 0
    bottom 0
    -webkit-transform translateZ(0)
    height rem(160)
    width 100%
    background-color #CE2344
    input
      margin-top rem(16)
      // padding rem(18) rem(16)
      padding-left 16px
      height 56px
      width calc(100% - 48px)
      border 0 none
      border-radius 2px
      &::placeholder
        color #C9C2B7
      &:focus
        outline none
    .no-account
      text-align right
      color #ffffff
      margin-top 4px
      padding-right rem(16)
      // width calc(100% - 32px)
      font-size 12px
      a
        text-decoration none
        color #FFF7C1
        font-size rem(12)
    .button
      background-color #FDEDD8
      height rem(38)
      line-height rem(38)
      width rem(120)
      border-radius rem(20)
      color #A69987
      font-size rem(14)
      margin 0 auto
</style>
