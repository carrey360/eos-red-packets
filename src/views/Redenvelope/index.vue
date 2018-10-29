<template>
  <div class="red-envelope">
    <top-bar title="发红包" />
    <tab :card-show="false" @click="handleTabClick">
      <tab-item name="first" label="普通红包" />
      <tab-item name="secound" label="拼手气红包" />
    </tab>
    <div class="red-envelope_wrap">
      <LimitInput numberType="int" placeholder="填写个数" left-label="红包个数" right-label="个"
                v-model="redInfo.number" />
      <LimitInput numberType="float" placeholder="填写红包金额" left-label="红包金额" right-label="EOS"
                v-model="redInfo.amount" />
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
import LimitInput from '@/components/LimitInput'
export default {
  name: 'red-envelope',
  components: {
    TopBar, Tab, TabItem, MyButton, Iconfont, LimitInput
  },
  data () {
    return {
      redInfo: {
        number: '',
        amount: ''
      }
    }
  },
  created () {
    console.log(utils.getUUID())
  },
  methods: {
    handleSubmit () {
      this.$router.push({path: `/myred`})
    },
    handleTabClick (value) {
      console.log(value, 'tab点击')
    }
  }
}
</script>
<style lang="stylus" scoped>
.red-envelope
  &_wrap
    padding 24px 16px
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
