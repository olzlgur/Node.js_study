// @ts-check
// 2
const { log } = console

const fs = require('fs')

const rs = fs.createReadStream('bigfile', { encoding: 'utf-8' }) // bigfile을 읽어오는 ReadStream 생성

let chunkCount = 0

rs.on('data', (data) => {
  log('Event: data', data[0]) // 데이터를 읽어올때마다 가장 앞 데이터 출력
  chunkCount += 1 // 호출 횟수 카운트
})

rs.on('end', () => {
  log('Event: end') // 종료될떄 실행
  log('chunkCOunt', chunkCount)
})
