import dayjs from 'dayjs'
export function formatDate (value, pattern) {
  if (!value) {
    return ''
  }
  return dayjs(value * 1000).format(pattern)
}
