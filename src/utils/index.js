// return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
// function S4 () {
//   return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
// }

// 生成UUID
export function getUUID () {
  return (new Date()).getTime() * 10000 * (Math.random() * 30000 + 1)
}
