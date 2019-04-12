### 배열 (Array)

배열을 탐색하는 다양한 방법이 있다.

- forEach
- for
- for-in
- for-of

**forEach**

forEach는 배열 내 각 요소를 순회하며 콜백 함수로 요소를 처리할 수 있다.

```js
const arr = ['a', 'b', 'c'];
arr.forEach((element) => console.log(element)); //a,b,c가 한줄 씩 출력된다.
```

인자에 arrow function 형태로 콜백 함수를 입력했다. 콜백 함수 안에는 총 3개의 인자가 optional 하게 들어갈 수 있는데, 첫 번째 인자는 현재 순회 중인 요소, 두 번째 인자는 순회 중인 요소의 인덱스, 세 번째 인자는 순회 중인 배열 자체이다.

**for loop**

배열은 값에 접근할 때 숫자값인 인덱스를 사용하기 때문에 단순한 for문으로도 배열 순회가 가능하다.

```js
const arr = ['q', 'w', 'e', 'r'];
for(let idx=0; i<=arr.length; i+=1) {
	console.log(arr[idx]);
}//q, w, e, r이 각각 한 줄씩 출력 된다.
```

**for-in**

for-in은 배열의 인덱스가 아닌, 객체의 순회 가능한 프로퍼티를 통해 순회 한다.

하지만 배열이 sparse array인 경우 for-in을 배열을 순회하는데 사용할 수 있다.

------

sparse array는 0에서 시작한 연속된 인덱스가 없는 배열을 의미한다.

sparse array Array() 생성자를 사용하여 생성하거나 단순히 현재 배열 길이보다 큰 배열 인덱스에 할당하여 생성할 수 있다.

```js
const arr1 = new Array(100);  //원소는 없지만 length는 100
const arr2 = [];
arr2[100] = 'A';  //원소가 비어있다가 100번째 원소만 A라는 값이 있다.
```

------

sparse array에서는 값이 존재하는 인덱스 끼리의 사이에 비어있는 인덱스가 존재한다. for문을 사용하면 이를 모두 순회하게 되는데, 이는 낭비일 수 있다.

비어있는 인덱스를 순회하지 않을 때, for-in을 사용하면 된다.

```js
const sparseArr = [];
sparseArr[0] = 'a';
sparseArr[5] = 'b';
sparseArr[10] = 'c';

console.log("for loop in sparse array");
for(let i=0; i<sparseArr.length; i+=1) {
  console.log(sparseArr[i]);
}

console.log("for-in loop in sparse array");
for(key in sparseArr) {
  console.log(sparseArr[key]);
}
```

위 코드를 실행해 보면, for 루프에서는 비어있는 인덱스가 모두 undefined로 출력되고, for-in loop에서는 존재하는 값만 출력한다.

**for-of**

ES6에서 iterator가 추가되었다. iterator를 사용하는 가장 쉬운 방법은 for-of문이다.

```js
const pokemons = ["Bulbasaur", "Charmander", "Squirtle"];
for(pokemon of pokemons) {
  console.log(pokemon);
}//각 포켓몬의 이름이 한줄 씩 나열된다.
```

### 참고

- [Stack overflow - How to use foreach with array in JavaScript?](https://stackoverflow.com/questions/9329446/how-to-use-foreach-with-array-in-javascript)
- [MDN - Array.prototype.forEach()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [Oreilly - Sparse Arrays](https://www.oreilly.com/library/view/javascript-the-definitive/9781449393854/ch07s03.html)