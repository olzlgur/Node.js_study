// @ts-check

// 1

// 버퍼를 통해서 읽어오기

const fs = require('fs')

const data = fs.readFileSync('bigfile2', 'utf-8') // 버퍼형태로 파일을 읽어옴

/** @type {Object.<string, number>} */
const numBLocksPerCharacter = {
  a: 0,
  b: 0,
}

/** @type {string | undefined} */
let prevCharacter

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

// 시간은 스트림과 비슷하거나 조금 빠름
// 하지만 메모리 사용이 버퍼가 훨씬 비효율적임
// 여기서는 약 25배
