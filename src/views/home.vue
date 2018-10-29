<template>
  <div class="home-warrap">
    <div class="top">
      <img class="bg" src="../assets/home.png" />
      <div class="code"><textarea placeholder="请输入" v-model="code"></textarea></div>
      <div class="button" @click="go">GO!</div>
      <img class="logo" src="../assets/logo.png"/>
    </div>
    <div class="title">麒麟 EOS 红包</div>
    <router-link to="red"><div class="send-packet">发红包</div></router-link>
    <div class="sum-info">红包数：1299333  &nbsp;&nbsp;&nbsp;红包:21212</div>
    <div class="lang">EN/CN</div>
    <div class="action">
      <span @click="packeted">我发的红包</span><span class="tip">|</span>
      <span><a href="/account">创建EOS账号</a></span><span class="tip">|</span>
      <span><a href="/about">关于我们</a></span>
    </div>
    <div class="decoration"><img src="../assets/decoration.png" /></div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      errorTip: false,
      message: 'sadfasf',
      code: ''
    }
  },
  methods: {
    packeted () {
      window.tip('asdfasf')
    },
    go () {
      if (!this.code) {
        window.tip('请输入code')
      } else {
        this.$store.commit('setCode', {code: this.code})
        this.$router.push('receive')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-warrap
  background-color #CF2546
  text-align center
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
      top 24px
      left 50%
      transform translateX(-50%)
      width 100%
      textarea
        border 1px solid #DEDEDE
        height 90px
        padding rem(10)
        width 80%
        resize none
        color #5D4220
        font-size 12px
        &::placeholder
          color #C9C2B7
        &:focus
          outline none
          border 1px solid #DEDEDE
    .button
      width 126px
      height 38px
      line-height 38px
      background-color rgba(221,36,54,1)
      border 0 none
      border-radius rem(40)
      font-size rem(14)
      font-weight 400
      color rgba(255,247,193,1)
      position absolute
      left 50%
      bottom 70px
      transform translateX(-50%)
    .logo
      position absolute
      left 50%
      transform translateX(-50%)
      width 76px
      height 76px
      bottom -20px
  .title
    margin-top 54px
    text-align center
    font-size 24px
    color rgba(255,243,209,1)
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
    margin-top 32px
    font-size 12px
    text-align center
    margin-left 50%
    transform translateX(-50%)
  .action
    position relative
    z-index 2
    margin-top 15px
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
