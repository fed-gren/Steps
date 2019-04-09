let main = () => {
  let memo = [];
  memo[0] = 1;
  memo[1] = 1;

  for(let i=2; i<=5; i+=1) {
    memo[i] = memo[i-2] + memo[i-1];
  }
  console.log(memo[5]);  //8
}

main();