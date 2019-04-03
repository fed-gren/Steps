# NAND 게이트

### 학습 목표

디지털 논리 회로 기본 부품을 응용해서 만들 수 있는 부가적인 회로에 대해 학습

![NAND 게이트 회로도](https://www.electronics-tutorials.ws/logic/log45.gif)


NAND 게이트에는 스위치 역할을 하는 2개의 트랜지스터가 있다. 이 트랜지스터는 A 혹은 B가 high(1) 상태이면 에미터와 베이스에 전류가 흐른다.

결국 A, B가 동시에 전압이 흐를 때만 +Vcc가 GND에 연결되어 0이 출력되고, 그 외의 상황에는 GND에 연결되지 않으므로 1이 출력된다.

### 미션

NAND 게이트의 동작을 구현한 함수 nand 작성

```
const nand = (paramA, paramB) => {
  result = !(paramA && paramB);
  return result;
}

console.log(nand(0, 0));
console.log(nand(0, 1));
console.log(nand(1, 0));
console.log(nand(1, 1));
```



AND의 반대(NOT)인 NAND 동작 확인

# NOR 게이트

![NOR 게이트 회로도](https://www.electronics-tutorials.ws/logic/log46.gif)

NOR 게이트는 NAND 게이트와 부품이 동일하여 유사해 보이지만 연결이 다르다.

A 혹은 B 둘 중 하나라도 high(1) 상태가 되면 Vcc는 GND와 연결되어 출력은 Low(0)가 될 수 밖에 없다.

### 미션

NOR게이트 동작을 구현한 함수 nor 작성

```
const nor = (paramA, paramB) => {
  result = !(paramA || paramB);
  return result;
}

console.log(nor(0, 0));
console.log(nor(0, 1));
console.log(nor(1, 0));
console.log(nor(1, 1));
```



OR와 반대(NOT)인 NOR 동작 확인

# 이진 덧셈기

### 학습 목표

디지털 논리회로 기본 부품을 응용해서 만들 수 있는 부가적인 회로를 연결해서, 이진 덧셈기를 만든다. 우선 1비트를 더하는 half-adder를 만들고, 8비트를 처리하는 adder를 만든다.

### Half-adder(반가산기)

반가산기에서는 A,B 두 비트를 입력 받아 S로 합을 출력하고 C로는 자리올림을 출력한다.(Sum, Carry)

즉 입력 A, B에 따른 출력 S, C는 다음과 같다.

A  B  S  C

0  0  0  0

0  1   1  0

1   0  1  0

1   1   0  1

이를 A, B, S와 A, B, C로 따로 보면 S는 XOR 연산의 결과이고, C는 AND 연산의 결과이다.

따라서 반가산기의 회로도는 아래와 같이 구성될 수 있다.

![반가산기 회로 구성](https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Half-adder.svg/300px-Half-adder.svg.png)

### Full-adder(전가산기)

반가산기는 이진수 덧셈에서 가장 아래 자릿수만 계산할 수 있다. 두 번째 자리부터는 이 전에서 자리올림이 있을 때 같이 더해야 하기 때문이다. 이를 위해서 3개의 이진수를 연산해야 하고, 이를 위해서 전가산기의 회로도 구성은 아래와 같다.

![전가산기 회로 구성](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Full-adder.svg/550px-Full-adder.svg.png)

회로 구성을 보면 2개의 반가산기에 OR 게이트가 하나 더 연결된 구조이다.

### 미션 1

- BOOL 타입으로 동작하는 이진 덧셈기를 논리 게이트 동작만으로 구현
- 반쪽덧셈(halfadder) : 입력을 두 개 받아서, 합(sum)과 자리올림(carry)를 배열로 리턴하는 함수를 구현합니다.
- 전체덧셈(fulladder) : 입력을 두 개와 자리올림 비트를 입력으로 받아서, 합(sum)과 자리올림(carry)를 배열로 리턴하는 함수를 구현합니다.

반가산기 구현

```js
function halfadder(bitA, bitB) {
  var answer = [];
  answer.push((bitA !== bitB) ? 1 : 0); //Sum은 XOR. XOR는 비교연산이므로 같지 않을 때 1
  answer.push(bitA && bitB);  //Carry는 AND.
  return answer;
}
```



전가산기 구현

```js
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
```



### 미션 2

- 앞에서 만든 이진 덧셈기를 이용해서 BOOL 타입으로 동작하는 8비트 덧셈기를 구현한다.
- 바이트 덧셈(byteadder) : 8비트를 BOOL타입 배열로 2개를 입력 받는다.
- 자리올림(carry) + 전체 합(sum)을 순서대로 배열로 담아서 리턴하는 함수를 구현한다.
- 입력으로 들어오는 byteA, byteB 배열의 길이는 같다고 가정한다.
- 입력으로 들어오는 byteA 비트 순서는 낮은 자리가 배열의 앞쪽에 오도록 표현한다. 배열의 순서대로 보면 이진수가 뒤집혀 있는 것처럼 보인다고 가정한다.

8비트 adder 구현

```js
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
```

### 정리

- 4비트나 16비트도 같은 함수로 한꺼번에 처리 가능한가? 
  - 가능하다.

- byteA와 byteB 배열의 크기가 다르면 어떻게 처리 가능할까? 
  - 더 긴 길이만큼 짧은 길이 뒤에 0을 push한 후 계산한다.

# 진법 변환기

### 학습목표

BOOL 타입으로 만든 8비트 덧셈기에 값을 전달하고, 전달받은 값을 표시하기 위해서 값을 변환하는 함수를 구현한다.

### 배경지식

- 정수형 10진수 값을 2진수로 표현하는 방법 학습
- 2진수를 16진수로 변경하는 방법 학습
- 16진수를 10진수로 변경하는 방법 학습
- 미리 만들어진 수학 함수가 아니라 4칙연산(+, -, *, /) 연산만으로 계산하는 방식으로 학습

### 미션 1

0부터 256 미만의 `Int` 정수형 10진수를 `[Bool]` 2진수 배열로 변환하는 dex2bin 함수를 구현한다.

- 사칙연산만으로 변환하는 방식을 구현한다.
- 만들어지는 비트 순서는 낮은 자리가 배열의 앞쪽에 오도록 표현한다. 배열의 순서대로 보면 이진수가 뒤집혀 있는 것처럼 보인다고 가정한다.

```
이진수 1100 = [ 0, 0, 1, 1 ]` `이진수 0101 = [ 1, 0, 1, 0 ]
```

10진수 → 2진수 변환 함수 구현

```js
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
```

### 미션 2

`[Bool]` 2진수 배열을 `Int` 정수형 10진수로 변환하는 bin2dec 함수를 구현한다.

- 사칙연산만으로 변환하는 방식을 구현한다.
- 입력하는 비트 순서는 낮은 자리가 배열의 앞쪽에 오도록 표현한다. 배열의 순서대로 보면 이진수가 뒤집혀 있는 것처럼 보인다고 가정한다.

2진수 → 10진수 변환 함수 구현

```js
function bin2dec(bin) {
  var answer = 0;
  let val = 1;
  let binLen = bin.length;
  for(let i = 0; i < binLen; i+=1) {
    answer += val * bin[i];
    val *= 2;
  } 
  return answer;
}
```

### 정리

- 앞서 만들었던 이진 덧셈기에 입력과 출력에 연결해서 10진수 덧셈이 동작하는지 여부를 확인한다.
- 같은 방식으로 2진수를 16진법으로 변환하는 함수를 만들어본다.
- 같은 방식으로 16진수를 2진법으로 변환하는 함수를 만들어본다.