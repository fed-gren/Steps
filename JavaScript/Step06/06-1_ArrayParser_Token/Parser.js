const separators = require("./separators");
const literals = require("./literals");
const errorMessages = require("./errorMessages");

const { log } = console;

const parserUtils = {
  isSeparator: function(letter) {
    for (let separator of Object.values(separators)) {
      if (letter === separator) return true;
    }
    return false;
  },

  isEndofLiteral: function(idx, decomposedDataArr) {
    if (
      decomposedDataArr[idx + 1] === separators.rest ||
      decomposedDataArr[idx + 1] === separators.endOfArray
    ) {
      return true;
    } else {
      return false;
    }
  },

  getTokenizedWord: function(letter, idx, decomposedDataArr) {
    if (this.isSeparator(letter)) {
      data = "";
      return letter;
    } else {
      data += letter;
      if (this.isEndofLiteral(idx, decomposedDataArr)) {
        return data.trim();
      }
    }
  },

  joinLiterals: function(decomposedDataArr) {
    return decomposedDataArr.map((letter, idx, arr) =>
      this.getTokenizedWord(letter, idx, arr)
    );
  },

  makeTokenizedData: function(decomposedDataArr) {
    const literalsJoinedArr = this.joinLiterals(decomposedDataArr);

    const result = literalsJoinedArr.filter(letter => letter !== undefined);
    return result;
  },

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
};

class Parser {
  constructor() {
    this.tokenizedData = [];
    this.lexedData = [];
  }

  tokenizing(unparsedData) {
    //unparsedData를 모두 분해한 뒤, 토큰화(의미 있는 묶음으로 만듦)한다.
    //결과를 tokenizedData에 저장
    if (unparsedData === undefined) {
      log(errorMessages.NO_PARSING_DATA);
      return;
    }
    const decomposedDataArr = unparsedData.split("");
    this.tokenizedData = parserUtils.makeTokenizedData(decomposedDataArr);
  }

  lexing() {
    //tokenizedData의 요소들을 검사하여 의미를 부여한다.
    //결과를 lexedData에 저장
    if (this.tokenizedData === undefined) {
      log(errorMessages.NO_TOKENIZED_DATA);
      return;
    }
    const lexedObj = {};
    this.lexedData = this.tokenizedData.map(word => {
      if (!parserUtils.isSeparator(word)) {
        lexedObj.type = parserUtils.getLiteralsType(word);
        lexedObj.value = word;
        lexedObj.child = []; //array인 경우 추가
        return { ...lexedObj };
      } else {
        return word;
      }
    });
  }

  parsing(parsingDataObj) {
    //구분자를 확인해서 JSON 객체 데이터 생성
    let word = this.lexedData[0];
    if (word === separators.endOfArray) {
      this.lexedData.shift();
      return;
    } else if (word === separators.startOfArray) {
      const newArrObj = {
        type: "array",
        child: []
      };
      parsingDataObj.child.push(newArrObj);
      this.lexedData.shift();
      this.parsing(newArrObj);
    } else if (typeof word === "object") {
      parsingDataObj.child.push(word);
      this.lexedData.shift();
      this.parsing(parsingDataObj);
    } else {
      this.lexedData.shift();
      this.parsing(parsingDataObj);
    }
  }

  array(unparsedArray) {
    const unparsedData = unparsedArray;
    this.tokenizing(unparsedData);
    this.lexing();
    const resultObj = {
      child: []
    };
    this.parsing(resultObj);
    const resultText = JSON.stringify(resultObj.child[0], null, 2);
    log(resultText);
  }
}

module.exports = Parser;
