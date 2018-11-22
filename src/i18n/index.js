import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

let enConfig = {
  '普': 'share',
  '拼': 'luck',
  '建': 'account',
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
  '12位字符，由字母a-z与数字1-5组成': '12 characters, from the set of a-z and 1-5',
  '公钥': 'PublicKey',
  '生成新公钥': 'Create New PublicKey',
  '不要透露给任何人': 'Do not reveal it to anyone',
  '私钥': 'PrivateKey',
  '领取': 'Redeem now',
  '提示': 'Tips',
  '是': 'YES',
  '否': 'NO',
  '确定私钥已保存安全位置': 'Confirm that the private key has secured the security location',
  '确定要用该红包创建账号': 'Make sure you use the red packet to create accounts',
  '请输入公钥': 'Please enter the public key',
  '复制成功': 'Copy Success',
  '关于我们': 'About Us',
  '创建EOS账号': 'Create EOS Account',
  '我塞的红包': 'Sent Packets',
  '发红包': 'Send Red Packet',
  '请输入': 'please enter',
  '请输入红包串': 'Please enter red packet code',
  '请输入红包串或者红包ID': 'Please enter red packet ID or code',
  '请输入有效值': 'Please enter a valid value',
  '您输入的内容无效或者红包已失效': 'The content you entered is invalid or the red packet is invalid',
  '红包已领完或者红包已失效': 'Red packet is over or invalid',
  '所有者和使用者公钥相同': 'The owner and user have the same public key',
  '红包串': 'Red Packet Code',
  '请正确输入红包串': 'Please enter the red packet code correctly',
  '创建账号成功': 'Create account successfully',
  '选填': 'Optional',
  '创建账号': 'Create Account',
  '该浏览器不支持自动复制': 'The browser does not support automatic copying',
  '收款账号': 'To',
  '转账金额': 'Amount',
  '转账': 'Transfer',
  '请输入转账金额': 'Please enter the transfer amount',
  '备注': 'Memo',
  '普通红包': 'Identical Amount',
  '拼手气红包': 'Random Amount',
  '最少0.1': 'Min 0.1',
  '最少0.3': 'Min 0.3',
  '最少': 'Min',
  '币种': 'currency',
  '红包金额': 'Total',
  '最多100': 'Max 100',
  '红包个数': 'Quantity',
  '个': '',
  '恭喜发财，大吉大利': 'Best wishes',
  '红包金额以实际转账为准': 'The amount of the red packet is subject to the actual transfer',
  '塞钱进红包': 'Transfer EOS to Red Packet',
  '未领取的红包，将于转账成功24小时后发起退款': 'Packets not opened within 24 hrs will be refunded',
  '请输入红包金额': 'Please enter Total',
  '请输入红包个数': 'Please enter Quantity',
  '红包金额不能低于0.1EOS': 'Total Not lower than 0.1EOS',
  '红包金额不能低于': 'Total Not lower than ',
  '收款账户': 'To',
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
  '目前支持EOS,EGT币种、中英文版本': 'Currently EOS and EGT and Chinese and English versions are supported',
  '红包简介': 'Introduction of Red Packets',
  '简介普通红包': 'Ordinary Red Packets',
  '普通红包可以一对一或者一对多发送，用户设置好红包总金额和红包个数后，会生成一串字符串，可分享至各个社交平台，每个被领取的红包金额相同': 'Ordinary Red Packets can be sent one-to-one or one-to-many. After the user sets the total value of Red Packets and the number of Red Packets, a string will be generated, which can be shared to various social platforms. Everyone will receive the same value of Red Packet.',
  '简介拼手气红包': 'Lucky Red Packets',
  '拼手气红包可以一对多发送，用户设置好红包总金额和红包个数后，会生成一串字符串，可分享至各个社交平台，每个被领取的红包金额随机不等': 'Lucky Red Packets can be sent one-to-many. After the user sets the total value of Red Packets and the number of Red Packets, a string will be generated, which can be shared to various social platforms. Everyone will receive a random value of Red Packets.',
  '服务费用': 'Service Fee',
  '红包被领取时合约将自动扣除0.1%的手续费，如果红包超过24小时红包未被领取，合约将自动返还全部EOS并不收取任何费用': '0.1% processing fee will be charged to redeemed red packet.No fee will be charged to the unredeemed red packet',
  '简介建账号红包': 'The Red Packet for Account Creation',
  '建账号红包可以一对一或者一对多发送，专为创建EOS账号所用，已存在的EOS账号不能领取该红包。用户设置好单个红包金额和红包个数，生成红包后可分享至各个社交平台。如果单个红包金额小于当前创建EOS账户所需的金额，则用户领取红包失败': 'The Red Packet for Account Creation can be sent one-to-one or one-to-many, which is specifically used to create EOS account. The existing EOS accounts cannot collect the red packet. Users set the amount of a single red packet and the number of red packets then share the red packets to various social platforms. If the amount of a red packet is less than the amount currently required to create an EOS account, the user will fail to collect the red packet.',
  '服务异常，请稍后': 'Service exception, please wait',
  '领取失败': 'Failed',
  '失败': 'Failed',
  '红包已无效': 'Invalid Red Packet',
  '转账成功': 'Successed',
  '创建账号失败，可能账号已存在或转账金额不足': 'Create account failed, account already exists or insufficient transfer amount',
  '创建账号失败，可能账号已存在或红包金额不足': 'Create account failed, account already exists or insufficient balance',
  '请输入正确的EOS账户': 'Invalid account',
  '请输入红包串领取红包': 'Please enter red packet code',
  '第一步: 请按下面信息从交易所提币或通过EOS钱包转帐': 'Step 1.Please follow the imformation below to withdraw EOS from the exchange or tranfer EOS from wallet.',
  '第二步: 复制并通过IM工具把[红包串]发送给你的朋友们': 'Step 2.Copy the red packet code to your friend in IM tools.',
  '转账时复制下面的信息到Memo': 'Copy the following informarion into Memo.',
  '通过IM工具将红包串发送给你的朋友': 'Copy the red packet code to your friend in IM tools.',
  '祝福语中不能包含': '"-" cannot be included in the greetings',
  '创建账号成功，请将私钥保存到安全位置': 'Create account successfully，keep your private key safe',
  '单个红包金额': 'Value of each packet',
  '建账号红包': 'Account Creation',
  '红包总金额': 'The total amount of this red packet',
  '请输入单个红包金额': 'Please enter Value of each packet',
  '单个红包金额不能低于0.3EOS': 'Value of each packet Not lower than 0.3EOS',
}

let cnConfig = {
  '普': '普',
  '拼': '拼',
  '建': '建',
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
  '12位字符，由字母a-z与数字1-5组成': '12位字符，由字母a-z与数字1-5组成',
  '公钥': '公钥',
  '生成新公钥': '生成新公钥',
  '不要透露给任何人': '不要透露给任何人',
  '私钥': '私钥',
  '领取': '领取',
  '提示': '提示',
  '是': '是',
  '否': '否',
  '确定私钥已保存安全位置': '确定私钥已保存安全位置',
  '确定要用该红包创建账号': '确定要用该红包创建账号',
  '请输入公钥': '请输入公钥',
  '复制成功': '复制成功',
  '关于我们': '关于我们',
  '创建EOS账号': '创建EOS账号',
  '我塞的红包': '我塞的红包',
  '发红包': '发红包',
  '请输入': '请输入',
  '请输入红包串': '请输入红包串',
  '请输入红包串或者红包ID': '请输入红包串或者红包ID',
  '请输入有效值': '请输入有效值',
  '您输入的内容无效或者红包已失效': '您输入的内容无效或者红包已失效',
  '红包已领完或者红包已失效': '红包已领完或者红包已失效',
  '所有者和使用者公钥相同': '所有者和使用者公钥相同',
  '红包串': '红包串',
  '请正确输入红包串': '请正确输入红包串',
  '创建账号成功': '创建账号成功',
  '选填': '选填',
  '创建账号': '创建账号',
  '该浏览器不支持自动复制': '该浏览器不支持自动复制',
  '收款账号': '收款账号',
  '转账金额': '转账金额',
  '转账': '转账',
  '请输入转账金额': '请输入转账金额',
  '备注': '备注(Memo)',
  '普通红包': '普通红包',
  '拼手气红包': '拼手气红包',
  '最少0.1': '最少0.1',
  '最少0.3': '最少0.3',
  '币种': '币种',
  '最少': '最少',
  '红包金额': '红包总金额',
  '最多100': '最多100',
  '红包个数': '红包个数',
  '个': '个',
  '恭喜发财，大吉大利': '恭喜发财，大吉大利',
  '红包金额以实际转账为准': '红包金额以实际转账为准',
  '塞钱进红包': '塞钱进红包',
  '未领取的红包，将于转账成功24小时后发起退款': '未领取的红包，将于转账成功24小时后发起退款',
  '请输入红包金额': '请输入红包金额',
  '请输入红包个数': '请输入红包个数',
  '红包金额不能低于0.1EOS': '红包金额不能低于0.1EOS',
  '红包金额不能低于': '红包金额不能低于',
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
  '目前支持EOS,EGT币种、中英文版本': '目前支持EOS,EGT币种、中英文版本',
  '红包简介': '红包简介',
  '简介普通红包': '普通红包',
  '普通红包可以一对一或者一对多发送，用户设置好红包总金额和红包个数后，会生成一串字符串，可分享至各个社交平台，每个被领取的红包金额相同': '普通红包可以一对一或者一对多发送，用户设置好红包总金额和红包个数后，会生成一串字符串，可分享至各个社交平台，每个被领取的红包金额相同。',
  '简介拼手气红包': '拼手气红包',
  '拼手气红包可以一对多发送，用户设置好红包总金额和红包个数后，会生成一串字符串，可分享至各个社交平台，每个被领取的红包金额随机不等': '拼手气红包可以一对多发送，用户设置好红包总金额和红包个数后，会生成一串字符串，可分享至各个社交平台，每个被领取的红包金额随机不等。',
  '服务费用': '服务费用',
  '红包被领取时合约将自动扣除0.1%的手续费，如果红包超过24小时红包未被领取，合约将自动返还全部EOS并不收取任何费用': '红包被领取时合约将自动扣除0.1%的手续费，如果红包超过24小时红包未被领取，合约将自动返还全部EOS并不收取任何费用。',
  '简介建账号红包': '建账号红包',
  '建账号红包可以一对一或者一对多发送，专为创建EOS账号所用，已存在的EOS账号不能领取该红包。用户设置好单个红包金额和红包个数，生成红包后可分享至各个社交平台。如果单个红包金额小于当前创建EOS账户所需的金额，则用户领取红包失败': '建账号红包可以一对一或者一对多发送，专为创建EOS账号所用，已存在的EOS账号不能领取该红包。用户设置好单个红包金额和红包个数，生成红包后可分享至各个社交平台。如果单个红包金额小于当前创建EOS账户所需的金额，则用户领取红包失败',
  '服务异常，请稍后': '服务异常，请稍后',
  '领取失败': '领取失败',
  '失败': '失败',
  '红包已无效': '红包已无效',
  '转账成功': '转账成功',
  '创建账号失败，可能账号已存在或转账金额不足': '创建账号失败，可能账号已存在或转账金额不足',
  '创建账号失败，可能账号已存在或红包金额不足': '创建账号失败，可能账号已存在或红包金额不足',
  '请输入正确的EOS账户': '请输入正确的EOS账户',
  '请输入红包串领取红包': '请输入红包串领取红包',
  '第一步: 请按下面信息从交易所提币或通过EOS钱包转帐': '第一步: 请按下面信息从交易所提币或通过EOS钱包转帐',
  '第二步: 复制并通过IM工具把[红包串]发送给你的朋友们': '第二步: 复制并通过IM工具把[红包串]发送给你的朋友们',
  '转账时复制下面的信息到Memo': '转账时复制下面的信息到Memo',
  '通过IM工具将红包串发送给你的朋友': '通过IM工具将红包串发送给你的朋友',
  '祝福语中不能包含': '祝福语中不能包含"-"',
  '创建账号成功，请将私钥保存到安全位置': '创建账号成功，请将私钥保存到安全位置',
  '单个红包金额': '单个红包金额',
  '建账号红包': '建账号红包',
  '红包总金额': '红包总金额',
  '请输入单个红包金额': '请输入单个红包金额',
  '单个红包金额不能低于0.3EOS': '单个红包金额不能低于0.3EOS',
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
