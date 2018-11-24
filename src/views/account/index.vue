<template>
  <div class="account-warrap">
    <topBar :title="$t('创建EOS账号')" :showHome="showHome"></topBar>
    <div class="account-content">
      <div class="title">
        <p>{{$t('账号')}}</p>
        <p class="copy eosAccount" :data-clipboard-text="userInput.accountName" @click="copy('.eosAccount')">{{$t('复制')}}</p>
      </div>
      <LimitInput :placeholder="$t('请输入您的账号')" :isNumber="false" v-model="userInput.accountName" :readonly="hasRedCreateSuc"/>
      <div class="input-tip">{{$t('12位字符，由字母a-z与数字1-5组成')}}</div>

      <div class="title">
        <p>{{$t('公钥')}}</p>
        <p v-if="!hasRedCreateSuc" class="copy" @click="createKey">{{$t('生成新公钥')}}</p>
        <p v-else class="copy publickey" :data-clipboard-text="userInput.publickey" @click="copy('.publickey')">{{$t('复制')}}</p>
      </div>
      <textarea class="public-key common-input" :placeholder="$t('请输入公钥')" v-model="userInput.publicKey" :readonly="hasRedCreateSuc"></textarea>
      <div class="input-tip">{{$t('所有者和使用者公钥相同')}}</div>

      <div class="title">
        <p>{{$t('私钥')}}</p>
        <p v-if="userInput.privateKey" class="copy privateKey" :data-clipboard-text="userInput.privateKey" @click="copy('.privateKey')">{{$t('复制')}}</p>
      </div>
      <div class="private-key common-input">{{ userInput.privateKey }}</div>
      <div class="input-tip red">{{$t('不要透露给任何人')}}</div>

      <div class="title"><p>{{$t('红包串')}}({{$t('选填')}})</p></div>
      <textarea disabled='disabled' class="packet-number common-input" v-model="packetNumber" :readonly="hasRedCreateSuc"></textarea>

      <div class="account-tip">
        <p>{{$t('创建提示')}}</p>
        <p>{{$t('创建账号会扣除部分EOS，剩余部分会转入账号内')}}</p>
      </div>

      <div class="account-tip">
        <p>{{$t('离线保存')}}</p>
        <p>{{$t('建议抄写或打印私钥后放置在安全地点保存')}}</p>
      </div>

      <div class="account-tip">
        <p>{{$t('请勿使用网络传输')}}</p>
        <p>{{$t('请勿通过网络工具传输私钥，例如用微信发送到电脑。一旦被黑客获取造成不可挽回的资产损失')}}</p>
      </div>

      <div v-show="!hasRedCreateSuc && !packetNumber" class="button" @click="create">{{$t('创建账号')}}</div>
      <div v-show="!hasRedCreateSuc && packetNumber" class="accountNc" id="__nc" style="margin-left:auto;margin-right:auto;width:80%;height:30px;margin-top:10px">
        <div id="nc"></div>
      </div>
      <!-- <div v-show="hasRedCreateSuc" class="button disabled">{{$t('创建账号')}}</div> -->
    </div>
    <modal v-show="modalData.showDailog" :modalData="modalData" @leftBtnAction="leftBtnAction" @rightBtnAction="rightBtnAction"></modal>
    <loading v-show='showLoading'></loading>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import modal from '@/components/dialog'
import loading from '@/components/loading'
import ecc from 'eosjs-ecc'
import LimitInput from '@/components/LimitInput'
import { formatePacket, copy, apiVerify } from '@/utils/'
import Eos from 'eosjs'

let FLAG_GO = true

export default {
  name: 'account',
  components: { topBar, modal, loading, LimitInput },
  data () {
    return {
      showHome: true,
      hasRedCreateSuc: false,
      modalData: {
        'showDailog': false,
        'title': this.$t('提示'),
        'content': '',
        'type': 'confirm',
        'btn': [{text: this.$t('否')}, {text: this.$t('是')}]
      },
      packetNumber: this.$store.state.code,
      showLoading: false,
      userInput: {
        accountName: '',
        publicKey: '',
        privateKey: ''
      },
      formatCodeObj: {},
      serverSig: '',
      nc: ''
    }
  },
  created () {
    let query = this.$route.query
    // 检查设备
    this.$store.commit('checkTerminal', {})

    // 如果从领取页面跳转过来设置默认值
    if (query.from === 'receive') {
      this.userInput = {
        accountName: query.accountName,
        publicKey: query.publicKey,
        privateKey: query.privateKey
      }
      this.modalData.content = this.$t('创建账号成功，请将私钥保存到安全位置')
      this.modalData.showDailog = true
      this.modalData.type = 'sure'
      this.hasRedCreateSuc = true
    }
    if (this.packetNumber) {
      let formatCode = formatePacket(this.packetNumber)
      this.formatCodeObj = formatCode
    }
  },
  mounted () {
    this.initNoCaptcha()
  },
  methods: {
    initNoCaptcha () {
      let _this = this
      let NoCaptcha = window.NoCaptcha
      let language = localStorage.getItem('redLang') || 'cn'
      let ncToken = ['FFFF0N00000000007256', (new Date()).getTime(), Math.random()].join(':')
      this.nc = NoCaptcha.init({
        renderTo: '#nc',
        appkey: 'FFFF0N00000000007256',
        scene: _this.$store.state.captchaScene,
        token: ncToken,
        // trans: {'key1': 'code200'},
        elementID: ['usernameID'],
        is_Opt: 0,
        language: language,
        timeout: 10000,
        retryTimes: 5,
        errorTimes: 5,
        inline: true,
        apimap: {},
        bannerHidden: false,
        initHidden: false,
        callback: function (data) {
          _this.captchaResponse(ncToken, data.csessionid, data.sig)
        },
        error: function (s) {}
      })
      NoCaptcha.setEnabled(true)
      this.nc.reset() // 请务必确保这里调用一次reset()方法
    },
    captchaResponse (ncToken, sessionid, sig) {
      let _this = this
      apiVerify(this, this.formatCodeObj.uuid, this.formatCodeObj.h, sessionid, sig, ncToken, function (res) {
        if (res.code === 0) {
          _this.serverSig = res.data.sig
          _this.create()
        } else {
          window.tip(_this.$t('server_' + res.code))
          this.nc.reset()
        }
      })
    },
    leftBtnAction () {
      this.modalData.showDailog = false
    },
    rightBtnAction () {
      if (this.hasRedCreateSuc) {
        this.modalData.showDailog = false
        return false
      }
      this.$router.push({path: 'acTransfer', query: this.userInput})
    },
    create () {
      if (!FLAG_GO) {
        return false
      }
      FLAG_GO = false
      if (!this.userInput.accountName) {
        FLAG_GO = true
        window.tip(this.$t('请输入您的账号'))
        this.nc && this.nc.reset()
        return false
      } else if (this.userInput.accountName.length !== 12) {
        FLAG_GO = true
        window.tip(this.$t('请输入12位有效账号'))
        this.nc && this.nc.reset()
        return false
      } else if (!this.userInput.publicKey) {
        FLAG_GO = true
        window.tip(this.$t('请输入公钥'))
        this.nc && this.nc.reset()
        return false
      }
      // 通过红包串创建账号
      if (this.packetNumber) {
        this.showLoading = true
        this.$nextTick(() => {
          if (!this.formatCodeObj.isMemo) {
            this.showLoading = false
            FLAG_GO = true
            window.tip(this.$t('请正确输入红包串'))
            this.nc && this.nc.reset()
            return false
          } else if (this.formatCodeObj.isMemo) {
            this.packetCreate()
          }
        })
      } else {
        if (this.userInput.privateKey) {
          this.modalData.content = this.$t('确定私钥已保存安全位置')
          this.modalData.showDailog = true
          this.modalData.type = 'confirm'
        } else {
          this.$router.push({path: 'acTransfer', query: this.userInput})
        }
      }
    },
    packetCreate () {
      this.packetCreateAction().then(result => {
        // 跳转
        FLAG_GO = true
        this.showLoading = false
        if (result && result.transaction_id) {
          this.modalData.content = this.$t('创建账号成功，请将私钥保存到安全位置')
          this.modalData.showDailog = true
          this.modalData.type = 'sure'
          this.hasRedCreateSuc = true
        } else {
          window.tip(result.error)
        }
      }).catch((res) => {
        FLAG_GO = true
        this.showLoading = false
        window.tip(this.$t('创建账号失败，可能账号已存在或红包金额不足'))
      })
    },
    packetCreateAction () {
      let eos = Eos(this.$store.state.eosConfig)
      let formatCode = this.formatCodeObj

      let params = {
        account_to_create: this.userInput.accountName,
        owner_key: this.userInput.publicKey,
        active_key: this.userInput.publicKey,
        id: +formatCode.uuid,
        sig: this.serverSig
      }

      let result = eos.transaction({
        actions: [{
          account: this.$store.state.tranAccountName,
          name: 'create',
          authorization: [{actor: this.$store.state.defaultAccount, permission: 'redpacket'}],
          data: params
        }]
      })

      return result
    },
    createKey () {
      this.showLoading = true
      this.$nextTick(() => {
        ecc.randomKey().then(privateKey => {
          this.showLoading = false
          this.userInput.privateKey = privateKey
          this.userInput.publicKey = ecc.privateToPublic(privateKey)
        }).catch(() => {
          this.showLoading = false
        })
      })
    },
    copy (className) {
      copy(className, this)
    }
  }
}
</script>

<style lang="stylus" scoped>
.account-warrap
  .account-content
    padding 0 rem(16)
    padding-bottom rem(24)
    .title
      margin-top rem(24)
      display flex
      justify-content space-between
      font-size 14px
      color #5D4220
      .copy
        color #288EFB
        font-size 14px
    .common-input
      width calc(100% - 20px)
      border 0 none
      padding 10px
      margin-top 4px
      word-break break-all
      resize none
      font-size 14px
      font-weight 300
      &:focus
        outline none
      &::placeholder
        color #C9C2B7
    .account-name
      height rem(28)
      line-height rem(28)
      background-color #F8F8F8
    .input-tip
      color #A69987
      font-size 12px
      margin-top 4px
      text-align left
    .public-key
      height rem(70)
      background-color #F1FDF5
    .private-key
      height rem(70)
      background-color #FBF2F2
    .red
      color #CE2344
    .packet-number
      width calc(100% - 22px)
      height rem(158)
      padding rem(12)
      background-color #FFFCDD
    .account-tip
      margin-top rem(24)
      text-align left
      color #5D4220
      font-size 12px
      line-height rem(20)
      font-weight 400
      p:first-child
        font-weight 500
        font-size 14px
    .button
      margin rem(24) auto
      margin-bottom 0
      height 50px
      line-height 50px
      color #5D4220
      background-color #FCDBB2
      border-radius 2px
      font-weight 500
      width 100%
      font-size 16px
      text-align center
      &.disabled
        color #A69987
        background-color #FDEDD8
</style>
