const CPUMetaData = require("./CPUConstant");
const Memory = require("./Memory");

class CPU {
  initRegisters() {
    this.regAddress = {
      PC: 0b000,
      R1: 0b001,
      R2: 0b010,
      R3: 0b011,
      R4: 0b100,
      R5: 0b101,
      R6: 0b110,
      R7: 0b111
    };
    this.regValues = new Uint16Array(8);
  }

  initALU() {
    const thisCPU = this;
    this.ALU = {
      ADD(reg1, reg2, dstReg) {
        thisCPU.regValues[dstReg] = 
        thisCPU.regValues[reg1] +
        thisCPU.regValues[reg2];
      },
      SUB(reg1, reg2, dstReg) {
        thisCPU.regValues[dstReg] = 
        thisCPU.regValues[reg1] -
        thisCPU.regValues[reg2];
      },
      AND(reg1, reg2, dstReg) {
        thisCPU.regValues[dstReg] = 
        thisCPU.regValues[reg1] &
        thisCPU.regValues[reg2];
      },
      OR(reg1, reg2, dstReg) {
        thisCPU.regValues[dstReg] = 
        thisCPU.regValues[reg1] |
        thisCPU.regValues[reg2];
      },
    };
  }
  init() {
    this.initRegisters();
    this.initALU();
    this.myMemory = new Memory();
  }

  reset() {
    //레지스터값 모두 지우고 PC 0으로 초기화
    this.initRegisters();
  }

  fetch() {
    //현재 PC 값에 해당하는 메모리에서 프로그램 명령어를 가져와서 리턴한다. PC 카운트를 +1 증가시킨다.
    let instruction = new Uint16Array(1);
    instruction[0] = this.myMemory.fetch(this.regValues[this.regAddress.PC]);
    this.regValues[this.regAddress.PC] += 1;
    return instruction[0];
  }

  decode(instruction) {
    //4bit instruction 받아서 어떤 명령어인지 return 한다.
    let decodeResult = 0;
    if(instruction === CPUMetaData.LOAD_WITH_ADDRESS) { decodeResult = 1 }
    else if(instruction === CPUMetaData.LOAD_WITH_VALUE) { decodeResult = 2 }
    else if(instruction === CPUMetaData.STORE_WITH_ADDRESS) { decodeResult = 3 }
    else if(instruction === CPUMetaData.STORE_WITH_VALUE) { decodeResult = 4 }
    else if(instruction === CPUMetaData.AND_WITH_ADDRESS) { decodeResult = 5 }
    else if(instruction === CPUMetaData.OR_WITH_ADDRESS) { decodeResult = 6 }
    else if(instruction === CPUMetaData.ADD_WITH_ADDRESS) { decodeResult = 7 }
    else if(instruction === CPUMetaData.ADD_WITH_VALUE) { decodeResult = 8 }
    else if(instruction === CPUMetaData.SUB_WITH_ADDRESS) { decodeResult = 9 }
    else if(instruction === CPUMetaData.SUB_WITH_VALUE) { decodeResult = 10 }
    else if(instruction === CPUMetaData.LOAD_WITH_ADDRESS) { decodeResult = 11 }
    return decodeResult;
  }

  instructionParser(IR) {
    //입력된 명령어 파싱 해서 execute에 전달.
  }

  execute(IR) {
    //전달한 명령어를 어떤 명령인지 분석해서 계산하거나 처리한다.
  }

  dump() {
    //REGISTER들 값을 배열에 넣어서 리턴
    const dumpList = [];
    const regLen = this.regValues.length;
    for(let i=0; i<regLen; i+=1) {
      dumpList[i] = this.regValues[i];
    }
    return dumpList;
  }
}

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

const CPUTest = () => {
  // ALUTest();
  // CPUFetchTest();
  // CPUDumptest();
}

CPUTest();