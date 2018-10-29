<template>
  <div class="account-warrap">
    <topBar title="创建账号"></topBar>
    <div class="account-content">
      <div class="title"><p>账号</p></div>
      <input class="account-name common-input" type="text" placeholder="请输入账号名称" v-model="userInput.accountName"/>
      <div class="input-tip">12位字符，需包含数字1-5和字母a-z两种元素</div>

      <div class="title"><p>公钥</p><p class="copy" v-if="userInput.publicKey">复制</p><p class="copy" @click="createKey" v-else>生成新公钥</p></div>
      <textarea class="public-key common-input" placeholder="请输入新账号所有者的公钥" v-model="userInput.publicKey"></textarea>
      <div class="input-tip">所有者和使用者公钥相同</div>

      <div class="title"><p>私钥</p><p class="copy">复制保存</p></div>
      <div class="private-key common-input">{{ userInput.privateKey }}</div>
      <div class="input-tip red">不要透露给任何人</div>

      <div class="title"><p>红包串号(选填){{ $store.state.code }}</p></div>
      <textarea class="packet-number common-input" v-model="userInput.packetNumber"></textarea>

      <div class="account-tip">
        <p>创建提示</p>
        <p>创建账号会扣除部分EOS，剩余部分会转入账号内</p>
      </div>

      <div class="account-tip">
        <p>离线保存</p>
        <p>建议抄写或打印私钥后放置在安全地点保存</p>
      </div>

      <div class="account-tip">
        <p>请勿使用网络传输</p>
        <p>请勿通过网络工具传输私钥，例如用微信发送到电脑。一旦被黑 客获取造成不可挽回的资产损失</p>
      </div>

      <div class="button" @click="create">创建账号</div>
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

export default {
  name: 'account',
  components: { topBar, modal, loading },
  data () {
    return {
      modalData: {
        'showDailog': false,
        'title': '提示',
        'content': '确定私钥已保存安全位置',
        'btn': [{text: '否'}, {text: '是'}]
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
      this.$router.push({path: 'acTransfer', query: this.userInput})
    },
    create () {
      if (!this.userInput.accountName) {
        window.tip('请输入账号名称')
        return false
      } else if (!this.userInput.publicKey) {
        window.tip('请输入公钥')
        return false
      }
      if (this.userInput.privateKey) {
        this.modalData.content = '确定私钥已保存安全位置'
      }
      this.modalData.showDailog = true
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
      font-size 12px
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
