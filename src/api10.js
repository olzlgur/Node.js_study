// @ts-check
/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */
// 공통된 기능 정리
/** @type {Post[]} */

// 포스트 타입 정의
/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {string | Object} body
 */
// 응답
/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET' | 'POST'} method
 * @property {(matches: string[], body: Object | undefined) => Promise<APIResponse>} callback
 */
// 항상 요청되는 것들을 타입으로 정의

const fs = require('fs')
const DB_JSON_FILENAME = 'database.json'
/** @returns {Promise<Post[]>} */
async function getPosts() {
  const json = await fs.promises.readFile(DB_JSON_FILENAME, 'utf-8')
  return JSON.parse(json).posts // database.json에서 데이터를 가져옴
}
/**
 * @param {Post []} posts
 */
async function savePosts(posts) {
  const content = {
    posts,
  }
  return fs.promises.writeFile(
    DB_JSON_FILENAME,
    JSON.stringify(content),
    'utf-8'
  )
}
/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
      // 모든 게시물 호출
      statusCode: 200,
      body: await getPosts(), // database.json에 저장되어있는 데이터를 가져옴
    }),
  },

  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/, // post id를 통해 post 불러오기
    method: 'GET',
    callback: async (matches) => {
      const postId = matches[1]
      if (!postId) {
        // postId가 없을경우
        return {
          statusCode: 404,
          body: 'Not found',
        }
      }
      const posts = await getPosts()
      const post = posts.find((_post) => _post.id === postId) // 있을 경우 post를 찾아냄

      if (!post) {
        // post를 찾지 못한 경우
        return {
          statusCode: 404,
          body: 'Not found',
        }
      }

      return {
        statusCode: 200,
        body: post,
      }
    },
  },

  {
    url: /^\/posts$/, // post 생성
    method: 'POST',
    callback: async (_, body) => {
      /**
       * @typedef CreatePostBody
       * @property {string} title
       * @property {string} content
       */
      /** @type {CreatePostBody} */
      if (!body) {
        return {
          statusCode: 400,
          body: 'Ill-formed',
        }
      }

      /** @type {string} */
      /* eslint-disable-next-line prefer-destructuring */
      const title = body.title
      const newPost = {
        id: title.replace(/\s/g, '_'),
        title,
        content: body.content,
      }

      const posts = await getPosts()
      posts.push(newPost)
      posts.push(newPost)

      return {
        statusCode: 200,
        body: 'test',
      }
    },
  },
]

module.exports = {
  routes,
}
// 다른 파일에서 사용할 수 있게 해줌
