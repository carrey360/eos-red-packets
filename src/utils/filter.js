import dayjs from 'dayjs'
export function formatDate (value, pattern) {
  return dayjs(value * 1000).format(pattern)
}
