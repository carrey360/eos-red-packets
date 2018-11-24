<template>
  <div class="red-envelope">
    <top-bar :title="$t('发红包')" showSended='1'/>
    <tab :card-show="false" @click="handleTabClick">
      <tab-item name="1" :label="$t('普通红包')" />
      <tab-item name="2" :label="$t('拼手气红包')" />
      <tab-item name="3" :label="$t('建账号红包')" />
    </tab>
    <div class="red-envelope_wrap">
      <div v-show="curTab != 3" class="currencyWrapp">
        <div>{{ $t('币种') }}</div>
        <div>
          <label v-for="(item, key) in currencyList" :key="key">
            <input type="radio" @change="radioChange(key)" name="currency" :checked="item.name == curCheckedCurrency.name" class="a-radio"><span class="b-radio"></span>{{ item.name }}
          </label>
        </div>
      </div>
      <LimitInput v-show="!!scatter && curTab != 3" numberType="float" :placeholder="$t('最少')+ curCheckedCurrency.min" :left-label="$t('红包金额')" :right-label="curCheckedCurrency.name" v-model="redInfo.amount" />
      <LimitInput v-show="!!scatter && curTab == 3" numberType="float" :placeholder="$t('最少0.6')" :left-label="$t('单个红包金额')" right-label="EOS" v-model="redInfo.amount" />
      <LimitInput numberType="int" :placeholder="$t('最多100')" maxValue='100' :left-label="$t('红包个数')" :right-label="$t('个')" v-model="redInfo.number" />
      <div class="warn-title total_amount" v-show="!!scatter && curTab == 3 && totalAmount">
        <small>{{$t('红包总金额')}}<i class="amount">{{ totalAmount }}EOS</i></small>
      </div>
      <div class="red-textarea">
        <textarea :placeholder="$t('恭喜发财，大吉大利')" v-model="redInfo.blessing" maxLength="30"></textarea>
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
import { transfer, generateMemo, apiCreate } from '@/utils'
import { mapState } from 'vuex'

let FLAG_GO = true

export default {
  name: 'red-envelope',
  components: {
    TopBar, Tab, TabItem, MyButton, Iconfont, LimitInput, loading
  },
  data () {
    return {
      curTab: '1',
      redInfo: {
        number: '',
        amount: '',
        blessing: ''
      },
      defaultBlessing: this.$t('恭喜发财，大吉大利'),
      packetCode: '',
      showLoading: false,
      currencyList: [
        {name: 'EOS', min: 0.1},
        {name: 'EGT', min: 100}
      ],
      curCheckedCurrency: {}
    }
  },
  created () {
    if (!this.scatter) {
      this.$store.dispatch('connectScatter')
    }
    if (!this.$store.state.wsCache) {
      this.$store.commit('SetWebStorageCache', {})
    }
    this.curCheckedCurrency = this.currencyList[0]
  },
  methods: {
    handleSubmit () {
      if (this.scatter) { // 有scatter钱包
        if (this.curTab === '3') {
          if (!this.redInfo.amount) {
            window.tip(this.$t('请输入单个红包金额'))
            return false
          } else if ((this.redInfo.amount) < 0.6) {
            window.tip(this.$t('单个红包金额不能低于0.6EOS'))
            return false
          }
        } else {
          if (!this.redInfo.amount) {
            window.tip(this.$t('请输入红包金额'))
            return false
          } else if ((this.redInfo.amount) < this.curCheckedCurrency.min) {
            window.tip(this.$t('红包金额不能低于') + this.curCheckedCurrency.min + this.curCheckedCurrency.name)
            return false
          }
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
        let { amount, number } = this.redInfo
        const type = this.curTab
        // 创建账号红包总金额
        if (this.curTab === '3') {
          amount = this.totalAmount
        }
        // 生成红包的公私钥，使用红包的私钥生成签名
        let _this = this
        ecc.randomKey().then(privateKey => {
          let redSelfPublicKey = ecc.privateToPublic(privateKey)
          const memo = generateMemo(type, uuid, number, localStorage.getItem(redPubKeyName), redSelfPublicKey, blessing)
          transfer(this.scatter, scatterNetwork, this.accountIdentity, tranAccountName, amount, memo, this.curCheckedCurrency.name).then(res => {
            apiCreate(this, uuid, type, blessing, privateKey, function (res) {
              if (res.code === 0) {
                window.tip(_this.$t('转账成功'))
                _this.showLoading = false
                FLAG_GO = true
                _this.$store.state.wsCache && _this.$store.state.wsCache.set('red_' + uuid, privateKey, {exp: 48 * 60 * 60}) // exp 单位秒
                _this.$router.push({path: 'myred', query: {amount, uuid, type, limit: number, blessing, redSelfPublicKey, selfPrivateKey: privateKey, hash: res.data.hash}})
              } else {
                _this.showLoading = false
                FLAG_GO = true
                window.tip(_this.$t('server_' + res.code))
              }
            }, function () {
              _this.showLoading = false
              FLAG_GO = true
              window.tip(_this.$t('失败'))
            })
          }).catch(() => {
            this.showLoading = false
            FLAG_GO = true
            window.tip(this.$t('失败'))
          })
        })
      } else {
        FLAG_GO = true
        let _this = this
        ecc.randomKey().then(privateKey => {
          let redSelfPublicKey = ecc.privateToPublic(privateKey)
          apiCreate(this, uuid, this.curTab, blessing, privateKey, function (res) {
            if (res.code === 0) {
              this.$store.state.wsCache && this.$store.state.wsCache.set('red_' + uuid, privateKey, {exp: 48 * 60 * 60}) // exp 单位秒
              this.$router.push({path: 'myred', query: {amount: this.redInfo.amount, uuid: uuid, type: this.curTab, limit: this.redInfo.number, blessing: blessing, redSelfPublicKey, selfPrivateKey: privateKey, hash: res.data.hash}})
            } else {
              window.tip(res.msg)
            }
          }, function () {
            window.tip(_this.$t('失败'))
          })
        })
      }
    },
    handleTabClick (value) {
      this.curTab = value
      this.redInfo.amount = ''
      if (value === 3) {
        this.curCheckedCurrency = this.currencyList[0]
      }
    },
    radioChange (key) {
      this.curCheckedCurrency = this.currencyList[key]
    }
  },
  computed: {
    ...mapState(['scatter', 'accountIdentity']),
    totalAmount: function () {
      if (this.curTab === '3' && this.redInfo.amount && this.redInfo.number) {
        return (this.redInfo.amount * this.redInfo.number).toFixed(4)
      } else {
        return ''
      }
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
      &.total_amount
        margin-top -4px
      .amount
        font-style normal
        font-size 12px
        margin-left 5px
        color #CD2243
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
  .currencyWrapp
    display flex
    background-color #f8f8f8
    margin-bottom 20px
    padding 16px
    font-size 14px
    justify-content space-between
    align-items center
    label
      margin-right 10px
    .a-radio
      display none
    .b-radio
      display inline-block
      border 1px solid #ccc
      width 14px
      height 14px
      border-radius 2px
      vertical-align middle
      margin-right 5px
      position relative
      margin-top -2px
    .b-radio:before
      content ''
      font-size 0
      width 10px
      height 10px
      background #A69987
      position absolute
      left 50%
      top 50%
      margin-left -5px
      margin-top -5px
      border-radius 2px
      display none
    .a-radio:checked~.b-radio:before
      display block
</style>
