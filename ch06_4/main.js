// @ts-check
// 1

const a = require('./module')
const b = require('./module')
const c = require('./module') // 여러번 require하더라도 module.js 파일은 한번만 실행됨

console.log(a === b, b === c)

const d = require('./module')
const e = require('./Module')
const f = require('./MOdule') // 모두 다른 파일로 인식해서 moudule.js가 여러번 실행됨
// 이런 문제를 방지하기 위해서 소문자와 언더스코어(_) 만 사용하는 것이 좋음
console.log(d === e, e === f)

const fs = require('fs') // 파일 시스템에 접근
const { mainModule } = require('process')

// callback style
fs.readFile('ch06_4/main.js', 'utf-8', (err, result) => {
  // 노드에서 가장 일반적인 모듈의 API 형식
  // 인자들이 순서대로 들어가고 마지막에 콜백 함수가 들어감 - 첫 인자로 에러 다음 인자로 결과를 받음
  if (err) {
    console.error(err)
  } else {
    console.log(result)
  }
})
//  비동기

// sync style
const result = fs.readFileSync('ch06_4/main.js', 'utf-8')
// 이러한 형식으로도 파일을 읽을 수 있음
// 동기
// 시간이 더 오래걸림, 쉽고 간단함
// 에러를 try catch로만 처리할 수 있음
console.log(result)

// promise style
// 마찬가지로 똑같은 동작을 실행함
// async await을 사용하면 다양한 경우에 대응이 가능함
// 에러는 try catch로 처리해야함
async function main() {
  const result2 = await fs.promises.readFile('ch06_4/main.js', 'utf-8')
  console.log(result2)
}

main()
