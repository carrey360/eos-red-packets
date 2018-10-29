<template>
  <div class="top-bar-warrap">
    <div>
      <IconFont name="icon-fanhui" type="class" class="iconfont"/>
      <div class="title">{{title}}</div>
      <div><IconFont name="icon-shouye" type="class" class="iconfont"/></div>
    </div>
  </div>
</template>

<script>
import IconFont from '@/components/Iconfont'

export default {
  name: 'top-bar',
  components: { IconFont },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.top-bar-warrap
  background-color #CE2344
  & > div
    height 44px
    line-height 44px
    display flex
    align-items center
    justify-content space-between
    padding 0 rem(15)
    .title
      font-size rem(16)
      color rgba(255,255,255,1)
  .iconfont
    color #fff
    font-size 16px
</style>
