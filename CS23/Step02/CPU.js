const CPUMetaData = require("./CPUConstant");
const Memory = require("./Memory");

module.exports = class CPU {
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

  execute(IR) {
    //전달한 명령어를 어떤 명령인지 분석해서 계산하거나 처리한다.
    //명령어 길이 맞추기.
    let str = IR.toString(2).padStart(16, "0");
    //명령어 조건에 맞게 파싱하기.
    let IRStr = str.substring(0,4);
    let dstReg, reg1, reg2, value;
    let instruction = parseInt(IRStr, 2);
    dstReg = parseInt(str.substring(4, 7), 2);
    reg1 = parseInt(str.substring(7, 10), 2);
    reg2 = parseInt(str.substring(13), 2);
    value = parseInt(str.substring(11), 2);

    //LOAD -> myMemory.peek(address)
    if(instruction === 1) {
      let address = this.regValues[reg1] + this.regValues[reg2];
      this.regValues[dstReg] = this.myMemory.peek(address);
    }
    else if(instruction === 2) {
      let address = this.regValues[reg1] + value;
      this.regValues[dstReg] = this.myMemory.peek(address);
    }
    //STORE -> myMemory.store(address, data)
    else if(instruction === 3) {
      let address = this.regValues[reg1] + this.regValues[reg2];
      let data = this.regValues[dstReg];
      this.myMemory.store(address, data);
    }

    else if(instruction === 4) {
      let address = this.regValues[reg1] + value;
      let data = this.regValues[dstReg];
      this.myMemory.store(address, data);
    }
    //AND -> myCPU.ALU.AND();
    else if(instruction === 5) {
      this.ALU.AND(reg1, reg2, dstReg);
    }
    //OR -> myCPU.ALU.OR();
    else if(instruction === 6) {
      this.ALU.OR(reg1, reg2, dstReg);
    }
    //ADD -> myCPU.ALU.ADD();
    else if(instruction === 7) {
      this.ALU.ADD(reg1, reg2, dstReg);
    }
    else if(instruction === 8) {
      this.regValues[dstReg] = this.regValues[reg1] + value;
    }
    //SUB -> myCPU.ALU.SUB();
    else if(instruction === 9) {
      this.ALU.SUB(reg1, reg2, dstReg);
    }
    else if(instruction === 10) {
      this.regValues[dstReg] = this.regValues[reg1] - value;
    }
    //MOV -> myCPU.regValue[dstReg];
    else if(instruction === 11) {
      value = parseInt(str.substring(7), 2);
      this.regValues[dstReg] = value;
    }
    else {
      throw Error("명령어 에러");
    }
  }

  dump() {
    //REGISTER들 값을 배열에 넣어서 리턴
    const dumpList = [];
    const regLen = this.regValues.length;
    for(let i=0; i<regLen; i+=1) {
      dumpList[i] = this.regValues[i].toString(16);
    }
    return dumpList;
  }
}