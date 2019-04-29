class Parser {
  constructor(data) {
    this.data = data;
    this.json = [];
  }
  lexer() {
    //데이터 모두 빠개버리기
    this.json = this.data.split("");
  }
}

const str = "[123, 22, 33]";
const parser = new Parser(str);
parser.lexer();
console.log(parser.arr);
