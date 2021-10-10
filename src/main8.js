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
const http = require('http')

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */
// 포스트 타입 정의
// 잘못된 값을 넣어주거나 없는 요소가 있으면 오류를 표시해줌
/**@type {Post[]}*/ // 배열 형태로 저장

const posts = [
  {
    id: 'my_first_post',
    title: 'My first post',
    content: 'Hello!',
  },
  {
    id: 'my_second_post', // 비어있는 요소가 있어도 일단 실행 됨 -> type 설정
    title: '나의 두번째 포스트',
    content: 'Second Post!',
  },
]
// 데이터 구조

/**
 * post
 *
 * GET / posts
 * GET / posts/Lid
 * POST /posts
 */
const server = http.createServer((req, res) => {
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/ // 자바스크립트의 정규식 - 패턴을 정의하는 것
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined
  if (req.url === '/posts' && req.method === 'GET') {
    // 포스트의 목록을 가져오는 api
    const result = {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
      })),
      totalCount: posts.length, // 글의 갯수
    }
    req.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8') // json으로 content type을 지정 encoding은 utf-8으로 지정
    res.end(JSON.stringify(result))
  } else if (postIdRegexResult && req.method === 'GET') {
    // get post/:id 인 경우
    const postId = postIdRegexResult[1] //구체적인 정보를 가져오는 api

    const post = posts.find((_post) => _post.id === postId)

    if (post) {
      // 해당 id의 포스트를 찾았을 경우
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(post))
    } else {
      //포스트를 못찾았을 경우
      res.statusCode = 404
      res.end('Post not found')
    }
  } else if (req.url === '/posts' && req.method === 'POST') {
    req.setEncoding('utf-8') // encoding은 utf-8로 지정
    req.on('data', (data) => {
      /**
       * @typedef CreatePostBody
       * @property {string} title
       * @property {string} content
       *  */

      /** @type {CreatePostBody} */ //타입 설정
      const body = JSON.parse(data) // 받은 데이터 파싱
      console.log(body)
      posts.push({
        // 데이터 푸시
        id: body.title.toLowerCase().replace(/\s/g, '_'), //입력받은 데이터 푸시 id 값은 title에서 공백을 _로 대체한 것
        title: body.title,
        content: body.content,
      })
    })
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
// http POST localhost:4000/posts title=foo content=bar --print hHbB 입력한 정보를 출력해볼 수 있음
