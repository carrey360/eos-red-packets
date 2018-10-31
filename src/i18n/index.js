import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

let enConfig = {
  '普': 'share',
  '拼': 'luck',
  '状态': 'STATUS',
  '数量': 'QTY',
  '复制': 'COPY',
  '创建时间': 'Create date',
  '还没有EOS账号': 'Don’t have an EOS account',
  '创建': 'Create one',
  '兑换': 'Redeemed',
  '红包': 'Red Packet',
  '保存到您的EOS账号': 'Save to your EOS account',
  '请输入您的账号': 'Please input your account',
  '请输入12位有效账号': 'Please enter 12 valid account',
  '账号': 'Account',
  '12位字符，需包含数字1-5和字母a-z两种元素': 'The 12 character contains two elements, the number 1-5 and the letter A-Z',
  '公钥': 'publicKey',
  '生成新公钥': 'Create New publicKey',
  '不要透露给任何人': 'Do not reveal it to anyone',
  '私钥': 'privateKey',
  '领取': 'Redeem now',
  '提示': 'Tips',
  '是': 'YES',
  '否': 'NO',
  '确定私钥已保存安全位置': 'Confirm that the private key has secured the security location',
  '请输入公钥': 'Please enter the public key',
  '复制成功': 'Copy Success'
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
  '红包': '红包',
  '保存到您的EOS账号': '保存到您的EOS账号',
  '请输入您的账号': '请输入您的账号',
  '请输入12位有效账号': '请输入12位有效账号',
  '账号': '账号',
  '12位字符，需包含数字1-5和字母a-z两种元素': '12位字符，需包含数字1-5和字母a-z两种元素',
  '公钥': '公钥',
  '生成新公钥': '生成新公钥',
  '不要透露给任何人': '不要透露给任何人',
  '私钥': '私钥',
  '领取': '领取',
  '提示': '提示',
  '是': '是',
  '否': '否',
  '确定私钥已保存安全位置': '确定私钥已保存安全位置',
  '请输入公钥': '请输入公钥',
  '复制成功': '复制成功'
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
