function dec2bin(decimal) {
  let answer = [];
  let remainder = 0;
  while(decimal > 1) {
    remainder = parseInt(decimal) % 2;  //int,double 구분이 없어서 parseInt 처리
    answer.push(remainder);
    decimal /= 2;
  }
  return answer;
}
let num = 10;
console.log(dec2bin(num));  //[0,1,0,1]
num = 173;
console.log(dec2bin(num));  //[1,0,1,1,0,1,0,1]