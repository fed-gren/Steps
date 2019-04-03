const nand = (paramA, paramB) => {
  result = !(paramA && paramB);
  return result;
}

console.log(nand(0, 0));
console.log(nand(0, 1));
console.log(nand(1, 0));
console.log(nand(1, 1));