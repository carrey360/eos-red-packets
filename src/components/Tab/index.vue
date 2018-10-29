<template>
  <div class="tabs">
    <div class="tabs__header">
      <div ref="headerTab" class="tabs__header_wrap">
        <div v-for="(item, index) in tabList" :key="index"
            :class="{activate: activeIndex === index}"
            @click="(e) => handleClick(e,index, item.name)">
          {{item.label}}
        </div>
        <div ref="line" class="tabs_active_line"></div>
      </div>
    </div>
    <div v-show="cardShow" ref="contentTab" class="tabs__content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tabs',
  props: {
    defalutActive: {
      type: Number,
      default: 0
    },
    cardShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tabList: [],
      activeIndex: this.defalutActive
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 初始化主体内容
      for (let i = 0; i < this.$refs.contentTab.children.length; i++) {
        if (i !== this.defalutActive) {
          this.$refs.contentTab.children[i].style.display = 'none'
        } else {
          this.$refs.contentTab.children[i].style.display = ''
        }
      }
      // 初始化header选中
      for (let i = 0; i < this.$refs.headerTab.children.length; i++) {
        if (i === this.activeIndex) {
          const { clientWidth, offsetLeft } = this.$refs.headerTab.children[i]
          this.$refs.line.style.width = `${clientWidth - 48}px`
          this.$refs.line.style.transform = `translateX(${offsetLeft + 12}px)`
        }
      }
    })
  },
  methods: {
    handleClick (e, index, name) {
      const { clientWidth, offsetLeft } = e.target
      this.$refs.line.style.width = `${clientWidth - 48}px`
      this.$refs.line.style.transform = `translateX(${offsetLeft + 12}px)`
      this.activeIndex = index
      for (let i = 0; i < this.$refs.contentTab.children.length; i++) {
        if (i !== index) {
          this.$refs.contentTab.children[i].style.display = 'none'
        } else {
          this.$refs.contentTab.children[i].style.display = ''
        }
      }
      this.$emit('click', name || index)
    }
  }
}
</script>
<style lang="stylus" scoped>
.tabs
  &__header
    &_wrap
      display flex
      background-color #F8F8F8
      position relative
      .tabs_active_line
        height 2px
        background-color #5D4220
        position absolute
        bottom 0
        left 0
        z-index 1
        transition transform .3s cubic-bezier(.645,.045,.355,1)
      .activate
        color #5D4220
      & > div
        font-size rem(14)
        color #A69987
        padding 0 12px
        height 40px
        line-height 40px
      & > div:first-child
        padding-left: 12px
      & > div:last-child
        padding-right 12px
</style>
