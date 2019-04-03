const nor = (paramA, paramB) => {
  result = !(paramA || paramB);
  return result;
}

console.log(nor(0, 0));
console.log(nor(0, 1));
console.log(nor(1, 0));
console.log(nor(1, 1));