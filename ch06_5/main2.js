// @ts-check
// stream - 데이터의 파이프 ( 흐름 )

const fs = require('fs')

const stream = fs.createReadStream('test') // 파일을 읽어내는 스트림을 만들어서

stream.pipe(process.stdout) // 표준출력에 연결해준 것
// 스트림은 버퍼와 다르게 적은 메모리를 사용함
// 데이터를 흘러가면서 처리할 수 있기 때문 ~
// 대용량 처리에 특화
