const literals = require("./literals");
const separators = require("./separators");
const print = console.log;

class Parser {
  constructor(data) {
    this.data = data;
    this.lexedData = [];
  }
  lexer() {
    //데이터 모두 빠개버리기
    this.lexedData = this.data.split("");
    this.isSeparator();
    this.lexedData.forEach((letter) => print(this.isSeparator(letter)));
  }

  tokenizer() {
    //배열 돌면서 의미있는 데이터로 만들기
    //'[', ']', 'number', ',' (나중엔 number 뿐만 아니라 다른 데이터 형도 인지해서 추가해야한다.(string, boolean, null))
    // lexedData.
  }

  isSeparator(letter) {
    for(let separator of Object.values(separators)) {
      if(letter === separator) return true;
    }
    return false;
  }
}

const str = "[123, 22, 33]";
const parser = new Parser(str);
parser.lexer();
print(parser.lexedData);
