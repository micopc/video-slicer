export function generateRandomID() {
  return `${new Date().getUTCMilliseconds()}-${Math.random()}`
}

export function formatTimeMarks(time) {
  if (!time) {
    return '0:00'
  }

  let seconds = time % 60
  const minutes = Math.floor(time / 60)

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  return `${minutes}:${seconds}`
}
