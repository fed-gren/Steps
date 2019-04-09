const arr = [1, 2, 3, 4, 5];
let findNum = 5;

const bSearch = (start, end) => {
  let mid = parseInt((start + end) / 2);
  if (arr[mid] === findNum) return mid;
  else return findNum < arr[mid] ? bSearch(start, mid - 1) : bSearch(mid + 1, end);
};

console.log(`findNum(${findNum}) index : ${bSearch(0, arr.length)}`);