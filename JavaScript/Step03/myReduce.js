//Array reduce method 구현하기
function myReduce(callback, initialValue) {
  let currentIndex = 0;
  const arr = this;
  for([currentIndex, value] of Object.entries(this)) {
    if(initialValue === undefined) {
      initialValue = this[0];
      continue;
    }
    initialValue = callback(initialValue, value, currentIndex, arr) //initialValue를 누적값으로 사용하고, 순회하면서 현재값에 넣어준다!!
  }
  return initialValue;
}

Array.prototype.myReduce = myReduce;

let reducer = function(accumulator, currentValue) {
  return accumulator + currentValue;
}

let reducerMul = function(accumulator, currentValue) {
  return accumulator * currentValue;
}





//확인용
const arr1 = [1,2,3,4];
const arr2 = [4,5,6];

console.log(arr1.myReduce(reducer));  //10
console.log(arr1.reduce(reducer));    //10

console.log(arr1.myReduce(reducer, 2));  //12
console.log(arr1.reduce(reducer, 2));    //12

console.log(arr2.myReduce(reducerMul)); //120
console.log(arr2.reduce(reducerMul));   //120

console.log(arr2.myReduce(reducerMul, 5)); //600
console.log(arr2.reduce(reducerMul, 5));   //600

const arr3 = ['a','b','c'];

console.log(arr3.myReduce(reducer));  //abc
console.log(arr3.reduce(reducer));    //abc

console.log(arr3.myReduce(reducer, 'z'));  //zabc
console.log(arr3.reduce(reducer, 'z'));    //zabc

const arr4 = [4, 3, 'a', 5, 'b', undefined, 3, 3];
console.log(arr4.myReduce(reducer));    //7a5bundefined33
console.log(arr4.reduce(reducer));      //7a5bundefined33

console.log(arr1.myReduce(function(acc, currVal) {
  return acc - currVal;
}, 2)); //-8

console.log(arr1.reduce(function(acc, currVal) {
  return acc - currVal;
}, 2)); //-8