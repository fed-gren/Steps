const facto = a => a <= 1 ? 1 : a * facto(a - 1)

console.log(facto(4))