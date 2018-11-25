<template>
  <div class="my-red">
    <top-bar :title="$t('发红包')" :showHome="showHome"/>
    <div class="my-red_wrap">
      <div v-show="!showScatterTransfer" class="step_box">
        <p>{{$t('第一步: 请按下面信息从交易所提币或通过EOS钱包转帐,完成后请点击[转账完成]按钮')}}<br/> </p>
      </div>
      <div v-show="!showScatterTransfer" class="text-box">
        <p><span>{{$t('收款账户')}}</span><span class="account" :data-clipboard-text="account" @click="copy('.account')">{{$t('复制')}}</span></p>
        <div class="text">
          <input disabled="disabled" type="text" :value="account" />
        </div>
      </div>
      <div v-show="!showScatterTransfer && totalAmount" class="text-box">
        <p><span>{{$t('红包总金额')}}</span><span class="account"></span></p>
        <div class="text totalAmount">
          <input disabled="disabled" type="text" :value="totalAmount" />
          <span>EOS</span>
        </div>
      </div>
      <div v-show="!showScatterTransfer" class="text-box">
        <p><span>{{$t('备注')}}</span><span class="remark" :data-clipboard-text="remark" @click="copy('.remark')">{{$t('复制')}}</span></p>
        <p class="tip_text">{{$t('转账时复制下面的信息到Memo')}}</p>
        <!-- <p class="tip_text">Copy the following informarion into Memo</p> -->
        <div class="text">
          <textarea disabled="disabled" cols="3" rows="5" v-model="remark"></textarea>
        </div>
      </div>
      <div v-show="!showScatterTransfer && packetStr" class="step_box btm_top">
        <p>{{$t('第二步: 复制并通过IM工具把[红包串]发送给你的朋友们')}}</p>
      </div>
      <div class="text-box" v-if="packetStr">
        <p><span>{{$t('红包串')}}</span><span class="packetStr" :data-clipboard-text="packetStr" @click="copy('.packetStr')">{{$t('复制')}}</span></p>
        <p class="tip_text">{{$t('通过IM工具将红包串发送给你的朋友')}}</p>
        <div class="text packetStr">
          <textarea class="packetStr" disabled="disabled" cols="3" rows="9" v-model="packetStr"></textarea>
        </div>
        <div class="router-link"><router-link to="redlist">{{$t('我塞的红包')}}</router-link></div>
      </div>
      <div v-show="!showScatterTransfer && !packetStr" class="submit">
        <my-button @click="handleSubmit" :label="$t('转账完成')" />
      </div>
      <loading v-show='showLoading'></loading>
    </div>
  </div>
</template>
<script>
import TopBar from '@/components/topBar'
import MyButton from '@/components/Button'
import loading from '@/components/loading'
import { copy, generatePacketCode, generateMemo, apiCreate } from '@/utils'

export default {
  name: 'my-red',
  components: {
    TopBar, MyButton, loading
  },
  data () {
    return {
      showLoading: false,
      showHome: true,
      packetStr: '',
      showScatterTransfer: !!this.$store.state.scatter,
      account: this.$store.state.tranAccountName
    }
  },
  created () {
    let query = this.$route.query
    // REDPACKET-红包类型-红包id-红包个数-pubkey-祝福语
    // this.remark = 'REDPACKET-' + query.type + '-' + query.uuid + '-' + query.limit + '-' + localStorage.getItem(this.$store.state.redPubKeyName) + '-' + query.blessing
    this.remark = generateMemo(query.type, query.uuid, query.limit, localStorage.getItem(this.$store.state.redPubKeyName), query.redSelfPublicKey, query.blessing)
    // 签名
    // let params = query.uuid + '_' + query.type + '_' + query.blessing
    // let privarekey = localStorage.getItem(this.$store.state.redPriKeyName)
    const lang = localStorage.getItem('redLang')
    // query.blessing + '-' + query.type + '-' + query.uuid + '-' + query.limit + '-' + ecc.sign(params, privarekey)
    if (query.hash) {
      this.packetStr = generatePacketCode(query.blessing, query.uuid, query.hash, lang)
    }
  },
  methods: {
    copy (className) {
      copy(className, this)
    },
    handleSubmit () {
      let _this = this
      const lang = localStorage.getItem('redLang')
      let {uuid, type, blessing, selfPrivateKey} = this.$route.query
      this.showLoading = true
      apiCreate(this, uuid, type, blessing, selfPrivateKey, function (res) {
        _this.showLoading = false
        if (res.code === 0) {
          _this.packetStr = generatePacketCode(blessing, uuid, res.data.hash, lang)
        } else {
          window.tip(_this.$t('server_' + res.code))
        }
      }, function () {
        _this.showLoading = true
        window.tip(_this.$t('失败'))
      })
    }
  },
  computed: {
    totalAmount: function () {
      let query = this.$route.query
      if (query.type === '3' && query.limit) {
        return (query.limit * 0.6).toFixed(4)
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import 'style.styl'
.my-red
  &_wrap
    padding 24px 16px
    & > small
      margin 6px 0
      display inline-block
      color #5D4220
    .step_box
      margin 0 0 18px -8px
      & > p
        color #A69987
        font-size 12px
        margin-bottom 12px
    .btm_top
      margin-top 12px
    .warn_user
      font-size 12px
      color #A69987
      margin 12px 0 24px
    .text-box
      margin-bottom 24px
      textBox()
      div.totalAmount
        display flex
        align-items center
        justify-content space-between
        span
          padding-right 10px
    .my-red_btn_wrapp
      margin-top 32px
      display flex
      justify-content space-between
      & > div
        width 100%
        &:first-child
          margin-right 10px
</style>
