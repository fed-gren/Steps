const fibo = num => (0 === num || 1 === num) ? 1 : fibo(num-1) + fibo(num-2);

console.log(fibo(5));  // 8