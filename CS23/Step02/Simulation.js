const CPU = require("./CPU");
// const CPUMetaData = require("./CPUConstant");
const myCPU = new CPU();

myCPU.init();

const program = [
  0b1011100010100000,   //MOV R4, 0xa0 -> 47264
  0b1011101000000010,   //MOV R5, 0x02 -> 47618
  0b0001001100000101,   //LOAD R1, R4, R5 -> 4869
  0b1000010001100100,   //ADD R2, R1, #4 -> 33892
  0b1001011001000010,   //SUB R3, R1, R2 -> 38466
  0b0100011100100100    //STORE R3, R4, #4 -> 18212
];

const CPUSimulation = () => {
  myCPU.myMemory.locate(program);
  console.log(myCPU.myMemory.load(0xa0 + 4));
  program.forEach(() => {
    myCPU.execute(myCPU.fetch());
    console.log(myCPU.dump());
  });
  console.log(myCPU.myMemory.load(0xa0 + 4));
}

CPUSimulation();