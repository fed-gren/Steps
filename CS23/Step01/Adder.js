function halfadder(bitA, bitB) {
  var answer = [];
  answer.push(bitA && bitB);  //Carry는 AND.
  answer.push((bitA !== bitB) ? 1 : 0); //Sum은 XOR. XOR는 비교연산이므로 같지 않을 때 1
  return answer;
}

// console.log(halfadder(0 ,0));     //[0, 0]  [c, s]
// console.log(halfadder(0 ,1));     //[0, 1]
// console.log(halfadder(1 ,0));     //[0, 1]
// console.log(halfadder(1 ,1));     //[1, 0]

function fulladder(bitA, bitB, carry) {
  var answer = [];
  //전가산기의 C : A,B의 반가산한 C와 carry와 S를 반가산한 C의 OR 연산 결과.. 글로 쓰려니 복잡하다.
  //전가산기의 S : 회로 구성에 맞게 a,b를 반가산 연산한 S와 carry를 다시 반가산.
  let tempC = bitA && bitB;
  let tempS = (bitA !== bitB) ? 1 : 0;

  answer.push(tempC || (tempS && carry));  //전가산기의 C
  answer.push((tempS !== carry) ? 1 : 0);  //전가산기의 S
  return answer;
}

console.log(fulladder(0 ,0, 0));     //[0, 0]  [c, s]
console.log(fulladder(0 ,0, 1));     //[0, 1]
console.log(fulladder(0 ,1, 0));     //[0, 1]
console.log(fulladder(0 ,1, 1));     //[1, 0]
console.log(fulladder(1 ,0, 0));     //[0, 1]
console.log(fulladder(1 ,0, 1));     //[1, 0]
console.log(fulladder(1 ,1, 0));     //[1, 0]
console.log(fulladder(1 ,1, 1));     //[1, 1]