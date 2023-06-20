function secondsToTime(seconds: number) {
  const hours = String(Math.trunc(seconds / 3600))
  seconds = seconds % 3600

  const minutes = String(Math.trunc(seconds / 60))
  seconds = Math.trunc(seconds % 60)

  return `${minutes.padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

export { secondsToTime }