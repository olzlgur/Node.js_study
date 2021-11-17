// @ts-check
// 3
// aaaaaaaaaaaaabbbbbbbbbbbaaaaaaaaabbbbbaaaab...

// a의 연속 구간(a chunk), b의 연속 구간(b chunk)

const fs = require('fs')

const ws = fs.createWriteStream('bigfile2')

const NUM_BLOCKS = 500

/** @type {Object.<string, number>} */
const numBLocksPerCharacter = {
  a: 0,
  b: 0,
}

for (let i = 0; i < NUM_BLOCKS; i += 1) {
  // a와 b가 번갈아가면서 입력
  const blocklength = Math.floor(800 + Math.random() * 200)
  const character = i % 2 === 0 ? 'a' : 'b'
  ws.write(character.repeat(1024 * blocklength))

  numBLocksPerCharacter[character] += 1 // 호출된 횟수
}

console.log(numBLocksPerCharacter)
