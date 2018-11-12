<template>
  <div class="tab-item">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'tab-item',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  beforeCreate () {
    this.$parent.tabList.push(this)
  }
}
</script>
