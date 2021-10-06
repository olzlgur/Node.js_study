// @ts-check
/* eslint-disable */

/**
 *
 * @param {number} duration
 */ // 활모양 코드가 생기지 않음

// promise와는 다르게 try catch를 사용함

async function sleep(duration) {
  //async function
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, 1000)
  })
}

async function main() {
  //await function
  console.log('first')
  await sleep(1000)
  console.log('second')
  await sleep(1000)
}

main()
