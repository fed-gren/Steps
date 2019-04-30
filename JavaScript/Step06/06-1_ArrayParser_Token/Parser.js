const literals = require("./literals");
const separators = require("./separators");
const print = console.log;

class Parser {
  constructor(data) {
    this.data = data;
    this.lexedData = [];
    this.tokenizedData = [];
  }

  tokenizer() {
    //데이터 모두 빠개버리기
    this.tokenizedData = this.data.split("");
  }

  lexer() {
    //배열 돌면서 의미있는 데이터로 만들기
    //'[', ']', 'number', ',' (나중엔 number 뿐만 아니라 다른 데이터 형도 인지해서 추가해야한다.(string, boolean, null))
    //separator가 아닌 데이터는 다 합치기

    this.lexedData = this.data.split("");
    this.isSeparator();
    // this.lexedData.forEach((letter) => print(this.isSeparator(letter)));
    const token = {};
    print(this.joinLiterals());
    const joinedLiteralData = this.joinLiterals();
    joinedLiteralData.forEach(word => {
      if (!this.isSeparator(word)) {
        token.type = this.getLiteralsType(word);
        token.value = word;
        token.child = []; //array인 경우 추가
        print(token);
      }
    });
  }

  isSeparator(letter) {
    for (let separator of Object.values(separators)) {
      if (letter === separator) return true;
    }
    return false;
  }

  getLiteralsType(word) {
    if (Number.isFinite(Number(word))) {
      return literals.number;
    } else if (word === "false" || word === "true") {
      return literals.boolean;
    } else if (word === "null") {
      return literals.null;
    } else {
      return literals.string;
    }
  }

  joinLiterals() {
    let data = "";
    const literalsJoinedArray = this.tokenizedData
      .map((letter, idx) => {
        if (this.isSeparator(letter)) {
          data = "";
          return letter;
        } else {
          data += letter;
          if (
            idx < this.tokenizedData.length - 1 &&
            this.isSeparator(this.lexedData[idx + 1])
          ) {
            return data.trim();
          }
        }
      })
      .filter(letter => {
        return letter !== undefined;
      });
    return literalsJoinedArray;
  }
}

const str = "[123, 22, 33]";
const parser = new Parser(str);
parser.tokenizer();
parser.lexer();
