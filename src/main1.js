/* eslint-disable */
// Prototype

// 클래스 구현에서도 function을 사용할 수 있음 class 키워드도 존재하긴함

// 상속 개념 구현
function Person(name) {
  this.name = name
}

function Student(name) {
  this.__proto__.constructor(name)
}

Person.prototype.greet = function greet() {
  return `Hi, ${this.name}!`
} // greet을 호출한 객체의 정보를 가져옴

Student.prototype.study = function study() {
  return `${this.name} is studying`
}

Object.setPrototypeOf(Student.prototype, Person.prototype)

const me = new Student('JiHyeok')
console.log(me) // Student { name: 'JiHyeok' }
console.log(me.greet())
console.log(me.study())
// Prototype chain 따로 지정을 안해줘도 가장 가까운 곳에서 정보를 찾기 때문에 me.name 실행이 가능함

console.log(me instanceof Student) // 해당 클래스의 인스턴스가 맞는지
console.log(me instanceof Person)

// 이 부분은 prototype을 이용한 구형 class 이다
