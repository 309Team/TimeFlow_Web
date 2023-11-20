// 格式化日期时间 "2023-11-21 20:36:10"
export function formatDateTime(timer) {
  const year = timer.getFullYear()
  const month = timer.getMonth() + 1 // 由于月份从0开始，因此需加1
  const day = timer.getDate()
  const hour = timer.getHours()
  const minute = timer.getMinutes()
  const second = timer.getSeconds()
  return `${pad(year, 4)}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(second)}`
}

// 格式化日期 "2023-11-21"
export function formatDate(timer) {
  const year = timer.getFullYear()
  const month = timer.getMonth() + 1
  const day = timer.getDate()
  return `${pad(year, 4)}-${pad(month)}-${pad(day)}`
}

// 格式化月份 "2023-11"
export function formatDateMonth(timer) {
  const year = timer.getFullYear()
  const month = timer.getMonth() + 1
  return `${pad(year, 4)}-${pad(month)}`
}

// 定义具体处理标准
// timeEl 传递过来具体的数值：年月日时分秒
// total 字符串总长度 默认值为2
// str 补充元素 默认值为"0"
function pad(timeEl, total = 2, str = '0') {
  return timeEl.toString().padStart(total, str)
}
