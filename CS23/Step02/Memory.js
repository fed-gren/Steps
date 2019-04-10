const memMetaData = require("./MemoryConstant.js");

const throwRangeError = (startRange, endRange) => {
  throw Error(
    `out of range exception. address range : ${startRange} ~ ${endRange}`
  );
};

const throwTextMemError = () => {
  throw Error(`TEXT memory capacity exceeded.`);
};

module.exports = class Memory {
  constructor() {
    this.MEMORY = new Uint16Array(131072);
    this.programCouter = -1;
  }

  peek(address) {
    if (
      address >= memMetaData.START_TEXT_ADDR &&
      address <= memMetaData.END_TEXT_ADDR
    ) {
      return this.MEMORY[address];
    } else if (
      address >= memMetaData.START_HEAP_ADDR &&
      address <= memMetaData.END_HEAP_ADDR
    ) {
      return this.MEMORY[address];
    } else {
      throwRangeError(memMetaData.START_TEXT_ADDR, memMetaData.END_HEAP_ADDR);
    }
  }

  //PROGRAM_TEXT functions
  locate(program) {
    const programLen = program.length;
    for (let i = 0; i < programLen; i += 1) {
      if (this.programCouter > memMetaData.END_TEXT_ADDR) throwTextMemError();
      this.programCouter += 1;
      this.MEMORY[this.programCouter] = program[i];
    }
  }

  fetch(programCount) {
    if (
      programCount >= memMetaData.START_TEXT_ADDR &&
      programCount <= memMetaData.END_TEXT_ADDR
    ) {
      return this.MEMORY[programCount];
    } else {
      throwRangeError(memMetaData.START_TEXT_ADDR, memMetaData.END_TEXT_ADDR);
    }
  }

  //PROGRAM_HEAP functions
  load(address) {
    address += memMetaData.START_HEAP_ADDR;
    if (
      address >= memMetaData.START_HEAP_ADDR &&
      address <= memMetaData.END_HEAP_ADDR
    ) {
      return this.MEMORY[address];
    } else {
      throwRangeError(memMetaData.START_TEXT_ADDR, memMetaData.END_TEXT_ADDR);
    }
  }

  store(address, data) {
    address += memMetaData.START_HEAP_ADDR;
    if (
      address >= memMetaData.START_HEAP_ADDR &&
      address <= memMetaData.END_HEAP_ADDR
    ) {
      this.MEMORY[address] = data;
    } else {
      throwRangeError(memMetaData.START_TEXT_ADDR, memMetaData.END_TEXT_ADDR);
    }
  }
}

