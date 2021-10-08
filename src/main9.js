// @ts-check
/* eslint-disable */

// 프레임워크 없이 간단한 토이프로젝트 웹 서버 만들기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터 베이스로 활용할 예정 (JSON)
 * - 인증 로직은 넣지 않는다.
 * - RESTful API 를 사용
 */

// test는 맞는지만 비교 exec는 구체적으로 정보를 줌
// 데이터 구조

/**
 * post
 *
 * GET / posts
 * GET / posts/Lid
 * POST /posts
 */

const { rejects } = require('assert')
const http = require('http')
const { endianness } = require('os')

const { routes } = require('./api10')
const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    )

    if (!req.url || !route) {
      res.statusCode = 404
      res.end('Not found.')
      return
    }
    const regexResult = route.url.exec(req.url)

    if (!regexResult) {
      res.statusCode = 404
      res.end('Not found.')
      return
    }

    /** @type {Object.<string, *> | undefined}*/
    const reqBody =
      req.headers['content-type'] === 'aplication/json' &&
      (await new Promise((resolve, reject) => {
        req.setEncoding('utf-8')
        req.on('data', (data) => {
          try {
            resolve(JSON.parse(data))
          } catch {
            reject(new Error('Ill-fromed json'))
          }
        })
      }))

    const result = await route.callback(regexResult, reqBody)
    res.statusCode = result.statusCode
    if (typeof result.body === 'string') {
      res.end(result.body) // string 만 받을 수 있음
    } else {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(result.body))
    }
  }

  main()
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)
})

// pip install httpie를 한 뒤
// http localhost:4000 로 확인 가능

// 매번 서버를 다시 켜는 것이 번거롭기 때문에 nodemon 사용 npm run nodemon src/main8.js
// http localhost:4000/posts title=foo content=bar --print hHbB 입력한 정보를 출력해볼 수 있음
