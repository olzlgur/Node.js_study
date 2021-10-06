/* eslint-disable */

class Person {
  constructor(name) {
    // 생성자
    this.name = name
  }

  greet() {
    return `Hi, ${this.name}`
  }
}

class Student extends Person {
  constructor(name) {
    super(name)
  }

  study() {
    return `${this.name} is studying`
  }
}

const me = new Student('JiHyeok')
console.log(me.study())
console.log(me.greet())
