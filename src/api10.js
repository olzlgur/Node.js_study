// @ts-check
/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

const { brotliDecompress } = require('zlib')

// 포스트 타입 정의
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
 * @property {(matches: string[], body: string) => Promise<APIResponse>} callback
 */
// 항상 요청되는 것들을 타입으로 정의

/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
      // 모든 게시물 호출
      statusCode: 200,
      body: posts,
    }),
  },

  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: 'GET',
    callback: async (matches) => {
      const postId = matches[1]
      if (!postId) {
        return {
          statusCode: 404,
          body: 'Not found',
        }
      }
      const post = posts.find((_post) => _post.id === postId)

      if (!post) {
        return {
          statusCode: 404,
          body: 'Not found',
        }
      }

      return {
        statusCOde: 200,
        body: 'Not found',
      }
    },
  },

  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async (_, body) => {
      /**
       * @typedef CreatePostBody
       * @property {string} id
       * @property {string} title
       * @property {string} content
       */

      /** @type string */
      /* eslint-disable-next-line prefeer-destructurting */

      const title = body.title

      posts.push({
        id: body.title,
      })

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
