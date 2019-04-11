const data = {
  "debug": "on",
  "window": {
      "title": "Sample Konfabulator Widget",
      "name": "main_window",
      "width": 500,
      "height": 500
  },
  "image": { 
      "src": "Images/Sun.png",
      "name": "sun1",
      "hOffset": 250,
      "vOffset": 250,
      "alignment": "center"
  },
  "text": {
      "data": "Click Here",
      "size": 36,
      "style": "bold",
      "name": "text1",
      "hOffset": 250,
      "vOffset": 100,
      "alignment": "center",
      "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
  }
}


/**
 * 구현해야 할 기능
 * value의 type이 숫자인 경우 그 key값을 배열에 담는다.
 * value type이 객체인 경우 해당 객체에 대해 다시 조사 한다.
 */

const numberData = [];

/**
 * 파라미터 객체를 순회하면서 value값의 타입이 number인 프로퍼티의 key를 배열에 추가.
 * 발생할 수 있는 문제 ? 재귀적으로 호출하기 때문에 만약에 데이터 구조가 객체 안에 객체가 무수히 많다고 하면 스택오버플로우 가능성이 있다.
 * 다만 스택오버플로우를 발생시킬 만큼 객체가 중첩된 데이터 구조는 없을 것이라고 판단해서 작성했다.
 */
let getKeysOfNumValues = (obj) => {
  const arr = Object.entries(obj);
  arr.forEach(function(element) {
    if(Number.isFinite(element[1])) numberData.push(element[0]);
    else if(typeof element[1] === "object") getKeysOfNumValues(element[1]);
  });
}

getKeysOfNumValues(data);

console.log(numberData);