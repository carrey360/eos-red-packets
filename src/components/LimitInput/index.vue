<template>
  <div class="limit-input">
    <div v-if="isNumber" class="red-input">
      <span v-if='leftLabel'>{{leftLabel}}</span>
      <div class="inputwrapp">
        <input :placeholder="placeholder" :type="setInputType" :value="inputVal" @input="numberHandleInput"/>
        <span v-if='rightLabel'>{{rightLabel}}</span>
      </div>
    </div>
    <input v-else class="account-name common-input" autocorrect="off" autocapitalize="off" autocomplete="off" @compositionstart="compositionstart" :readonly="readonly"
      @compositionend='compositionend' type="text" :placeholder="placeholder" :value="inputVal" @input="handleInput" :maxlength="maxlength" @blur="handleInput"/>
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
    },
    maxValue: {
      type: String,
      default: '0'
    },
    isFrom: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: 12
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    setInputType () {
      return this.numberType === 'int' ? 'number' : 'text'
    }
  },
  data () {
    return {
      inputFlag: true,
      inputVal: this.value === 0 ? 0 : this.value || ''
    }
  },
  methods: {
    numberHandleInput (e) {
      this.inputVal = e.target.value
    },
    handleInput (e) {
      if (this.inputFlag) {
        this.inputVal = e.target.value
        let u = navigator.userAgent
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isiOS && this.isFrom === 'receive') {
          let timeout = ''
          timeout = setTimeout(() => {
            window.scrollTo(0, document.body.clientHeight)
            clearTimeout(timeout)
          }, 100)
        }
      }
    },
    compositionstart () {
      this.inputFlag = false
    },
    compositionend () {
      this.inputFlag = true
    },
    limit (val, oVal) {
      if (this.numberType === 'nolimit') return val
      if (!val) return
      if (this.numberType === 'string') {
        let reg = /^[a-z1-5.]{0,12}$/ // 数字1-5 字符a-z大小写 最多12位
        if (!reg.test(val)) {
          val = oVal
        }
      } else if (this.numberType === 'int') {
        let reg = /^[1-9]{1}\d*$/ // 大于零正整数
        if (!reg.test(val)) {
          val = oVal
        }

        if (+this.maxValue > 0 && val > +this.maxValue) {
          val = +this.maxValue
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
  input
    font-size 14px
    font-weight 300
  .red-input
    background-color #F8F8F8
    height rem(26)
    line-height rem(26)
    display flex
    flex-wrap nowrap
    align-items center
    justify-content space-between
    padding 16px
    font-size 14px
    border-radius 3px
    margin-bottom rem(20)
    ::placeholder
      color #C9C2B7
    span
      color #5D4220
      font-size 14px
      white-space nowrap
      margin-top 2px
    .inputwrapp
      display flex
      align-items center
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
      ime-mode disabled
      width 95%
      font-size 14px
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
