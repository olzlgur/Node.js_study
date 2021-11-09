// @ts-check
let count = 0
console.log('__dirname', __dirname) // 파일이 속한 디렉토리의 경로
console.log('__filename', __filename) // 파일의 경로

process.stdin.setEncoding('utf-8')
process.stdin.on('data', (data) => {
  console.log(data, data.length)
})

process.stdin.pipe(process.stdout) // 스트림을 다른 스트림으로 파이핑 해주는 것 - 결과를 다른 스트림에 넣어준다.
// stdin으로 들어온 것을 stdout 으로 보낸다.
console.log(process.argv) // 명령 줄 인자들이 배열로 들어감

const handle = setInterval(() => {
  console.log('Interval')
  count += 1

  if (count === 4) {
    console.log('done!')
    clearInterval(handle) // 인터벌을 종료시켜줌
  }
}, 1000) // 1초 단위로 실행

const timeoutHandle = setTimeout(() => {
  console.log('TimeOut')
}, 1000) // 1초 뒤에 실행

clearTimeout(timeoutHandle)
// 타임아웃을 종료시켜줌
