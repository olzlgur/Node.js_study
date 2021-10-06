// @ts-check
/* eslint-disable */
// 코드가 더 오른쪽으로 들어감
setTimeout(() => {
  const value = Math.random()
  console.log(value)

  setTimeout(() => {
    const value = Math.random()
    console.log(value)

    setTimeout(() => {
      const value = Math.random()
      console.log(value)
    }, 1000)
  }, 1000)
}, 1000)
