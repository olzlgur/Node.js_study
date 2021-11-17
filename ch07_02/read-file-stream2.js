// @ts-check

// 4

const { log } = console

const fs = require('fs')

const rs = fs.createReadStream('bigfile2', {
  encoding: 'utf-8',
  highWaterMark: 65536 * 2, // 한 번에 읽어오는 버퍼의 사이즈를 두배로 증가시켜줌
}) // bigfile을 읽어오는 ReadStream 생성

/** @type {Object.<string, number>} */
const numBLocksPerCharacter = {
  a: 0,
  b: 0,
}

/** @type {string | undefined} */
let prevCharacter
let chunkCount = 0

rs.on('data', (data) => {
  chunkCount += 1
  if (typeof data !== 'string') {
    return
  }

  for (let i = 0; i < data.length; i += 1) {
    if (data[i] !== prevCharacter) {
      const newCharacter = data[i]

      if (!newCharacter) {
        /* eslint-disable-next-line no-continue */
        continue
      }
      prevCharacter = newCharacter
      numBLocksPerCharacter[newCharacter] += 1
    }
  }
})

rs.on('end', () => {
  log('Event: end') // 종료될떄 실행
  log('blockCount', numBLocksPerCharacter)
  log('chunkCount', chunkCount)
})
