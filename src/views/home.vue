<template>
  <div class="home-warrap">
    <div class="top">
      <img class="bg" src="../assets/home.png" />
      <div class="code"><textarea placeholder="请输入"></textarea></div>
      <div class="button" @click="go">GO!</div>
      <img class="logo" src="../assets/logo.png"/>
    </div>
    <div class="title">麒麟 EOS 红包</div>
    <div class="send-packet">发红包</div>
    <div class="sum-info">红包数：1299333  &nbsp;&nbsp;&nbsp;红包:21212</div>
    <div class="lang">EN</div>
    <div class="decoration">
      <div class="action">
        <span @click="packeted">我发的红包</span><span class="tip">|</span>
        <span>创建EOS账号</span><span class="tip">|</span>
        <span>关于我们</span>
      </div>
      <img src="../assets/decoration.png" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      errorTip: false,
      message: 'sadfasf'
    }
  },
  methods: {
    packeted () {
      window.tip('asdfasf')
    },
    go () {
      this.$router.push('receive')
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-warrap
  background-color #CF2546
  font-family PingFangSC-Regular
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
      bottom 80px
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
  .decoration
    position relative
    left 0
    bottom 0
    img
      width 100%
      position relative
      top -40px
      z-index 1
    .action
      position relative
      z-index 2
      margin-top 15px
      color rgba(252,219,178,1)
      font-size 12px
      opacity 0.7
      .tip
        margin 0 10px

</style>
