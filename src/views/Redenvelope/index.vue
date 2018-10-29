<template>
  <div class="red-envelope">
    <top-bar title="发红包" />
    <tab :card-show="false">
      <tab-item label="普通红包" />
      <tab-item label="拼手气红包" />
    </tab>
    <div class="red-envelope_wrap">
      <div class="red-input">
        <span>红包个数</span>
        <div>
          <input placeholder="填写个数" type="number" dir='rtl' />
          <span>个</span>
        </div>
      </div>
      <div class="red-textarea">
        <textarea placeholder="恭喜发财，大吉大利" ></textarea>
      </div>
      <p class="warn-title">红包金额以实际转账为准</p>
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
export default {
  name: 'red-envelope',
  components: {
    TopBar, Tab, TabItem, MyButton
  },
  methods: {
    handleSubmit () {
      this.$router.push({path: `/myred`})
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
      ::placeholder
        color #C9C2B7
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
