import Clipboard from 'clipboard'
// import ecc from 'eosjs-ecc'
import Eos from 'eosjs'

// 生成UUID
export function getUUID () {
  return (new Date()).getTime() * 10000 + parseInt((Math.random() * 10000 + 1))
}

// http://localhost:8080/receive?id=15429607778751232&h=4014397492
export function formatePacket (str = '') {
  str = str + ''
  let result = {
    isMemo: false
  }
  let id = parseInt((new Date()).getTime() / 1000)
  if (!isNaN(str) && parseInt(str) > id) {
    return {
      isMemo: true,
      uuid: str,
      h: ''
    }
  }

  let obj = {}
  let reg = /([^?&=]+)=([^?&=]*)/g
  str.replace(reg, function (rs, $1, $2) {
    var name = decodeURIComponent($1)
    var val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val.split(/\n|\r/)[0]
    return rs
  })

  if (isNaN(+obj.id) || +obj.id < id) {
    result = {
      isMemo: false
    }
  } else if (!isNaN(+obj.id) && +obj.id > id && !obj.h) {
    result = {
      isMemo: true,
      uuid: str,
      h: ''
    }
  } else {
    result = {
      isMemo: true,
      uuid: obj.id,
      h: obj.h
    }
  }
  return result
}

function ajaxPost (url, data, success, error, from = 'getRow') {
  var _data = JSON.stringify(data)
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  if (from === 'server') {
    xhr.setRequestHeader('Content-Type', 'application/json')
  }
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
  }, error, 'getRow')
}

/**
 * 生成红包串
 * @ uuid {*} 红包ID
 * @ sig
 * @ lang
 */
export function generatePacketCode (bless, uuid, hash, lang) {
  let cnStr = `${bless}\r\n- - - - - - - - - - - - -\r\n通过浏览器打开\r\nhttps://redpacketeos.com/receive?id=${uuid}&h=${hash}\r\n兑换EOS红包或者创建免费的EOS账户。EOS红包由火币矿池和麒麟社区共同开发。可以通过派发建账号红包来使用户免费创建EOS账号。`

  let enStr = `${bless}\r\n- - - - - - - - - - - - -\r\nCreate free EOS account or get free EOS through the following link \r\nhttps://redpacketeos.com/receive?id=${uuid}&h=${hash}\r\n This event is brought to you by “EOS Red Packets”, a project co-created by Huobi Pool and Kylin Community.`

  let langStr = lang === 'en' ? enStr : cnStr
  return langStr
}
/**
 * 生成红包memo
 */
export function generateMemo (type, uuid, limit, redPubKeyName, redSelfPublicKey, blessing) {
  return `2-${type}-${uuid}-${limit}-${redPubKeyName}-${redSelfPublicKey}-${blessing}`
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
export function transfer (scatter, scatterNetwork, accounIdentity, toAccont, amount, memo, currency = 'EOS') {
  const eosOptions = {expireInSeconds: 60 * 2}
  const eos = scatter.eos(scatterNetwork, Eos, eosOptions)
  const fromAccount = accounIdentity
  // 转eos
  if (currency === 'EOS') {
    const transactionOptions = { authorization: [`${fromAccount.name}@${fromAccount.authority}`] }
    return eos.transfer(fromAccount.name, toAccont, (+amount).toFixed(4) + ' ' + currency, memo, transactionOptions).then(result => {
      if (result && result.transaction_id) {
        return 'success'
      } else {
        return result.error
      }
    })
  } else if (currency === 'EGT') { // EGT
    return eos.transaction(
      {
        actions: [
          {
            account: 'eosiotokener',
            name: 'transfer',
            authorization: [{actor: fromAccount.name, permission: 'active'}],
            data: {
              from: fromAccount.name,
              to: toAccont,
              quantity: (+amount).toFixed(4) + ' ' + currency,
              memo: memo
            }
          }
        ]
      }
    ).then(result => {
      if (result && result.transaction_id) {
        return 'success'
      } else {
        return result.error
      }
    })
  }
}

/**
 * 调取后端接口
 * @param {*} _this
 * @param {*} id
 * @param {*} type
 * @param {*} greetings
 * @param {*} private_key
 * @param {*} successFn
 * @param {*} errorFn
 */
export function apiCreate (_this, id, type, greetings, privateKey, successFn, errorFn) {
  let url = _this.$store.state.apiHost + '/redpacket/create'

  let params = {
    id: id + '',
    type,
    greetings,
    private_key: privateKey
  }
  ajaxPost(url, params, function (res) {
    let response = JSON.parse(res)
    successFn && successFn.call(this, response)
  }, errorFn, 'server')
}

export function apiVerify (_this, id, h, sessionid, sig, token, successFn, errorFn) {
  let url = _this.$store.state.apiHost + '/redpacket/verify'
  let params = {
    id: String(id),
    hash: h,
    sessionid,
    sig,
    token,
    scene: 'nc_activity_h5'
  }
  ajaxPost(url, params, function (res) {
    let response = JSON.parse(res)
    successFn && successFn.call(this, response)
  }, errorFn, 'server')
}
