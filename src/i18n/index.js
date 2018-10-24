import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

let enConfig = {
  '你好': 'hello QQ'
}

let cnConfig = {
  '你好': '你好企鹅'
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
  locale: 'cn',
  messages
})

export default i18n
