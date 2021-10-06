// @ts-check
/* eslint-disable */

const ary = [1, 2, 3, 4, 5]

const [head, ...rest] = ary
const shouldOverride = true // 조건을 걸어 오버라이드 하는 것이 가능

console.log(head, ...rest)

const personalData = {
  email: 'abc@def.com',
  password: '****',
}

const publicData = {
  nickname: 'foo',
}

const overrides = {
  email: 'dsf@dsf.com',
}

const user = {
  ...personalData,
  ...publicData,
  ...overrides,
  ...(shouldOverride
    ? {
        email: 'fff@fff.com',
      }
    : null),
}

console.log(user)
