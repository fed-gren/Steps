const Memory = require("./Memory.js");
const memMetaData = require("./MemoryConstant.js");
const myMemory = new Memory();

//test
let generateRandNum = (start, end) => {
  return Math.floor(Math.random() * end + start);
};

let peekTest = cnt => {
  let address = 0;
  for (let i = 0; i < cnt; i += 1) {
    address = generateRandNum(
      memMetaData.START_TEXT_ADDR,
      memMetaData.END_HEAP_ADDR
    );
    myMemory.peek(address);
  }
  console.log(`peek ${cnt} cycle test : ok.`);
};

let fetchTest = cnt => {
  let address = 0;
  for (let i = 0; i < cnt; i += 1) {
    address = generateRandNum(
      memMetaData.START_TEXT_ADDR,
      memMetaData.END_TEXT_ADDR
    );
    myMemory.fetch(address);
  }
  console.log(`fetch ${cnt} cycle test : ok.`);
};

let locateTest = () => {
  let program = [];
  for (let i = 0; i < memMetaData.START_HEAP_ADDR; i += 1) {
    program.push(
      generateRandNum(memMetaData.START_TEXT_ADDR, memMetaData.END_TEXT_ADDR)
    );
  }

  myMemory.locate(program);
  if (myMemory.programCouter === memMetaData.START_HEAP_ADDR - 1) {
    console.log(
      `locate() success! program counter : ${myMemory.programCouter}`
    );
    return true;
  } else {
    console.log(`locate() error! program counter : ${myMemory.programCouter}`);
    return false;
  }
};

let loadTest = cnt => {
  let address = 0;
  for (let i = 0; i < cnt; i += 1) {
    address = generateRandNum(
      memMetaData.START_TEXT_ADDR,
      memMetaData.END_TEXT_ADDR
    );
    myMemory.load(address);
  }
  console.log(`load ${cnt} cycle test : ok.`);
};

let storeTest = cnt => {
  let address = 0,
    data = 0;
  for (let i = 0; i < cnt; i += 1) {
    address = generateRandNum(
      memMetaData.START_TEXT_ADDR,
      memMetaData.END_TEXT_ADDR
    );
    data = generateRandNum(
      memMetaData.START_TEXT_ADDR,
      memMetaData.END_TEXT_ADDR
    );
    myMemory.store(address, data);
  }
  console.log(`store ${cnt} cycle test : ok.`);
};

let memFlowTest = () => {
  let program = [];
  for (let i = 0; i <= memMetaData.END_TEXT_ADDR; i += 1) {
    program.push(i);
  }
  myMemory.locate(program);
  for (let i = 0; i <= memMetaData.END_TEXT_ADDR; i += 1) {
    myMemory.store(i, i); //address = i, data = i
  }
  for (let i = 0; i <= memMetaData.END_TEXT_ADDR; i += 1) {
    if(myMemory.peek(i) != i) {
      console.log("Flow test : TEXT error");
      return;
    }
  }

  for (let i = memMetaData.START_HEAP_ADDR; i <= memMetaData.END_HEAP_ADDR; i += 1) {
    if(myMemory.peek(i) != i - memMetaData.START_HEAP_ADDR) {
      console.log("Flow test : HEAP error");
      console.log(`myMemory.peek(${i}) : ${myMemory.peek(i)}, data : ${i}`);
      return;
    }
  }
  console.log("Memory flow test : ok.");
};

peekTest(10000);
fetchTest(10000);
// locateTest();
loadTest(10000);
storeTest(10000);
memFlowTest();