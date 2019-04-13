class CPU {
  init() {
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
    this.regValues = [0, 0, 0, 0, 0, 0, 0, 0];
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