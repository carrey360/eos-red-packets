// return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
// function S4 () {
//   return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
// }

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

export function ajaxPost (url, data, fn) {
  var _data = JSON.stringify(data)
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  // xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      fn.call(this, xhr.responseText)
    }
  }
  xhr.send(_data)
}
