# forEach 사용법

## 문법

```js
arr.forEach(function callback(currentValue [, index [, array]]) {
    //your iterator
}[, thisArg]);
```

### Parameters

- `callback` : 각 요소에 대해 실행할 함수 (3개의 인자를 가질 수 있음.)
  - `currentValue` : 현재 처리중인 요소
  - `index(optional)` : 현재 처리중인 요소의 인덱스 값
  - `array(optional)` : forEach를 실행한 배열
- `thisArg(optional)` : 콜백함수에서 this로 사용되는 값

### Return value

`undefined.`

## 설명

forEach()는 주어진 callback 배열에 있는 각 요소에 대해 오름차순으로 한 번씩 실행합니다. 삭제했거나 초기화하지 않은 인덱스 속성에 대해서는 실행하지 않습니다. (예: 희소 배열)

callback은 다음 세 인수와 함께 호출됩니다.

- 요소 값  
- 요소 인덱스(optional)
- 순회 중인 배열(optional)

thisArg 매개변수를 forEach()에 제공한 경우 callback을 호출할 때 전달해 this의 값으로 쓰입니다. 전달하지 않으면 undefined를 사용하며, 최종 this 값은 함수의 this를 결정하는 평소 규칙을 따릅니다.

forEach()로 처리할 요소의 범위는 최초 callback 호출 전에 설정됩니다. forEach() 호출을 시작한 뒤 배열에 추가한 요소는 callback의 인자로 들어가지 않습니다. 배열의 기존 요소값이 바뀐 경우, callback에 전달하는 값은 forEach()가 요소를 접근한 시점의 값을 사용합니다. 접근하기 전에 삭제한 요소는 callback으로 처리하지 않습니다.

forEach()는 각 배열 요소에 대해 한 번씩 callback 함수를 실행합니다. map()과 reduce()와는 달리 undefined를 반환하기 때문에 메서드 체인의 중간에 사용할 수 없습니다.

forEach()는 배열을 변형하지 않습니다. 그러나 callback이 변형할 수는 있습니다.

## 예제

```js
function Counter() {
  this.sum = 0;
  this.count = 0;
}
Counter.prototype.add = function(array) {
  array.forEach(function(entry) {
    this.sum += entry;
    ++this.count;
  }, this);
};

const obj = new Counter();
obj.add([2, 5, 9]);
obj.count;
// 3 
obj.sum;
// 16
```

## 브라우저 호환성(pc)

브라우저  | 버전
------|-------
Chrome | Yes
Edge | 12
Firefox | 1.5
IE | 9
Opera | Yes
Safari | Yes

## 참고

- [Why can Array.prototype.forEach not be chained?](https://stackoverflow.com/questions/29228064/why-can-array-prototype-foreach-not-be-chained)
- [Array.prototype.forEach()
](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)