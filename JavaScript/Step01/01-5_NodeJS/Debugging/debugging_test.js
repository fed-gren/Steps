function infiniteLog() {
  let i = 0;
  while(1) {
    i += 1;
    console.log(`영원히 반복하는 중. 반복횟수 : ${i}`);
  }
}

function forLog() {
  for(let i = 1; i <= 20; i+=1) {
    console.log(`적당히 반복하는 중. 반복횟수 : ${i}`);
  }
}

function main() {
  forLog();
  forLog();
  infiniteLog();
  forLog();
  forLog();
}

main();