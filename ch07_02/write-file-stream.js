// @ts-check
// 1
// 스트림으로 큰 파일 처리하기

const fs = require('fs')

const ws = fs.createWriteStream('bigfile') // local에 파일 저장

ws.write('Hello, world') // 데이터 작성

for (let i = 0; i < 500; i += 1) {
  // 500MB의 파일 생성
  ws.write('a'.repeat(1024 * 1024))
}
