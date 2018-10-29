<template>
  <div class="red-envelope">
    <top-bar title="发红包" />
    <tab :card-show="false" @click="handleTabClick">
      <tab-item name="1" label="普通红包" />
      <tab-item name="2" label="拼手气红包" />
    </tab>
    <div class="red-envelope_wrap">
      <div class="red-input">
        <span>红包金额</span>
        <div>
          <input placeholder="0.001" type="number" v-model="redInfo.amount"/>
          <span>EOS</span>
        </div>
      </div>

      <div class="red-input">
        <span>红包个数</span>
        <div>
          <input placeholder="填写个数" type="number" v-model="redInfo.number"/>
          <span>个</span>
        </div>
      </div>

      <div class="red-textarea">
        <textarea placeholder="恭喜发财，大吉大利" v-model="redInfo.blessing"></textarea>
      </div>
      <p class="warn-title"><span>红包金额以实际转账为准</span> <a href="/redabout"><Iconfont name="icon-bangzhutishi" /></a></p>

      <div class="submit">
        <my-button @click="handleSubmit" label="塞钱进红包" />
      </div>
    </div>
    <div class="warn-foot">
      <small>未领取的红包，将于转账成功24小时后发起退款</small>
    </div>
  </div>
</template>
<script>
import TopBar from '@/components/topBar'
import Tab from '@/components/Tab'
import TabItem from '@/components/Tab/tabItem'
import MyButton from '@/components/Button'
import * as utils from '@/utils/'
import Iconfont from '@/components/Iconfont'

export default {
  name: 'red-envelope',
  components: {
    TopBar, Tab, TabItem, MyButton, Iconfont
  },
  data () {
    return {
      curTab: 1,
      redInfo: {
        number: '',
        amount: '',
        blessing: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      if (!this.redInfo.number) {
        window.tip('请输入红包个数')
        return false
      } else if (!this.redInfo.amount) {
        window.tip('请输入红包金额')
        return false
      } else if ((this.redInfo.amount / this.redInfo.number) < 0.001) {
        window.tip('单个红包金额不可低于0.001EOS')
        return false
      }
      let uuid = utils.getUUID()
      // COUPONCREATE-红包id-红包类型-红包个数-pubkey-祝福语
      let packetStr = 'COUPONCREATE-' + uuid + '-' + this.curTab + '-' + this.redInfo.number + '-' + localStorage.getItem(this.$store.state.redPubKeyName) + '-' + this.redInfo.blessing

      this.$router.push({path: 'myred', query: {packetStr}})
    },
    handleTabClick (value) {
      this.curTab = value
    }
  }
}
</script>
<style lang="stylus" scoped>
.red-envelope
  &_wrap
    padding 24px 16px
    .red-input
      background-color #F8F8F8
      height rem(26)
      display flex
      align-items center
      justify-content space-between
      padding 16px
      font-size rem(16)
      border-radius 3px
      margin-bottom rem(20)
      ::placeholder
        color #C9C2B7
      span
        color #5D4220
        font-size rem(16)
      input
        border-radius 4px
        border none
        box-sizing border-box
        color #606266
        display inline-block
        font-size inherit
        height 100%
        outline none
        padding 0 10px 0 15px
        background-color #F8F8F8
        text-align right
      input::-webkit-outer-spin-button, input::-webkit-inner-spin-button
        -webkit-appearance none
      input[type="number"]
        -moz-appearance textfield
    .red-textarea
      margin-top 24px
      background-color #F8F8F8
      font-size rem(16)
      height 48px
      padding 16px
      border-radius 3px
      ::-webkit-input-placeholder
        color #C9C2B7
      textarea
        background-color #F8F8F8
        border none
        width 100%
        height 100%
        outline none
        resize none
    .warn-title
      color #5D4220
      font-size rem(12)
      margin-top 4px
      display flex
      justify-content space-between
      svg
        width 16px
        height 16px
        margin-top 8px
    .submit
      margin-top 70px
  .warn-foot
    position fixed
    bottom 16px
    text-align center
    width 100%
    font-size rem(12)
    color #C9C2B7
</style>
