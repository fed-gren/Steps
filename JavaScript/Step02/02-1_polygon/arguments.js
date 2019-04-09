//1~무한대까지 인자를 받아 합을 구하는 함수
let getSum = function() {
  let sum = 0;
  let len = arguments.length;
  while(len-- > 0) {
    (Number.isFinite(arguments[len])) ? sum += arguments[len] : sum += 0;
  };
  return sum;
}
console.log(getSum(1,2,3,4,5,6));  //21