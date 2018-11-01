<template>
  <div class="red-envelope">
    <top-bar :title="$t('发红包')" />
    <tab :card-show="false" @click="handleTabClick">
      <tab-item name="MULTY_NORMAL" :label="$t('普通红包')" />
      <tab-item name="MULTY_RANDOM" :label="$t('拼手气红包')" />
    </tab>
    <div class="red-envelope_wrap">
      <LimitInput v-show="scatterIsConnect" numberType="float" :placeholder="$t('填写红包金额')" :left-label="$t('红包金额')" right-label="EOS" v-model="redInfo.amount" />
      <LimitInput numberType="int" :placeholder="$t('填写个数')" :left-label="$t('红包个数')" :right-label="$t('个')" v-model="redInfo.number" />
      <div class="red-textarea">
        <textarea :placeholder="$t('恭喜发财，大吉大利')" v-model="redInfo.blessing" maxLength="30"></textarea>
      </div>
      <p class="warn-title"><span>{{$t('红包金额以实际转账为准')}}</span><a href="/redabout"><Iconfont name="icon-bangzhutishi" class="iconfont"/></a></p>

      <div class="submit">
        <my-button @click="handleSubmit" :label="$t('塞钱进红包')" />
      </div>
    </div>
    <div class="warn-foot">
      <small>{{$t('未领取的红包，将于转账成功24小时后发起退款')}}</small>
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
import ScatterJS from 'scatterjs-core'

export default {
  name: 'red-envelope',
  components: {
    TopBar, Tab, TabItem, MyButton, Iconfont, LimitInput
  },
  data () {
    return {
      curTab: 'MULTY_NORMAL',
      scatterIsConnect: false,
      redInfo: {
        number: '',
        amount: '',
        blessing: ''
      },
      defaultBlessing: this.$t('恭喜发财，大吉大利')
    }
  },
  created () {
    ScatterJS.scatter.connect(this.$store.state.projectName).then(connected => {
      if (!connected) return false
      this.scatterIsConnect = true
    }).catch(e => {
      this.scatterIsConnect = false
    })
  },
  methods: {
    handleSubmit () {
      if (this.scatterIsConnect) {
        if (!this.redInfo.amount) {
          window.tip(this.$t('请输入红包金额'))
          return false
        } else if ((this.redInfo.amount / this.redInfo.number) < 0.001) {
          window.tip(this.$t('红包金额不能低于0.001EOS'))
          return false
        }
      }
      if (!this.redInfo.number) {
        window.tip(this.$t('请输入红包个数'))
        return false
      }
      let uuid = utils.getUUID()
      // COUPONCREATE-红包id-红包类型-红包个数-pubkey-祝福语
      let packetStr = 'REDPACKET-' + this.curTab + '-' + uuid + '-' + this.redInfo.number + '-' + localStorage.getItem(this.$store.state.redPubKeyName) + '-' + (this.redInfo.blessing || this.defaultBlessing)

      this.$router.push({path: 'myred', query: {packetStr, amount: this.redInfo.amount, uuid: uuid, type: this.curTab, limit: this.redInfo.number, blessing: (this.redInfo.blessing || this.defaultBlessing)}})
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
      align-items center
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
