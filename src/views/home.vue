<template>
  <div class="home-warrap">
    <div class="top">
      <img class="bg" src="@/assets/home.png" />
      <div class="code"><textarea :placeholder="$t('请输入红包串领取红包')" v-model="code"></textarea></div>
      <div class="button" @click="go">GO</div>
      <img class="logo" src="../assets/logo.png"/>
    </div>
    <div class="title">EOS {{$t('红包')}}</div>
    <!-- <router-link to="red"><div class="send-packet">{{$t('发红包')}}</div></router-link> -->
    <!-- <div class="sum-info">红包数:12993  &nbsp;&nbsp;&nbsp;红包总额:21212EOS</div> -->
    <div :class="[isInputFocus ? 'pos-static' : 'pos-fiexd', 'postion-box']">
      <div class="lang" @click="setLang">EN/CN</div>
      <div class="action">
        <!-- <span><router-link to="redlist">{{$t('我塞的红包')}}</router-link></span><span class="tip">|</span> -->
        <span><router-link to="red">{{$t('发红包')}}</router-link></span><span class="tip">|</span>
        <span @click="linkToCreateAccount">{{$t('创建EOS账号')}}</span><span class="tip">|</span>
        <span><router-link to="about">{{$t('关于我们')}}</router-link></span>
      </div>
      <!-- <div class="decoration"><img src="../assets/decoration.png" /></div> -->
    </div>
    <div :class="[isInputFocus ? 'pos-static' : 'pos-fiexd', 'glide-position']">
      <i class="glide_box" />
    </div>
    <div class="sponsor">
      <img class="zzs" alt="">
    </div>
    <loading v-show='showLoading'></loading>
  </div>
</template>

<script>
import { formatePacket, getTableRow } from '@/utils/'
import loading from '@/components/loading'
import { mapState } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      showLoading: false,
      code: '',
      lang: localStorage.getItem('redLang') || 'cn',
      sponsor: false,
      isInputFocus: false
    }
  },
  components: {loading},
  computed: {
    ...mapState(['scatter'])
  },
  created () {
    this.$nextTick(() => {
      setTimeout(() => {
        // 延迟加载图片
        this.lazyload()
      }, 0)
      if (!this.catter) {
        this.$store.dispatch('connectScatter')
      }
    })
  },
  mounted () {
    let clientHeight = document.body.clientHeight
    window.addEventListener('resize', () => {
      if (clientHeight > document.body.clientHeight) {
        this.inputFoccus()
      } else {
        this.inputBlur()
      }
    })
  },
  methods: {
    go () {
      if (!this.code) {
        window.tip(this.$t('请输入红包串'))
        return
      }
      this.showLoading = true
      let formatCodeJson = formatePacket(this.code)
      if (!formatCodeJson.isMemo) {
        this.showLoading = false
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
          index_position: 1
        }

        let _that = this
        getTableRow(this, params, function (response) {
          _that.handleResponse(response, formatCodeJson)
        }, () => {
          window.tip(this.$t('失败'))
          _that.showLoading = false
        })
      }
    },
    handleResponse (response, formatCodeJson) {
      this.showLoading = false
      if (response.rows && response.rows.length === 1 && response.rows[0].id === formatCodeJson.uuid) {
        this.$store.commit('setCode', {code: this.code})
        // 成后跳转到领取红包页面
        this.$router.push({path: 'receive', query: {uuid: formatCodeJson.uuid, sign: formatCodeJson.sign}})
      } else {
        window.tip(this.$t('红包已领完或者红包已失效'))
      }
    },
    setLang () {
      let lang = localStorage.getItem('redLang') || 'cn'
      localStorage.setItem('redLang', lang === 'cn' ? 'en' : 'cn')
      this.$i18n.locale = lang === 'cn' ? 'en' : 'cn'
      this.lang = lang === 'cn' ? 'en' : 'cn'
      this.lazyload()
    },
    linkToCreateAccount () {
      this.$store.commit('setCode', {code: ''})
      this.$router.push('account')
    },
    // 缓存加载图片
    lazyload () {
      function loadImage (obj, url, callback) {
        let img = new Image()
        img.src = url
        // 判断图片是否在缓存中
        if (img.complete) {
          callback.call(img, obj)
          return
        }
        // 图片加载到浏览器的缓存中回调函数
        img.onload = function () {
          callback.call(img, obj)
        }
      }
      function showImage (obj) {
        obj.src = this.src
      }
      const imgs = document.getElementsByClassName('zzs')
      const url = this.lang === 'cn' ? '/static/cn.png' : '/static/en.png'
      loadImage(imgs[0], url, showImage)
    },
    inputFoccus () {
      this.isInputFocus = true
    },
    inputBlur () {
      this.isInputFocus = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-warrap
  background-color #CF2546
  text-align center
  height 100%
  .zzs
    width 100%
    display flex
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
        font-size 14px
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
    font-size 14px
    opacity 0.7
    .tip
      margin 0 10px
    a
      text-decoration none
      color rgba(252,219,178,1)
  .decoration
    background-color #CF2546
    margin-top -58px
    img
      width 90%
  .pos-static
    position static!important
  .pos-fixed
    position fixed
  .postion-box
    position absolute
    bottom 46px
    width 100%
    max-width 640px
  .glide-position
    position absolute
    bottom 5px
    display flex
    justify-content center
    width 100%
    @keyframes glide
      0%
        -webkit-transform: translatey(0) rotate(180deg)
      50%
        -webkit-transform: translatey(-6px) rotate(180deg)
      100%
        -webkit-transform: translatey(0) rotate(180deg)
    .glide_box
      display inline-block
      width 26px
      height 26px
      background-image url('../assets/glide.png')
      -webkit-animation glide 1s infinite linear
  .sponsor
    position absolute
    top 100%
    max-width 640px
</style>
