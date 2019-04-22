//? class 예시.

//class 선언문
class Ball {
  constructor(name, radius) {
    this.name = name;
    this.radius = radius;
  }
}

//class 표현식
//unnamed
const ball = class {
  constructor(name, radius) {
    this.name = name;
    this.radius = radius;
  }
};
console.log(ball.name); //ball

//named
const anotherBall = class MyBall {
  constructor(name, radius) {
    this.name = name;
    this.radius = radius;
  }
};
console.log(anotherBall.name); //MyBall
