// 日期格式化函数，传入日期时间（或字符串），返回格式化后的日期时间字符串
// 返回格式如：1分钟前，2小时前，3天前，4月前，5年前

export function formatDate(date) {
  let diff = Date.now() - new Date(date).getTime()
  if (diff < 0) {
    return ''
  } else if (diff < 60000) {
    return '1分钟前'
  } else if (diff < 3600000) {
    return `${Math.floor(diff / 60000)}分钟前`
  } else if (diff < 86400000) {
    return `${Math.floor(diff / 3600000)}小时前`
  } else if (diff < 2592000000) {
    return `${Math.floor(diff / 86400000)}天前`
  } else if (diff < 31536000000) {
    return `${Math.floor(diff / 2592000000)}月前`
  } else {
    return `${Math.floor(diff / 31536000000)}年前`
  }
}
// Path: src/utils/date.js
