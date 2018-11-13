<template>
  <div class="red-envelope">
    <top-bar :title="$t('发红包')" />
    <tab :card-show="false" @click="handleTabClick">
      <tab-item name="MULTY_NORMAL_ACCOUNT" :label="$t('普通红包')" />
      <tab-item name="MULTY_RANDOM_ACCOUNT" :label="$t('拼手气红包')" />
    </tab>
    <div class="sendPacket"><router-link to="redlist">{{$t('我塞的红包')}}</router-link></div>
    <div class="red-envelope_wrap">
      <LimitInput v-show="!!scatter" numberType="float" :placeholder="$t('最少0.1')" :left-label="$t('红包金额')" right-label="EOS" v-model="redInfo.amount" />
      <LimitInput numberType="int" :placeholder="$t('最多100')" maxValue='100' :left-label="$t('红包个数')" :right-label="$t('个')" v-model="redInfo.number" />
      <div class="red-textarea">
        <textarea :placeholder="$t('恭喜发财，大吉大利')" v-model="redInfo.blessing" maxLength="20"></textarea>
      </div>
      <p class="warn-title"><span>{{$t('红包金额以实际转账为准')}}</span><router-link to='redabout'><Iconfont name="icon-bangzhutishi" class="iconfont"/></router-link></p>

      <div class="submit">
        <my-button @click="handleSubmit" :label="$t('塞钱进红包')" />
      </div>
    </div>
    <div class="warn-foot">
      <small>{{$t('未领取的红包，将于转账成功24小时后发起退款')}}</small>
    </div>
    <loading v-show='showLoading'></loading>
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
import loading from '@/components/loading'
import ecc from 'eosjs-ecc'
import { transfer, generateMemo } from '@/utils'
import { mapState } from 'vuex'

let FLAG_GO = true

export default {
  name: 'red-envelope',
  components: {
    TopBar, Tab, TabItem, MyButton, Iconfont, LimitInput, loading
  },
  data () {
    return {
      curTab: 'MULTY_NORMAL_ACCOUNT',
      redInfo: {
        number: '',
        amount: '',
        blessing: ''
      },
      defaultBlessing: this.$t('恭喜发财，大吉大利'),
      packetCode: '',
      showLoading: false
    }
  },
  created () {
    if (!this.scatter) {
      this.$store.dispatch('connectScatter')
    }
    if (!this.$store.state.wsCache) {
      this.$store.commit('SetWebStorageCache', {})
    }
  },
  methods: {
    handleSubmit () {
      if (this.scatter) { // 有scatter钱包
        if (!this.redInfo.amount) {
          window.tip(this.$t('请输入红包金额'))
          return false
        } else if ((this.redInfo.amount) < 0.1) {
          window.tip(this.$t('红包金额不能低于0.1EOS'))
          return false
        }
      }
      if (!this.redInfo.number) {
        window.tip(this.$t('请输入红包个数'))
        return false
      }
      let uuid = utils.getUUID()
      let blessing = this.redInfo.blessing || this.defaultBlessing
      if (blessing.indexOf('-') > -1) {
        window.tip(this.$t('祝福语中不能包含'))
        return false
      }
      if (!FLAG_GO) {
        return false
      }
      FLAG_GO = false
      if (this.scatter) {
        this.showLoading = true
        const { scatterNetwork, tranAccountName, redPubKeyName } = this.$store.state
        const { amount, number } = this.redInfo
        const type = this.curTab
        // 生成红包的公私钥，使用红包的私钥生成签名
        ecc.randomKey().then(privateKey => {
          let redSelfPublicKey = ecc.privateToPublic(privateKey)
          const memo = generateMemo(type, uuid, number, localStorage.getItem(redPubKeyName), redSelfPublicKey, blessing)
          transfer(this.scatter, scatterNetwork, this.accountIdentity, tranAccountName, amount, memo).then(res => {
            window.tip(this.$t('转账成功'))
            this.showLoading = false
            FLAG_GO = true
            this.$store.state.wsCache && this.$store.state.wsCache.set('red_' + uuid, privateKey, {exp: 48 * 60 * 60}) // exp 单位秒
            this.$router.push({path: 'myred', query: {amount, uuid, type, limit: number, blessing, redSelfPublicKey, selfPrivateKey: privateKey}})
          }).catch(() => {
            this.showLoading = false
            FLAG_GO = true
            window.tip(this.$t('失败'))
          })
        })
      } else {
        FLAG_GO = true
        ecc.randomKey().then(privateKey => {
          let redSelfPublicKey = ecc.privateToPublic(privateKey)
          this.$router.push({path: 'myred', query: {amount: this.redInfo.amount, uuid: uuid, type: this.curTab, limit: this.redInfo.number, blessing: blessing, redSelfPublicKey, selfPrivateKey: privateKey}})
        })
      }
    },
    handleTabClick (value) {
      this.curTab = value
    }
  },
  computed: {
    ...mapState(['scatter', 'accountIdentity'])
  }
}
</script>
<style lang="stylus" scoped>
.red-envelope
  position relative
  .sendPacket
    position absolute
    right 16px
    top 55px
    z-index 100
    a
      font-size 14px
      text-decoration none
      color #288EFB
  &_wrap
    padding 24px 16px
    .red-textarea
      margin-top 24px
      background-color #F8F8F8
      font-size 16px
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
        font-size 14px
    .warn-title
      color #5D4220
      font-size 12px
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
    // position absolute
    bottom 16px
    text-align center
    width 100%
    font-size 14px
    color #C9C2B7
</style>
