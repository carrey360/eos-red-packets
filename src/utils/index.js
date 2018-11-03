import Clipboard from 'clipboard'

// 生成UUID
export function getUUID () {
  return (new Date()).getTime() * 10000 + parseInt((Math.random() * 10000 + 1))
}

export function formatePacket (str = '') {
  str = str + ''
  let result = {
    isMemo: false
  }

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
    result = {
      isMemo: true,
      blessing: strSplit[0],
      uuid: strSplit[2],
      type: strSplit[1],
      limit: strSplit[3],
      sign: strSplit[4]
    }
  }

  return result
}

export function ajaxPost (url, data, success, error) {
  var _data = JSON.stringify(data)
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
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
