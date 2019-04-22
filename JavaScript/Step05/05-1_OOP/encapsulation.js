//? 캡슐화 예시

let baseSalary = 20000;
let overtime = 10;
let rate = 20;

function getWage(baseSalary, overtime, rate) {
  return baseSalary + overtime * rate;
}

//위 코드에 대해 캡슐화
const employee = {
  baseSalary: 20000,
  overtime: 10,
  rate: 20,
  getWage: function() {
    return this.baseSalary + this.overtime * this.rate;
  }
};
