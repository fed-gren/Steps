// Object.keys() example

let arr1 = ["A", "B", "C"];
console.log(Object.keys(arr1));  //['0', '1', '2']

let obj1 = {
  color: "white",
  name: "bes",
  price: 203033
};
console.log(Object.keys(obj1));  //['color', 'name', 'price']

console.log(Object.keys("What?"));  //['0', '1', '2', '3', '4']
console.log(Object.keys(452));      //[]
console.log(Object.keys(true));     //[]

// Object.values() example

let arr2 = ["A", "B", "C"];
console.log(Object.values(arr2));  //['A', 'B', 'C']

let obj2 = {
  color: "white",
  name: "bes",
  price: 203033
};
console.log(Object.values(obj2));  //['white', 'bes', 203033]


// Object.getOwnPropertyNames() examples

let arr3 = ['a', 'b', 'c'];
console.log(Object.getOwnPropertyNames(arr3).sort()); 
["0", "1", "2", "length"]

// Array-like object
let obj3 = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.getOwnPropertyNames(obj3).sort()); 
["0", "1", "2"]


// Object.entries() examples
let obj4 = {
  pages: 46,
  color: "navy",
  price: 1200,
  maker: "James"
}

console.log(Object.entries(obj4)[0]);    //[ 'pages', 46 ]
console.log(Object.entries(obj4)[1]);    //[ 'color', 'navy' ]
console.log(Object.entries(obj4)[2]);    //[ 'price', 1200 ]
console.log(Object.entries(obj4)[3]);    //[ 'maker', 'James' ]
console.log(Object.entries(obj4)[4]);    //undefined