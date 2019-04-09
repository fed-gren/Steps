// * In a method, this refers to the owner object.
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


// * Alone, this refers to the global object.
let x = this;
console.log(x); //Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}

// * In a function, this refers to the global object.
function foo() {
  return this;
}
console.log(this);  //Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}