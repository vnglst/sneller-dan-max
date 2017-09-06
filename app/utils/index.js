export function formatTime(time) {
  let outputTime = time / 1000
  if (time < 10000) {
    outputTime = "0" + outputTime
  }
  while (outputTime.length < 6) {
    outputTime += "0"
  }
  return outputTime
}

export function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}