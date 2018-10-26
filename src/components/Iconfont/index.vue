<template>
  <svg v-if="useSvg" class="icon" aria-hidden="true">
    <use :xlink:href="iconname"></use>
  </svg>
  <i v-else class="iconfont" :class="iconname"></i>
</template>

<script>
export default {
  name: 'IconFont',
  props: {
    type: {
      type: String,
      default: 'svg'
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      // msg: 'Invalid icon'
    }
  },
  computed: {
    iconname () {
      let hash = this.type === 'svg' ? '#' : ''
      // console.log(hash)
      return `${hash}${this.name}`
    },
    useSvg () {
      let type = this.type
      return type === 'svg'
    }
  }
}
</script>

<style lang="stylus">
  .icon
    width: 1rem; height: 1rem;
    vertical-align: -0.15rem;
    fill: currentColor;
    overflow: hidden;
  .icon-dianka
    font-size 14px
</style>
