// @ts-check
/* eslint-disable */
// core-js 를 사용하면 아직 적용되지 않은 기능도 사용 할 수 있다.

const { resolve } = require('path/posix')

const complicateArray = [1, [2, 3]]
const flattendArray = complicateArray.flat()

console.log(flattendArray)

const original = 'abcabc123'
const changed = original.replaceAll('abc', '123')
console.log(changed)

/**
 *
 * @param {number} duration
 */

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, 1000)
  })
}

Promise.all([sleep(1000), sleep(2000), sleep(3000)])
