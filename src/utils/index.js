import Clipboard from 'clipboard'
import ecc from 'eosjs-ecc'
import Eos from 'eosjs'

// 生成UUID
export function getUUID () {
  return (new Date()).getTime() * 10000 + parseInt((Math.random() * 10000 + 1))
}

export function formatePacket (str = '') {
  str = str + ''
  let result = {
    isMemo: false
  }
  str = str.split(/\n|\r/)[0]
  let strSplit = str.split('-')
  let id = parseInt((new Date()).getTime() / 1000)
  if (strSplit.length < 5 && (isNaN(+strSplit[0]) || +strSplit[0] < id)) {
    result = {
      isMemo: false
    }
  } else if (!isNaN(+strSplit[0]) && +strSplit[0] > id) {
    result = {
      isMemo: true,
      uuid: str,
      sign: ''
    }
  } else if (strSplit.length < 5) {
    result.isMemo = false
  } else {
    let params = `${strSplit[2]}_${strSplit[1]}_${strSplit[0]}`

    let sign = ecc.sign(params, strSplit[4])

    result = {
      isMemo: true,
      blessing: strSplit[0],
      uuid: strSplit[2],
      type: strSplit[1],
      limit: strSplit[3],
      sign: sign
    }
  }
  return result
}

function ajaxPost (url, data, success, error) {
  var _data = JSON.stringify(data)
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 304) {
        success.call(this, xhr.responseText)
      } else {
        error && error(xhr.responseText)
      }
    }
  }
  xhr.send(_data)
}

export function copy (className, that) {
  var clipboard = new Clipboard(className)
  clipboard.on('success', e => {
    window.tip(that.$t('复制成功'))
    // 释放内存
    clipboard.destroy()
  })
  clipboard.on('error', e => {
    // 不支持复制
    window.tip(that.$t('该浏览器不支持自动复制'))
    // 释放内存
    clipboard.destroy()
  })
}

export function getTableRow (_this, params, success, error) {
  let url = _this.$store.state.eosjsConfig.endpoint + '/v1/chain/get_table_rows'

  ajaxPost(url, params, function (res) {
    let response = JSON.parse(res)
    success && success.call(this, response)
  }, error)
}
/**
 * 生成红包串
 * @ blessing {*} 祝福语
 * @ type {*} 红包类型
 * @ uuid {*} 红包ID
 * @ limit {*} 红包个数
 * @ privarekey {*} 私钥
 */
export function generatePacketCode (blessing, type, uuid, limit, privarekey, lang) {
  const cnStr = '复制本条消息并通过浏览器打开https://redpacketeos.com兑换EOS红包'
  const enStr = 'Copy the whole message and redeem the EOS red packet from https://redpacketeos.com'
  const langStr = lang === 'en' ? enStr : cnStr
  // let params = `${uuid}_${type}_${blessing}`

  return `${blessing}-${type}-${uuid}-${limit}-${privarekey}\r\n------------------\r\n${langStr}`
  // return `${blessing}-${type}-${uuid}-${limit}-${ecc.sign(params, privarekey)}\r\n------------------\r\n${langStr}`
}
/**
 * 生成红包memo
 */
export function generateMemo (type, uuid, limit, redPubKeyName, redSelfPublicKey, blessing) {
  return `REDPACKET-${type}-${uuid}-${limit}-${redPubKeyName}-${redSelfPublicKey}-${blessing}`
}
/**
 * 转账
 * @param {*} scatter
 * @param {*} scatterNetwork
 * @param {*} 用户标识
 * @param {*} 收款账户
 * @param {*} eos数量
 * @param {*} memo
 */
export function transfer (scatter, scatterNetwork, accounIdentity, toAccont, amount, memo) {
  const fromAccount = accounIdentity
  const eosOptions = {expireInSeconds: 60 * 2}
  const eos = scatter.eos(scatterNetwork, Eos, eosOptions)
  const transactionOptions = { authorization: [`${fromAccount.name}@${fromAccount.authority}`] }
  return eos.transfer(fromAccount.name, toAccont, (+amount).toFixed(4) + ' EOS', memo, transactionOptions).then(result => {
    if (result && result.transaction_id) {
      return 'success'
    } else {
      return result.error
    }
  })
}
