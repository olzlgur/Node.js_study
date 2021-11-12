// @ts-check
// 1

const { log } = console

const fs = require('fs')

const rs = fs.createReadStream('jsons', {
  encoding: 'utf-8',
  highWaterMark: 6,
})

let totalSum = 0

rs.on('data', (data) => {
  log('Event: data', data)

  if (typeof data !== 'string') {
    return
  }

  totalSum += data
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

/* 
  highWaterMark를 6으로 설정하고 프로그램을 실행하면 데이터를 제대로 읽어오지 못함
  이런식으로 청크의 크기를 크다고 잘못 가정하면 이러한 문제가 발생할 수 있음
*/
