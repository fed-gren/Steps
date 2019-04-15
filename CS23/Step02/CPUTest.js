const CPU = require("./CPU");
const myCPU = new CPU();
myCPU.init();

//test
const ALUTest = () => {
  let a = new Uint16Array(1);
  let b = new Uint16Array(1);
  
  let expectResult = new Uint16Array(1);

  myCPU.regValues[myCPU.regAddress.R1] = 0x1111;
  myCPU.regValues[myCPU.regAddress.R2] = 0x1001;
  a[0] = myCPU.regValues[myCPU.regAddress.R1];
  b[0] = myCPU.regValues[myCPU.regAddress.R2];

  //add test
  expectResult[0] = a[0] + b[0];
  myCPU.ALU.ADD(myCPU.regAddress.R1, myCPU.regAddress.R2, myCPU.regAddress.R7);
  if(myCPU.regValues[myCPU.regAddress.R7] != expectResult) {
    throw Error(`ADD의 결과 ${myCPU.regValues[myCPU.regAddress.R7].toString(16)}가
    기대하던 ${expectResult.toString(16)} 와(과) 다릅니다.`);
  }
  console.log(`ADD 결과 R7 : ${myCPU.regValues[myCPU.regAddress.R7].toString(16)}`);

  //sub test
  expectResult = a - b;
  myCPU.ALU.SUB(myCPU.regAddress.R1, myCPU.regAddress.R2, myCPU.regAddress.R7);
  if(myCPU.regValues[myCPU.regAddress.R7] != expectResult) {
    throw Error(`SUB의 결과 ${myCPU.regValues[myCPU.regAddress.R7].toString(16)}가
    기대하던 ${expectResult.toString(16)} 와(과) 다릅니다.`);
  }
  console.log(`SUB 결과 R7 : ${myCPU.regValues[myCPU.regAddress.R7].toString(16)}`);

  //and test
  expectResult = a & b;
  myCPU.ALU.AND(myCPU.regAddress.R1, myCPU.regAddress.R2, myCPU.regAddress.R7);
  if(myCPU.regValues[myCPU.regAddress.R7] != expectResult) {
    throw Error(`AND의 결과 ${myCPU.regValues[myCPU.regAddress.R7].toString(16)}가
    기대하던 ${expectResult.toString(16)} 와(과) 다릅니다.`);
  }
  console.log(`AND 결과 R7 : ${myCPU.regValues[myCPU.regAddress.R7].toString(16)}`);

  //or test
  expectResult = a | b;
  myCPU.ALU.OR(myCPU.regAddress.R1, myCPU.regAddress.R2, myCPU.regAddress.R7);
  if(myCPU.regValues[myCPU.regAddress.R7] != expectResult) {
    throw Error(`OR의 결과 ${myCPU.regValues[myCPU.regAddress.R7].toString(16)}가
    기대하던 ${expectResult.toString(16)} 와(과) 다릅니다.`);
  }
  console.log(`OR 결과 R7 : ${myCPU.regValues[myCPU.regAddress.R7].toString(16)}`);
  console.log("ALU function test result : OK");
}

const CPUFetchTest = () => {
  const program = [0x0001, 0x0002, 0x0004, 0x0008];
  myCPU.myMemory.locate(program);
  if(program[myCPU.regValues[myCPU.regAddress.PC]] !== myCPU.fetch()) throw Error("CPU fetch test fail.");
  if(program[myCPU.regValues[myCPU.regAddress.PC]] !== myCPU.fetch()) throw Error("CPU fetch test fail.");
  if(program[myCPU.regValues[myCPU.regAddress.PC]] !== myCPU.fetch()) throw Error("CPU fetch test fail.");
  if(program[myCPU.regValues[myCPU.regAddress.PC]] !== myCPU.fetch()) throw Error("CPU fetch test fail.");
  console.log("fetch test result : OK");
}

const CPUDumptest = () => {
  console.log(myCPU.dump());
}

const CPUExecuteTest = () => {
  myCPU.execute(0b0001101010000010);  //LOAD
  myCPU.execute(0b0010101010101010);  //LOAD
  myCPU.execute(0b0011101010101010);  //STORE
  myCPU.execute(0b0100101010101010);  //STORE
  myCPU.execute(0b0101101010101010);  //AND
  myCPU.execute(0b0110101010101010);  //OR
  myCPU.execute(0b0111101010101010);  //ADD
  myCPU.execute(0b1000101010101010);  //ADD
  myCPU.execute(0b1001101010101010);  //SUB
  myCPU.execute(0b1010101010101010);  //SUB
  myCPU.execute(0b1011101010101010);  //MOV
}

const CPUTest = () => {
  // ALUTest();
  // CPUFetchTest();
  // CPUDumptest();
  CPUExecuteTest();
}

CPUTest();