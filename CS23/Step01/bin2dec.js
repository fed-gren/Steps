function bin2dec(bin) {
  var answer = 0;
  let val = 1;
  let binLen = bin.length;
  for(let i = 0; i < binLen; i+=1) {
    answer += val * bin[i];
    val *= 2;
  } 
  return answer;
}

let bin = [0, 1, 1, 1];
console.log(bin2dec(bin));  //14
bin = [1,1,1,1,0,1,0,1];
console.log(bin2dec(bin));  //175