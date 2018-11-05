<template>
  <div class="home-warrap">
    <div class="top">
      <img class="bg" src="../assets/home.png" />
      <div class="code"><textarea :placeholder="$t('请输入')" v-model="code"></textarea></div>
      <div class="button" @click="go">GO!</div>
      <img class="logo" src="../assets/logo.png"/>
    </div>
    <div class="title">EOS {{$t('红包')}}</div>
    <router-link to="red"><div class="send-packet">{{$t('发红包')}}</div></router-link>
    <!-- <div class="sum-info">红包数:12993  &nbsp;&nbsp;&nbsp;红包总额:21212EOS</div> -->
    <div class="lang" @click="setLang">EN/CN</div>
    <div class="action">
      <span><router-link to="redlist">{{$t('我塞的红包')}}</router-link></span><span class="tip">|</span>
      <span @click="linkToCreateAccount">{{$t('创建EOS账号')}}</span><span class="tip">|</span>
      <span><router-link to="about">{{$t('关于我们')}}</router-link></span>
    </div>
    <div class="decoration"><img src="../assets/decoration.png" /></div>
    <loading v-show='showLoading'></loading>
  </div>
</template>

<script>
import { formatePacket } from '@/utils/'
import { JsonRpc } from 'eosjs'
import loading from '@/components/loading'

export default {
  name: 'home',
  data () {
    return {
      showLoading: false,
      code: ''
    }
  },
  components: {loading},
  methods: {
    go () {
      let formatCodeJson = formatePacket(this.code)
      if (!this.code) {
        window.tip(this.$t('请输入'))
      } else if (!formatCodeJson.isMemo) {
        window.tip(this.$t('请输入有效值'))
      } else {
        this.showLoading = true
        let params = {
          json: true,
          code: this.$store.state.tranAccountName,
          scope: this.$store.state.tranAccountName,
          table: 'redpacket',
          lower_bound: formatCodeJson.uuid,
          limit: 1,
          key_type: 'i64',
          index_position: '1'
        }
        let jsonRpcObj = new JsonRpc(this.$store.state.eosjsConfig.endpoint)
        this.getTableRows(jsonRpcObj, params).then(response => {
          this.showLoading = false
          if (response.rows && response.rows.length === 1 && response.rows[0].id === formatCodeJson.uuid) {
            this.$store.commit('setCode', {code: this.code})
            // 成后跳转到领取红包页面
            this.$router.push({path: 'receive', query: {uuid: formatCodeJson.uuid, sign: formatCodeJson.sign}})
          } else {
            window.tip(this.$t('您输入的内容无效或者红包已失效'))
          }
        }).catch(() => {
          window.tip(this.$t('失败'))
          this.showLoading = false
        })
      }
    },
    async getTableRows (rpc, params) {
      let response = await rpc.get_table_rows(params)
      return response
    },
    setLang () {
      let lang = localStorage.getItem('redLang') || 'cn'
      localStorage.setItem('redLang', lang === 'cn' ? 'en' : 'cn')
      this.$i18n.locale = lang === 'cn' ? 'en' : 'cn'
    },
    linkToCreateAccount () {
      this.$store.commit('setCode', {code: ''})
      this.$router.push('account')
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-warrap
  background-color #CF2546
  text-align center
  height 100%
  a
    text-decoration none
  .top
    position relative
    left 0
    top 0
    .bg
      width 100%
    .code
      position absolute
      top 10%
      left 50%
      transform translateX(-50%)
      width 100%
      height 36%
      textarea
        border 1px solid #DEDEDE
        border-radius 2px
        height 100%
        padding rem(10)
        width 80%
        resize none
        color #5D4220
        font-size 12px
        outline none
        &::placeholder
          color #C9C2B7
        &:focus
          border 1px solid #DEDEDE
    .button
      width 126px
      height 38px
      line-height 38px
      background-color rgba(221,36,54,1)
      border 0 none
      border-radius rem(40)
      font-size 16px
      font-weight 400
      color rgba(255,247,193,1)
      position absolute
      left 50%
      bottom 26%
      transform translateX(-50%)
    .logo
      position absolute
      left 50%
      transform translateX(-50%)
      width 76px
      height 76px
      bottom -20px
  .title
    margin-top 40px
    text-align center
    font-size 24px
    color rgba(255,243,209,1)
    font-weight bold
  .send-packet
    background rgba(252,219,178,1)
    height 50px
    line-height 50px
    border-radius 2px
    text-align center
    font-size 18px
    font-weight 500
    color rgba(93,66,32,1)
    border 0 none
    width 90%
    margin 60px auto
    margin-bottom 0
  .sum-info
    font-size 12px
    color rgba(252,219,178,1)
    text-align center
    margin-top 15px
    opacity 0.6
  .lang
    width 56px
    height 20px
    line-height 20px
    background rgba(0,0,0,0.09)
    color rgba(235,160,142,1)
    border-radius 10px
    margin-top 40px
    font-size 12px
    text-align center
    margin-left 50%
    transform translateX(-50%)
  .action
    position relative
    z-index 2
    margin-top 30px
    color rgba(252,219,178,1)
    font-size 12px
    opacity 0.7
    .tip
      margin 0 10px
    a
      text-decoration none
      color rgba(252,219,178,1)
  .decoration
    background-color #CF2546
    margin-top -50px
    img
      width 90%
</style>
