// @ts-check

const fs = require('fs')
const stream = require('stream')
const zlib = require('zlib')
const util = require('util')

/*
stream.pipeline(
  fs.createReadStream('bigfile'),
  zlib.createGzip(),
  fs.createWriteStream('bigfile.gz'),
  (err) => {
    if (err) {
      error('Pipeline failed', err)
    } else {
      log('Pipeline succeeded')
    }
  }
)
*/
// transfrom을 쉽게 해주는 것이 pipeline
// 이런식으로 코드를 작성하면 코드가 활모양이 되고 알아보기 힘들고 에러 분석이 힘들어짐

async function gzip() {
  return util.promisify(stream.pipeline)(
    fs.createReadStream('bigfile'),
    zlib.createGzip(),
    fs.createWriteStream('bigfile.gz')
  )
} // 노드의 util.promisify() 를 이용해서 파이프라인을 promise 형태로 간결하게 작성

gzip()
