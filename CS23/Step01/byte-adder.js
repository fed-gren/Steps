function halfadder(bitA, bitB) {
  var answer = [];
  answer.push(bitA && bitB);  //Carry는 AND.
  answer.push((bitA !== bitB) ? 1 : 0); //Sum은 XOR. XOR는 비교연산이므로 같지 않을 때 1
  return answer;
}

function fulladder(bitA, bitB, carry) {
  var answer = [];
  let tempC = bitA && bitB;
  let tempS = (bitA !== bitB) ? 1 : 0;

  answer.push(tempC || (tempS && carry));  //전가산기의 C
  answer.push((tempS !== carry) ? 1 : 0);  //전가산기의 S
  return answer;
}

function byteadder(byteA, byteB) {
  var answer = [];
  answer.push(halfadder(byteA[0], byteB[0])[1]);
  let carry = halfadder(byteA[0], byteB[0])[0];
  let byteLen = byteA.length;
  // console.log(`first Sum : ${halfadder(byteA[0], byteB[0])[1]}`);
  // console.log(`first Carry : ${carry}`);
  for(let i=1; i<byteLen; i+=1) {
    answer.push(fulladder(byteA[i], byteB[i], carry)[1]);
    carry = fulladder(byteA[i], byteB[i], carry)[0];
    // console.log(`${i} 번 째 연산... A:${byteA[i]}, B:${byteB[i]}, Carry:${carry}`);
    // console.log(`${i}번째 Sum : ${fulladder(byteA[i], byteB[i], carry)[1]} Carry : ${carry}`);
  }
  answer.push(carry); //마지막 자리올림
  console.log(`carry = ${carry}`);
  return answer;
}

let byteA = [ 1, 1, 0, 1, 1, 0, 1, 0 ];
let byteB = [ 1, 0, 1, 1, 0, 0, 1, 1 ];

console.log(byteadder(byteA, byteB)); //[ 0, 0, 0, 1, 0, 1, 0, 0, 1 ]

byteA  = [ 1, 1, 0, 0, 1, 0, 1, 0 ];
byteB  = [ 1, 1, 0, 1, 1, 0, 0, 1 ];

console.log(byteadder(byteA, byteB)); //[ 0, 1, 1, 1, 0, 1, 1, 1, 0 ]

byteA  = [ 1, 1, 0, 0 ];
byteB  = [ 1, 1, 0, 1 ];

console.log(byteadder(byteA, byteB)); //[ 0, 1, 1, 1, 0 ]