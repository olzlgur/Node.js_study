// @ts-check

const os = require('os')

console.log(
  ['arch', os.arch()],
  ['platform', os.platform()],
  ['cpus', os.cpus()]
)
// os 정보를 가져옴

/**
 * child process 모듈
 * node process 하나를 실행하기에는 제약이 있기 때문에
 * spawn을 통해서 새로운 프로세스를 만들어서 실행하게되고
 * 프로세스 끼리는 격리가 되어서 따로 동작이 됨
 *
 */

/**
 * dns  모듈
 * 특정 도메인에 관한 정보를 도메인 서버 네임을 통해서 읽어올 수 있도록 함
 */

/**
 * path 모듈
 * 경로에 대한 연산을 하게 될 경우 path 모듈을 사용함
 * 예를 들면 해당 파일의 바로 옆 파일 실행
 */

const path = require('path')
const fs = require('fs')

const fileContent = fs.readFileSync('./test', 'utf-8')
console.log(fileContent)

const filePath = path.resolve(__dirname, './test') // resolve - 졀대경로를 지정해줌
console.log('filePath', filePath)

// http , https , net(저수준 통신- tcp 프로토콜)
