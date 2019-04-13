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
    this.regValues = [0, 1, 2, 3, 4, 5, 6, 7];
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
    this.init();
  }

  fetch() {
    //현재 PC 값에 해당하는 메모리에서 프로그램 명령어를 가져와서 리턴한다. PC 카운트를 +1 증가시킨다.
    let instruction = new Uint16Array(1);

    return instruction;
  }

  execute(IR) {
    //전달한 명령어를 어떤 명령인지 분석해서 계산하거나 처리한다.
  }

  dump() {
    //REGISTER들 값을 배열에 넣어서 리턴
    const dumpList = [];

    return dumpList;
  }
}

const myCPU = new CPU();
myCPU.init();

//test
let ALUTest = () => {
  //add test
  let a = myCPU.regValues[myCPU.regAddress.R1];
  let b = myCPU.regValues[myCPU.regAddress.R2];
  let expectResult = a + b;
  myCPU.ALU.ADD(myCPU.regAddress.R1, myCPU.regAddress.R2, myCPU.regAddress.R7);
  if(myCPU.regValues[myCPU.regAddress.R7] != expectResult) {
    throw Error(`ADD의 결과가 기대하던 ${expectResult} 와(과) 다릅니다.`);
  }

  //sub test
  a = myCPU.regValues[myCPU.regAddress.R1];
  b = myCPU.regValues[myCPU.regAddress.R2];
  expectResult = a - b;
  myCPU.ALU.SUB(myCPU.regAddress.R1, myCPU.regAddress.R2, myCPU.regAddress.R7);
  if(myCPU.regValues[myCPU.regAddress.R7] != expectResult) {
    throw Error(`SUB의 결과가 기대하던 ${expectResult} 와(과) 다릅니다.`);
  }

  //and test
  a = myCPU.regValues[myCPU.regAddress.R1];
  b = myCPU.regValues[myCPU.regAddress.R2];
  expectResult = a & b;
  myCPU.ALU.AND(myCPU.regAddress.R1, myCPU.regAddress.R2, myCPU.regAddress.R7);
  if(myCPU.regValues[myCPU.regAddress.R7] != expectResult) {
    throw Error(`AND의 결과가 기대하던 ${expectResult} 와(과) 다릅니다.`);
  }

  //or test
  a = myCPU.regValues[myCPU.regAddress.R1];
  b = myCPU.regValues[myCPU.regAddress.R2];
  expectResult = a | b;
  myCPU.ALU.OR(myCPU.regAddress.R1, myCPU.regAddress.R2, myCPU.regAddress.R7);
  if(myCPU.regValues[myCPU.regAddress.R7] != expectResult) {
    throw Error(`OR의 결과가 기대하던 ${expectResult} 와(과) 다릅니다.`);
  }

  console.log("ALU 연산 테스트 결과 : OK");
}

// ALUTest();