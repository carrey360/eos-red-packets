<template>
  <div class="limit-input">
    <div v-if="isNumber" class="red-input">
      <span v-if='leftLabel'>{{leftLabel}}</span>
      <div>
        <input :placeholder="placeholder" type="text" :value="inputVal" @input="handleInput"/>
        <span v-if='rightLabel'>{{rightLabel}}</span>
      </div>
    </div>
    <input v-else class="account-name common-input"
            type="text" :placeholder="placeholder" :value="inputVal" @input="handleInput"/>
  </div>
</template>
<script>
export default {
  name: 'limit-input',
  props: {
    value: {},
    error: false,
    message: {
      type: String,
      default: '请输入合法字符'
    },
    placeholder: {
      type: String,
      default: ''
    },
    isNumber: {
      type: Boolean,
      default: true
    },
    leftLabel: {
      type: String,
      default: ''
    },
    rightLabel: {
      type: String,
      default: ''
    },
    numberType: {
      type: String,
      default: 'string' // string,int,float
    }
  },
  data () {
    return {
      inputVal: this.value === 0 ? 0 : this.value || ''
    }
  },
  methods: {
    handleInput (e) {
      this.inputVal = e.target.value
    },
    limit (val, oVal) {
      if (!val) return
      if (this.numberType === 'string') {
        let reg = /^[a-z1-5]{0,12}$/i // 数字1-5 字符a-z大小写 最多12位
        if (!reg.test(val)) {
          val = oVal
        }
      } else if (this.numberType === 'int') {
        let reg = /^[1-9]{1}\d*$/ // 大于零正整数
        if (!reg.test(val)) {
          val = oVal
        }
      } else if (this.numberType === 'float') {
        let reg = /^(0|[1-9]+\d*)([.]{1}[0-9]{0,4}){0,1}$/ // 小数最多四位
        if (!reg.test(val)) {
          val = oVal
        }
      }
      return val
    }
  },
  watch: {
    value (nVal, oVal) { // 监听父组件传进来的value
      // 改变input框中的内容
      this.inputVal = this.limit(nVal, oVal)
      // 重发事件，改变父组件v-model绑定的值
      this.$emit('input', this.inputVal)
    },
    inputVal (nVal, oVal) { // 监听当前value
      // 改变input框中的内容
      this.inputVal = this.limit(nVal, oVal)
      // 重发事件，改变父组件v-model绑定的值
      this.$emit('input', this.inputVal)
    }
  }
}
</script>
<style lang="stylus" scoped>
.limit-input
  .red-input
    background-color #F8F8F8
    height rem(26)
    display flex
    align-items center
    justify-content space-between
    padding 16px
    font-size rem(16)
    border-radius 3px
    margin-bottom rem(20)
    ::placeholder
      color #C9C2B7
    span
      color #5D4220
      font-size rem(16)
    input
      border-radius 4px
      border none
      box-sizing border-box
      color #606266
      display inline-block
      font-size inherit
      height 100%
      outline none
      padding 0 10px 0 15px
      background-color #F8F8F8
      text-align right
    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button
      -webkit-appearance none
    input[type="number"]
      -moz-appearance textfield
  .common-input
    width calc(100% - 20px)
    border 0 none
    padding 10px
    margin-top 4px
    word-break break-all
    &:focus
      outline none
    &::placeholder
      color #C9C2B7
  .account-name
    height rem(28)
    line-height rem(28)
    background-color #f8f8f8
</style>
