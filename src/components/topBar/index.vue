<template>
  <div class="top-bar-warrap">
    <div>
      <p @click="goback"><IconFont name="icon-fanhui" type="class" class="iconfont"/></p>
      <div class="title">{{ title }}</div>
      <div>
        <p @click="home" v-show="showHome"><IconFont name="icon-shouye" type="class" class="iconfont home"/></p>
        <div v-show="showSended" class="sendPacket"><router-link to="redlist">{{$t('我塞的红包')}}</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
import IconFont from '@/components/Iconfont'

export default {
  name: 'top-bar',
  components: { IconFont },
  props: {
    showHome: {
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    showSended: {
      type: String,
      default: ''
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    home () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
.top-bar-warrap
  background-color #CE2344
  padding 0
  margin 0
  & > div
    height 44px
    line-height 44px
    display flex
    align-items center
    justify-content space-between
    align-items center
    padding 0 rem(15)
    .title
      font-size 14px
      line-height 44px
      color rgba(255,255,255,1)
  .iconfont
    color #fff
    font-size 14px
    &.home
      font-size 20px
  .sendPacket
    a
      font-size 14px
      text-decoration none
      color #FFF
</style>
