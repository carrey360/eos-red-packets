// return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
// function S4 () {
//   return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
// }

// 生成UUID
export function getUUID () {
  // return (new Date()).getTime() * 10000 * (Math.random() * 30000 + 1)
  return parseInt(Math.random() * 0x10000 + 1)
}

export function formatePacket (str = '') {
  let result = {
    isMemo: false
  }
  let strSplit = str.split('-')
  if (strSplit.length < 5) {
    result.isMemo = false
  } else {
    result = {
      isMemo: true,
      blessing: strSplit[0],
      uuid: strSplit[1],
      type: strSplit[2],
      limit: strSplit[3],
      sign: strSplit[4]
    }
  }
  return result
}
