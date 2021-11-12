// @ts-check
// 2

const { log } = console

const fs = require('fs')

const rs = fs.createReadStream('jsons', {
  encoding: 'utf-8',
  highWaterMark: 20,
})

// let totalSum = 0

let accumulatedJsonStr = ''
let totalSum = 0

rs.on('data', (data) => {
  log('Event: data', data)

  if (typeof data !== 'string') {
    return
  }

  accumulatedJsonStr += data

  const lastNewlineIdx = accumulatedJsonStr.lastIndexOf('\n')

  const jsonLinesStr = accumulatedJsonStr.substring(0, lastNewlineIdx)
  accumulatedJsonStr = accumulatedJsonStr.substring(lastNewlineIdx) // 받아온 데이터를 나누어줌

  totalSum += jsonLinesStr
    .split('\n')
    .map((jsonLine) => {
      try {
        return JSON.parse(jsonLine)
      } catch {
        return undefined
      }
    })
    .filter((json) => json)
    .map((json) => json.data)
    .reduce((sum, curr) => sum + curr, 0) // 값을 전부 더해줌
})

rs.on('end', () => {
  log('Event: end')
  console.log('totalSum', totalSum)
})
