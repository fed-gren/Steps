//? Class 키워드 사용하지 않고 class 구현하기

const animals = {
  run() {
    console.log("run");
  },
  jump() {
    console.log("jump");
  },
  bite() {
    console.log("bite");
  },
  info() {
    console.log(`name is ${this.name}, age is ${this.age}`);
  }
}

const animalFactory = (name, age) => {
  //???
  //Object.create, Object.assign 사용
  return Object.assign(Object.create(animals), {name, age});
}

const man = animalFactory("crong", 33);
console.dir(man);