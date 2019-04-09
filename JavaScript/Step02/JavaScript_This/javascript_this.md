# What is `this` ?

JavaScript에서 `this` 키워드는 this가 속한 객체를 가리킨다.

this가 어디서 사용되었는지에 따라 값이 다르다.

- In a method, `this` refers to the **owner object**.

→ 메서드 안에서, **this**는 **메서드를 소유한 객체**를 가리킨다.
```js
let objFruit = {
  name: null,
  printName: function() {
    console.log(`name : ${this.name}`);
  }
}
    
let apple = {};
apple.printName = objFruit.printName;
apple.name = "apple";

let pear = {};
pear.printName = objFruit.printName;
pear.name = "pear";

apple.printName();  //apple
pear.printName();   //pear
```
- Alone, `this` refers to the **global object**.

→ this를 단독으로 사용할 경우, this의 소유자는 전역객체가 되고 this는 전역객체를 가리킨다.(strict mode에서도 마찬가지이다.)
```js
let x = this;
console.log(x); //Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
```
- In a function, `this` refers to the **global object**.

→ 함수 안에서, this는 전역객체를 가리킨다. 함수 안에서 this는 함수의 소유자에 바인딩되기 때문이다.
```js
function foo() {
  return this;
}
console.log(this);  //Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
```
- In a function, in strict mode, `this` is `undefined`.

→ strict mode에서 함수 내 this는 undefined이다.

- In an event, `this` refers to the **element** that received the event.

- Methods like `call()`, and `apply()` can refer `this` to **any object**.

## 참고

- [W3Schools - The JavaScript this Keyword](https://www.w3schools.com/js/js_this.asp)