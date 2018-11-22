<template>
  <div class="receive-warrap">
    <topBar :title="$t('红包')"></topBar>
    <div class="inner-wrap">
      <div class="scroll-wrap">
        <div class="dispatch-info">
          <img src="@/assets/red-top.png"/>
          <div class="from">From {{ info.sender }}</div>
          <div class="total">
            Total<span class="amount">{{ info.amount }}</span>
            <span class="luck" v-if="info.type == 1">{{$t('普')}}</span>
            <span class="share" v-if="info.type == 2">{{$t('拼')}}</span>
            <span class="jian" v-if="info.type == 3">{{$t('建')}}</span>
          </div>
          <div class="blessing">{{ info.memo }}</div>
          <div class="send-time">
            <div>{{$t('创建时间')}}：{{ info.expire | formatDate('YYYY-MM-DD HH:mm') }}</div>
            <div class="status"><count-down v-if="info.countDate" :count-date="info.countDate"/></div>
          </div>
        </div>
        <div class="amount-info">{{$t('兑换')}} {{ info.log.length }}/{{ info.limit }}, {{receiveAmount.toFixed(4)}}/{{ info.amount }}</div>
        <!-- <div ref="listUl" class="receive-box"></div> -->
        <ul ref="listUl" class="receive-list">
          <li v-for="(item, key) in info.log" :key="key"><div>{{ item.who }}</div><div>{{ item.amount }}</div></li>
        </ul>
        <div v-show="info.log.length == 0" class="list-noData">{{$t('暂无数据')}}</div>
      </div>
    </div>
    <div class="input-account" v-if="!isIputCodeNumber">
      <LimitInput :maxlength="100" numberType="nolimit" class="input" :placeholder="$t('请输入您的账号')" :isNumber="false" isFrom='receive' v-model="account"/>
      <div class="no-account" v-if="info.type != 3 && getCurCurrency == 'EOS'">{{$t('还没有EOS账号')}} ? <router-link to="account">{{$t('创建')}}</router-link></div>
      <div class="no-account" style="text-align:left;margin-left:16px" v-if="info.type == 3">{{$t('12位字符，需包含数字1-5和字母a-z两种元素')}}</div>
      <div class="button" v-if="info.type != 3" @click="receive">{{$t('领取')}}</div>
      <div class="button" v-else @click="createAccount">{{$t('领取并创建')}}</div>
    </div>
        <div class="error-tip" v-if="showError">{{ errorMsg }}</div>
    <loading v-show='showLoading'></loading>
  </div>
</template>

<script>
import topBar from '@/components/topBar'
import IconFont from '@/components/Iconfont'
import loading from '@/components/loading'
import LimitInput from '@/components/LimitInput'
import { formatDate } from '@/utils/filter'
import CountDown from '@/components/Countdown'
import { getTableRow } from '@/utils/'
import Eos from 'eosjs'
import ecc from 'eosjs-ecc'

export default {
  name: 'receive',
  components: {topBar, IconFont, loading, LimitInput, CountDown},
  data () {
    return {
      account: (this.$store.state.accountIdentity && this.$store.state.accountIdentity.name) || localStorage.getItem(this.$store.state.receivedAccountName) || '',
      showError: false,
      errorMsg: '',
      showLoading: false,
      rpcJson: '',
      receiveAmount: 0, // 已领取金额
      isIputCodeNumber: false, // 通过红包id进来
      info: { // 红包信息
        id: '',
        type: '',
        limit: 0,
        sender: '',
        pubkey: '',
        amount: 0,
        memo: '',
        expire: 0,
        log: []
      }
    }
  },
  created () {
    let query = this.$route.query
    if (!query.sign) {
      this.isIputCodeNumber = true
    }
    if (!query.uuid) {
      return
    }
    this.showLoading = true
    let params = {
      json: true,
      code: this.$store.state.tranAccountName,
      scope: this.$store.state.tranAccountName,
      table: 'redpacket',
      lower_bound: query.uuid,
      limit: 1,
      key_type: 'i64',
      index_position: 1
    }

    let _that = this
    getTableRow(this, params, (response) => {
      _that.handleResponse(response)
    }, () => {
      window.tip(this.$t('失败'))
      _that.showLoading = false
    })
  },
  computed: {
    getCurCurrency () {
      let amount = String(this.info.amount)
      return amount.lastIndexOf(' ') === -1 ? '' : amount.substring(amount.lastIndexOf(' ') + 1)
    }
  },
  methods: {
    handleResponse (response) {
      if (response.rows) {
        let result = response.rows[0]
        let nowTime = parseInt((new Date()).getTime() / 1000)
        if (result.expire > nowTime) {
          result.countDate = result.expire - nowTime
        }
        result.log.map(item => {
          this.receiveAmount += parseFloat(item.amount)
        })
        result.expire = result.expire - 24 * 60 * 60
        this.info = result
        // 如果是创建账号红包类型把输入框默认值去掉
        if (result.type === 3) {
          this.account = ''
        }
      }
      // this.$nextTick(() => {
      //   const { clientHeight }  = this.$refs.listUl
      //   this.$refs.listUl.style.height = `${clientHeight}px`
      // })
      this.showLoading = false
    },
    receive () {
      // 验证输入账号是否正确
      let reg = /^[a-z1-5.]{0,12}$/
      if (!reg.test(this.account)) {
        window.tip(this.$t('请输入正确的EOS账户'))
      } else if (!this.account) {
        window.tip(this.$t('请输入正确的EOS账户'))
      } else {
        // 有账号领取
        this.doTransact()
      }
    },
    createAccount () {
      // 验证输入账号是否正确
      let reg = /^[a-z1-5.]{0,12}$/
      if (!reg.test(this.account)) {
        window.tip(this.$t('请输入正确的EOS账户'))
        return false
      } else if (!this.account) {
        window.tip(this.$t('请输入正确的EOS账户'))
        return false
      }
      this.showLoading = true
      ecc.randomKey().then(privateKey => {
        let publicKey = ecc.privateToPublic(privateKey)
        this.packetCreateAction(publicKey).then(result => {
          this.showLoading = false
          if (result && result.transaction_id) {
            // window.tip(this.$t('创建账号成功'))
            this.$router.push({path: 'account', query: {accountName: this.account, publicKey: publicKey, privateKey: privateKey, from: 'receive'}})
          } else {
            window.tip(result.error)
          }
        }).catch((res) => {
          this.showLoading = false
          window.tip(this.$t('创建账号失败，可能账号已存在或红包金额不足'))
        })
      })
    },
    // 执行动作
    doTransact () {
      this.showLoading = true
      this.transactGetAction().then((result) => {
        this.showLoading = false
        if (result && result.transaction_id) {
          this.$router.push({path: 'success', query: {id: this.info.id, accountName: this.account}})
        } else {
          window.tip(result.error)
        }
      }).catch(() => {
        this.showLoading = false
        window.tip(this.$t('领取失败'))
      })
    },
    // 调用eosjs-api-get
    transactGetAction (api) {
      let eos = Eos(this.$store.state.eosConfig)
      let query = this.$route.query

      let params = {
        receiver: this.account,
        id: +query.uuid,
        sig: query.sign
      }

      let result = eos.transaction({
        actions: [{
          account: this.$store.state.tranAccountName,
          name: 'get',
          authorization: [{actor: this.$store.state.defaultAccount, permission: 'redpacket'}],
          data: params
        }]
      })
      return result
    },
    packetCreateAction (publicKey) {
      let eos = Eos(this.$store.state.eosConfig)
      let formatCode = this.$route.query

      let params = {
        account_to_create: this.account,
        owner_key: publicKey,
        active_key: publicKey,
        id: +formatCode.uuid,
        sig: formatCode.sign
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
    doShowError (message) {
      this.showError = true
      this.errorMsg = message
      let timeout = ''
      timeout = setTimeout(() => {
        this.showError = false
        clearTimeout(timeout)
      }, 1000)
    }
  },
  filters: {
    formatDate (value, pattern) {
      return formatDate(value, pattern)
    }
  }
}
</script>

<style lang="stylus" scoped>
.receive-warrap
  -webkit-overflow-scrolling touch
  display flex
  flex-direction column
  height 100%
  .inner-wrap
    flex 1
    overflow hidden
    .scroll-wrap
      width 100%
      height 100%
      overflow-x hidden
      overflow-y auto
  img
    width 100%
  .dispatch-info
    background-color #F8F8F8
    .from
      font-size 12px
      color #5D4220
      text-align center
      margin-top rem(8)
    .total
      font-size 12px
      color #5D4220
      margin-top rem(8)
      text-align center
      .amount
        font-size 16px
        margin 0 rem(6)
      .luck
        background-color #E4F1FE
        font-size 12px
        color #288EFB
        padding 0 2px
      .share
        background-color #DCF2E8
        font-size 12px
        color #3ECF8B
        padding 0 2px
      .jian
        background-color #FFEAEE
        font-size 12px
        color #EB5984
        padding 0 2px
    .blessing
      font-size 12px
      color #5D4220
      line-height rem(18)
      text-align center
      padding rem(8) rem(30)
    .send-time
      display flex
      justify-content space-between
      padding rem(16)
      font-size 12px
      color #C9C2B7
      .status
        color #FF9200
  .amount-info
    height rem(50)
    line-height rem(50)
    padding 0 rem(16)
    text-align left
    color #A69987
    border-bottom 1px solid #F9F9F9
  // .receive-box
  //   position absolute
  //   overflow-y scroll
  //   height 1000px
  .receive-list
    // position absolute
    // overflow-y scroll
    // height 1000px
    li
      padding 0 rem(16)
      color #5D4220
      font-weight 500
      font-size 14px
      display flex
      height 50px
      align-items center
      justify-content space-between
      border-bottom 1px solid #F9F9F9
  .inner-div
    height rem(174)
  .error-tip
    max-width 640px
    background-color #FFEAED
    text-align center
    color #CE2344
    font-size 12px
    position fixed
    // left 0
    bottom rem(174)
    height rem(34)
    line-height rem(34)
    width 100%
  .input-account
    padding-bottom constant(safe-area-inset-bottom)
    padding-bottom env(safe-area-inset-bottom)
    text-align center
    // position fixed
    max-width 640px
    // left 0
    // bottom 0
    -webkit-transform translateZ(0)
    height rem(174)
    width 100%
    background-color #CE2344
    >>>input
      height 36px
      line-height 36px
      width calc(100% - 60px)
      margin-top 12px
      border 0 none
      border-radius 2px
      padding 10px 15px
      font-size 14px
      transform translateZ(0)
      &::placeholder
        font-size 14px
    .no-account
      text-align right
      color #ffffff
      margin-top 2px
      padding-right rem(16)
      font-size 12px
      a
        text-decoration none
        color #FFF7C1
        font-size 12px
    .button
      background-color #FCDBB2
      height 38px
      line-height 38px
      width 120px
      border-radius 20px
      color #5D4220
      font-size 14px
      margin 10px auto
</style>
