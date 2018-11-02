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
  '复制成功': 'Copy Success',
  '关于我们': 'About us',
  '创建EOS账号': 'Create EOS Account',
  '我塞的红包': 'Sent Packets',
  '发红包': 'Send Red packet',
  '请输入': 'please enter',
  '请输入有效值': 'Please enter a valid value',
  '所有者和使用者公钥相同': 'The owner and user have the same public key',
  '红包串号': 'Red Packet number',
  '请正确输入红包串号': 'Please enter the red packet number correctly',
  '创建账号成功': 'Create account successfully',
  '选填': 'Optional',
  '创建账号': 'Create account',
  '该浏览器不支持自动复制': 'The browser does not support automatic copying',
  '收款账号': 'Collection account',
  '转账金额': 'transfer amount',
  '转账': 'transfer',
  '请输入转账金额': 'Please enter the transfer amount',
  '备注': 'remark',
  '普通红包': 'Identical Amount',
  '拼手气红包': 'Random Amount',
  '填写红包金额': 'Enter amount',
  '红包金额': 'Total',
  '填写个数': 'Enter number',
  '红包个数': 'Quantity',
  '个': '',
  '恭喜发财，大吉大利': 'Best wishes',
  '红包金额以实际转账为准': 'The amount of the red packet is subject to the actual transfer',
  '塞钱进红包': 'Transfer EOS to red packet',
  '未领取的红包，将于转账成功24小时后发起退款': 'Packets not opened within 24 hrs will be refunded',
  '请输入红包金额': 'Please enter Total',
  '请输入红包个数': 'Please enter Quantity',
  '红包金额不能低于0.001EOS': 'Total Not lower than 0.001EOS',
  '收款账户': 'Accounts receivable',
  '请让朋友按照以下信息转账': 'Please notify your friends to transfer according to the following steps',
  '或': 'or',
  '从交易所提币': 'Withdraw from other exchanges',
  '目前明确支持的交易所有': 'At present, we only support exchanges such as',
  '请不要从其他交易所转入，避免财产损失': 'Please do not transfer from other exchanges to avoid asset losses',
  '创建提示': 'Create a prompt',
  '创建账号会扣除部分EOS，剩余部分会转入账号内': 'Creating a prompt will consume a small portion of EOS, and the rest will be transferred to the account',
  '离线保存': 'Save offline',
  '建议抄写或打印私钥后放置在安全地点保存': 'It is recommended that you copy or print the private key and store it in a secure locatio',
  '请勿使用网络传输': 'Please do not use network transmission',
  '请勿通过网络工具传输私钥，例如用微信发送到电脑。一旦被黑客获取造成不可挽回的资产损失': 'Do not transmit the private key via a network tool, such as sending it to a computer via WeChat. Once the private key is acquired by hackers, the irreparable loss of assets will happen',
  '分享该串给您朋友，让你朋友领取红包': 'Share this code to your friends via IM',
  '通过该ID可以查看红包信息': 'You can view the red packet information by this ID',
  '暂无数据': 'No Data',
  '红包列表': 'Red Packet List',
  '红包详情': 'Red Packet Detail',
  'EOS红包是由火币矿池（www.huobipool.com）和麒麟社区开发的在线领取和派发EOS红包的平台': 'EOS Red Packet is a platform developed by Huobi Pool (www.huobipool.com) and kylin to collect and send EOS red packets online',
  '用户可以凭口令领取红包，也可以派发普通红包和拼手气红包': 'Users can receive red packets by password, and can also send Ordinary Red Packets and Lucky Red Packets',
  '目前支持EOS币种、中英文版本': 'Currently EOS and Chinese and English versions are supported',
  '红包简介': 'brief introduction of Red Packets',
  '简介普通红包': 'Ordinary Red Packets',
  '普通红包可以一对一或者一对多发送，用户设置好红包总金额和红包个数后，会生成一串字符串，可分享至各个社交平台，每个被领取的红包金额相同': 'Ordinary Red Packets can be sent one-to-one or one-to-many. After the user sets the total value of Red Packets and the number of Red Packets, a string will be generated, which can be shared to various social platforms. Everyone will receive the same value of Red Packets',
  '简介拼手气红包': 'Lucky Red Packets',
  '拼手气红包可以一对多发送，用户设置好红包总金额和红包个数后，会生成一串字符串，可分享至各个社交平台，每个被领取的红包金额随机不等': 'Lucky Red Packets can be sent one-to-many. After the user sets the total value of Red Packets and the number of Red Packets, a string will be generated, which can be shared to various social platforms. Everyone will receive a random value of Red Packets'
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
  '复制成功': '复制成功',
  '关于我们': '关于我们',
  '创建EOS账号': '创建EOS账号',
  '我塞的红包': '我塞的红包',
  '发红包': '发红包',
  '请输入': '请输入',
  '请输入有效值': '请输入有效值',
  '所有者和使用者公钥相同': '所有者和使用者公钥相同',
  '红包串号': '红包串号',
  '请正确输入红包串号': '请正确输入红包串号',
  '创建账号成功': '创建账号成功',
  '选填': '选填',
  '创建账号': '创建账号',
  '该浏览器不支持自动复制': '该浏览器不支持自动复制',
  '收款账号': '收款账号',
  '转账金额': '转账金额',
  '转账': '转账',
  '请输入转账金额': '请输入转账金额',
  '备注': '备注',
  '普通红包': '普通红包',
  '拼手气红包': '拼手气红包',
  '填写红包金额': '填写红包金额',
  '红包金额': '红包金额',
  '填写个数': '填写个数',
  '红包个数': '红包个数',
  '个': '个',
  '恭喜发财，大吉大利': '恭喜发财，大吉大利',
  '红包金额以实际转账为准': '红包金额以实际转账为准',
  '塞钱进红包': '塞钱进红包',
  '未领取的红包，将于转账成功24小时后发起退款': '未领取的红包，将于转账成功24小时后发起退款',
  '请输入红包金额': '请输入红包金额',
  '请输入红包个数': '请输入红包个数',
  '红包金额不能低于0.001EOS': '红包金额不能低于0.001EOS',
  '收款账户': '收款账户',
  '请让朋友按照以下信息转账': '请让朋友按照以下信息转账',
  '或': '或',
  '从交易所提币': '从交易所提币',
  '目前明确支持的交易所有': '目前明确支持的交易所有',
  '请不要从其他交易所转入，避免财产损失': '请不要从其他交易所转入，避免财产损失',
  '创建提示': '创建提示',
  '创建账号会扣除部分EOS，剩余部分会转入账号内': '创建账号会扣除部分EOS，剩余部分会转入账号内',
  '离线保存': '离线保存',
  '建议抄写或打印私钥后放置在安全地点保存': '建议抄写或打印私钥后放置在安全地点保存',
  '请勿使用网络传输': '请勿使用网络传输',
  '请勿通过网络工具传输私钥，例如用微信发送到电脑。一旦被黑客获取造成不可挽回的资产损失': '请勿通过网络工具传输私钥，例如用微信发送到电脑。一旦被黑客获取造成不可挽回的资产损失',
  '分享该串给您朋友，让你朋友领取红包': '分享该串给您朋友，让你朋友领取红包',
  '通过该ID可以查看红包信息': '通过该ID可以查看红包信息',
  '暂无数据': '暂无数据',
  '红包列表': '红包列表',
  '红包详情': '红包详情',
  'EOS红包是由火币矿池（www.huobipool.com）和麒麟社区开发的在线领取和派发EOS红包的平台': 'EOS红包是由火币矿池（www.huobipool.com）和麒麟社区开发的在线领取和派发EOS红包的平台',
  '用户可以凭口令领取红包，也可以派发普通红包和拼手气红包': '用户可以凭口令领取红包，也可以派发普通红包和拼手气红包',
  '目前支持EOS币种、中英文版本': '目前支持EOS币种、中英文版本',
  '红包简介': '红包简介',
  '简介普通红包': '普通红包',
  '普通红包可以一对一或者一对多发送，用户设置好红包总金额和红包个数后，会生成一串字符串，可分享至各个社交平台，每个被领取的红包金额相同': '普通红包可以一对一或者一对多发送，用户设置好红包总金额和红包个数后，会生成一串字符串，可分享至各个社交平台，每个被领取的红包金额相同',
  '简介拼手气红包': '拼手气红包',
  '拼手气红包可以一对多发送，用户设置好红包总金额和红包个数后，会生成一串字符串，可分享至各个社交平台，每个被领取的红包金额随机不等': '拼手气红包可以一对多发送，用户设置好红包总金额和红包个数后，会生成一串字符串，可分享至各个社交平台，每个被领取的红包金额随机不等'
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
