import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

let enConfig = {
  '普': 'share',
  '拼': 'luck',
  '状态': 'STATUS',
  '数量': 'QTY',
  '复制': 'COPY',
  '创建时间': 'Create Time',
  '还没有EOS账号': 'Don’t have an EOS account',
  '创建': 'Create one',
  '兑换': 'Redeemed',
  '红包': 'red packet'
}

let cnConfig = {
  '普': '普',
  '拼': '拼',
  '状态': '状态',
  '数量': '数量',
  '复制': '复制',
  '创建时间': '创建时间',
  '还没有EOS账号': '还没有EOS账号',
  '创建': '创建',
  '兑换': '兑换',
  '红包': '红包'
}

const messages = {
  en: {
    ...enConfig
  },
  cn: {
    ...cnConfig
  }
}

const i18n = new VueI18n({
  locale: localStorage.getItem('redLang') || 'cn',
  messages
})

export default i18n
