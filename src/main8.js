// @ts-check
/* eslint-disable */

// 프레임워크 없이 간단한 토이프로젝트 웹 서버 만들기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터 베이스로 활용할 예정 (JSON)
 * - 인증 로직은 넣지 않는다.
 * - RESTful API 를 사용
 */

/**
 * post
 *
 * GET / posts
 * GET / posts/Lid
 * POST /posts
 */

const http = require('http')
const server = http.createServer((req, res) => {
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9_]+)$/ // 자바스크립트의 정규식 - 패턴을 정의하는 것
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined
  if (req.url === '/posts' && req.method === 'GET') {
    req.statusCode = 200
    res.end('List of posts')
  } else if (req.url && POSTS_ID_REGEX.test(req.url)) {
    const regexResult = POSTS_ID_REGEX.exec(req.url) // exec는 구체적으로 정보를 줌
    if (regexResult) {
      // id를 출력해보는 구문
      const postId = regexResult[1]
      console.log(postId)
    }
    req.statusCode = 200
    res.end('Some content of the post')
  } else if (req.url === '/posts' && req.method === 'POST') {
    req.statusCode = 200
    res.end('Creating post')
  } else {
    res.statusCode = 200
    res.end('Not found')
  }
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`The server is listening at port: ${PORT}`)
})

// pip install httpie를 한 뒤
// http localhost:4000 로 확인 가능

// 매번 서버를 다시 켜는 것이 번거롭기 때문에 nodemon 사용 npm run nodemon src/main8.js
