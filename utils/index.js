export function formatTime(time) {
  time = Math.round(time)
  let outputTime = time / 1000
  if (time < 10000) {
    outputTime = "0" + outputTime
  }
  while (outputTime.length < 6) {
    outputTime += "0"
  }
  return outputTime
}