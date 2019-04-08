(function callModuleChecker(){
  let result = new Date();
  console.log("WELCOME UTIL MODULE : " + result);
})();

const isNumber = num => typeof num === 'number';

const sum = (arr) => {
  let result = 0;
  return arr.filter(isNumber).reduce(function(a, b) {
    return a + b;
  }, result);
}

module.exports = {
  sum: sum,
}