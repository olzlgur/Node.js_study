// @ts-check

const fs = require('fs')

const result = fs.readFileSync('test') // utf-8 인코딩 설정을 빼면 byte code가 나옴 - 문자들의 아스키 코드값이 나옴

console.log(result)

// 1 byte(8bit) 는 0 이상 255 이하의 값

const buf = Buffer.from([97, 98, 99, 100, 101]) // 버퍼를 만드는 함수

console.log(result, buf) // 동일한 결과가 나옴

console.log(buf.compare(result)) // 버퍼를 비교해주는 함수 - 앞에서부터 한바이트씩 비교하고 사전순으로 비교함 앞의 인자가 작으면 -1 크면 1

const bufA = Buffer.from([0])
const bufB = Buffer.from([3])
const bufC = Buffer.from([2])
const bufD = Buffer.from([6])

const bufs = [bufA, bufB, bufC, bufD] // 버퍼를 넣은 정렬

bufs.sort(Buffer.compare)
bufs.sort()

console.log(bufs)

console.log(Buffer.isBuffer(buf)) // 버퍼가 맞는지 검사해주는 함수

console.log(buf.readInt32LE()) // buffer는 256진수로 이루어져있음
console.log(buf.readInt32BE()) // LE: Little Endian  BE: Big Endian  LE는 가장 앞쪽이 작은 자리수 BE는 가장 뒤쪽이 가장 작은 자리수

console.log(buf.readInt32LE(1)) // 인자로 넣어주는 오프셋은 수를 어디서부터 읽을지를 정해줌

/**
 * @param {*} array
 * @returns {number}
 */
function readInt32LE(array) {
  return array[0] + array[1] * 256 + array[2] * 256 ** 2 + array[3] * 256 ** 3
} // 똑같은 기능을 하는 함수 구현

console.log(readInt32LE(buf))
