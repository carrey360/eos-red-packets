<template>
  <button @click="handleClick" class="btn-default">{{label}}</button>
</template>
<script>
export default {
  name: 'my-button',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
<style lang="stylus" scoped>
.btn-default
  background-color #FCDBB2
  width 100%
  padding 14px 0
  text-align center
  border none
  outline none
  font-size 14px
  color #5D4220
  font-weight 400
  border-radius 2px
</style>
