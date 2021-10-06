// @ts-check
/* eslint-disable */

// resolve, reject
/*new Promise((resolve, reject) => {
  // 안으로 접근해서 바로 실행이 됨
  console.log('Inside promise')
  reject(new Error('First reject')) // 오류 잡는 역할 reject가 되어도 아래 내용이 모두 실행 됨
  resolve('First resolve') // 값을 뒤로 넘겨줌 하지만 reject가 먼저 실행되면 resolve 값을 사용하지는 않음
  // resolve가 먼저 실행되고 아래에 reject문이 오게되면 reject가 실행되지 않음
})
  .then((value) => {
    console.log('Inside first then')
    console.log('value', value)
  })
  .catch((error) => {
    console.log('error', error)
  })
*/ // 코드가 오른쪽으로 들어가지 않음

new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Before timeout')
    resolve(Math.random())
    console.log('After resolve')
  }, 1000)
})
  .then((value) => {
    console.log('value', value)
  })
  .then(() => {
    console.log('then 1')
  })
