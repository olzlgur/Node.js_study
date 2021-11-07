// @ts-check

console.log('__dirname', __dirname) // 파일이 속한 디렉토리의 경로
console.log('__filename', __filename) // 파일의 경로

process.stdin.setEncoding('utf-8')
process.stdin.on('data', (data) => {
  console.log(data, data.length)
})
