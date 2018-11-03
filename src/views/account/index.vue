<template>
  <div class="account-warrap">
    <topBar :title="$t('创建EOS账号')" :showHome="showHome"></topBar>
    <div class="account-content">
      <div class="title"><p>{{$t('账号')}}</p></div>
      <LimitInput :placeholder="$t('请输入您的账号')" :isNumber="false" v-model="userInput.accountName"/>
      <div class="input-tip">{{$t('12位字符，需包含数字1-5和字母a-z两种元素')}}</div>

      <div class="title">
        <p>{{$t('公钥')}}</p>
        <p v-if="!hasRedCreateSuc" class="copy" @click="createKey">{{$t('生成新公钥')}}</p>
        <p v-else class="copy publickey" :data-clipboard-text="userInput.publickey" @click="copy('.publickey')">{{$t('复制')}}</p>
      </div>
      <textarea class="public-key common-input" :placeholder="$t('请输入公钥')" v-model="userInput.publicKey"></textarea>
      <div class="input-tip">{{$t('所有者和使用者公钥相同')}}</div>

      <div class="title">
        <p>{{$t('私钥')}}</p>
        <p v-if="userInput.privateKey" class="copy privateKey" :data-clipboard-text="userInput.privateKey" @click="copy('.privateKey')">{{$t('复制')}}</p>
      </div>
      <div class="private-key common-input">{{ userInput.privateKey }}</div>
      <div class="input-tip red">{{$t('不要透露给任何人')}}</div>

      <div class="title"><p>{{$t('红包串号')}}({{$t('选填')}})</p></div>
      <textarea class="packet-number common-input" v-model="packetNumber"></textarea>

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

      <div v-show="!hasRedCreateSuc" class="button" @click="create">{{$t('创建账号')}}</div>
      <div v-show="hasRedCreateSuc" class="button disabled">{{$t('创建账号')}}</div>
    </div>
    <modal v-show="modalData.showDailog" :modalData="modalData" @leftBtnAction="leftBtnAction" @rightBtnAction="rightBtnAction"></modal>
    <loading v-if='showLoading'></loading>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import modal from '@/components/dialog'
import loading from '@/components/loading'
import ecc from 'eosjs-ecc'
import LimitInput from '@/components/LimitInput'
import { formatePacket, copy } from '@/utils/'
import { Api, JsonRpc, JsSignatureProvider } from 'eosjs'
import { TextDecoder, TextEncoder } from 'text-encoding'

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
        'btn': [{text: this.$t('否')}, {text: this.$t('是')}]
      },
      packetNumber: this.$store.state.code,
      showLoading: false,
      userInput: {
        accountName: '',
        publicKey: '',
        privateKey: ''
      }
    }
  },
  methods: {
    leftBtnAction () {
      this.modalData.showDailog = false
    },
    rightBtnAction () {
      let formatCode = formatePacket(this.packetNumber)
      if (this.packetNumber && formatCode.isMemo) {
        this.packetCreate()
      } else {
        this.$router.push({path: 'acTransfer', query: this.userInput})
      }
    },
    create () {
      if (!this.userInput.accountName) {
        window.tip(this.$t('请输入您的账号'))
        return false
      } else if (this.userInput.accountName.length !== 12) {
        window.tip(this.$t('请输入12位有效账号'))
        return false
      } else if (!this.userInput.publicKey) {
        window.tip(this.$t('请输入公钥'))
        return false
      }
      // 通过红包串创建账号
      if (this.packetNumber) {
        let formatCode = formatePacket(this.packetNumber)
        if (!formatCode.isMemo) {
          window.tip(this.$t('请正确输入红包串号'))
          return false
        } else if (formatCode.isMemo) {
          this.modalData.content = this.$t('确定要用该红包创建账号')
          this.modalData.showDailog = true
        }
      } else {
        if (this.userInput.privateKey) {
          this.modalData.content = this.$t('确定私钥已保存安全位置')
          this.modalData.showDailog = true
        } else {
          this.$router.push({path: 'acTransfer', query: this.userInput})
        }
      }
    },
    packetCreate () {
      this.modalData.showDailog = false
      this.$nextTick(() => {
        this.showLoading = true
        const rpc = new JsonRpc(this.$store.state.eosjsConfig.endpoint)
        const signatureProvider = new JsSignatureProvider([this.$store.state.defaultPrivateKey])
        const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()})
        this.packetCreateAction(api).then(result => {
          // 跳转
          this.showLoading = false
          if (result && result.transaction_id) {
            window.tip(this.$t('创建账号成功'))
            this.hasRedCreateSuc = true
          } else {
            window.tip(result.error)
          }
        }).catch(() => {
          this.showLoading = false
          window.tip(this.$t('失败'))
        })
      })
    },
    async packetCreateAction (api) {
      let formatCode = formatePacket(this.packetNumber)

      let params = {
        account_to_create: this.userInput.accountName,
        owner_key: this.userInput.publicKey,
        active_key: this.userInput.publicKey,
        id: +formatCode.uuid,
        sig: formatCode.sign
      }

      let result = await api.transact({
        actions: [{
          account: this.$store.state.tranAccountName,
          name: 'create',
          authorization: [{actor: this.$store.state.defaultAccount, permission: 'redpacket'}],
          data: params
        }]
      }, {blocksBehind: 3, expireSeconds: 300})
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
