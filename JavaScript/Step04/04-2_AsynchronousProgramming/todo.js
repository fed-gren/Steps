const todos = [
  {
    name: "자바스크립트 공부하기",
    tags: ["programming", "javascript"],
    status: "todo",
    id: 423
  },
  {
    name: "그림 그리기",
    tags: ["picture", "favorite"],
    status: "doing",
    id: 1535
  },
  {
    name: "라면 끓여먹기",
    tags: ["food", "favorite"],
    status: "doing",
    id: 9999
  },
  {
    name: "칼퇴하기",
    tags: ["wolibal", "favorite"],
    status: "todo",
    id: 512
  },
  {
    name: "알고리즘풀기",
    tags: ["study", "hell"],
    status: "done",
    id: 2
  },
  {
    name: "운동하기",
    tags: ["workout", "hell"],
    status: "todo",
    id: 77
  }
];

const ids = [423,1535,9999,512,2,77];

module.exports = class TodoList {
  count() {
    const countObj = {
      todo : 0,
      doing : 0,
      done : 0
    }

    todos.forEach(element => {
      const { status } = element;
      countObj[status] += 1;
    });
    return countObj;
  }

  printAll(countObj) {
    let resultStr;
    resultStr = `현재상태 : todo : ${countObj.todo}개, doing : ${
      countObj.doing
    }개, done : ${countObj.done}개`;
    console.log(resultStr);
  }

  getNames(status) {
    const namesArr = todos
    .filter(function(element){
      return status === element.status
    })
    .map(function(element){
      return element.name;
    })
    return namesArr;
  }

  printList(namesArr, status) {
    let resultStr = `${status} 리스트 : 총 ${namesArr.length}건 : `;
    namesArr.forEach(function(element, index) {
      resultStr += `'${element}'`;
      if (index < namesArr.length - 1) {
        resultStr += `, `;
      }
    });
    console.log(resultStr);
  }

  show(status) {
    if (status === "all") {
      const countObj = this.count();
      this.printAll(countObj);
    } else if (status === "todo" || status === "doing" || status === "done") {
      const namesArr = this.getNames(status);
      this.printList(namesArr, status);
    } else {
      throw Error("show의 인자는 todo, doing, done, all 만 가능합니다!");
    }
  }

  add(name, tags) {
    let id;
    while(true) {
      id = Math.floor(Math.random() * 10000) +1;
      if(ids.indexOf(id) === -1) {
        ids.push(id);
        break;
      }
    }

    const todoObj = {
      "name" : name,
      "tags" : tags,
      "status" : "todo",
      "id" : id
    }
    todos.push(todoObj);
    console.log(`${name} 1개가 추가됐습니다.(id : ${id})`);
    setTimeout(() => {
      this.show("all");
    }, 1000);
  }

  deleteData(id){
    let deletingObj;

    todos.forEach((element, index) => {
      if(element.id === id) {
        deletingObj = element;
        todos.splice(index, 1);
      }
    });

    console.log(`${deletingObj.name}이(가) ${deletingObj.status} 목록에서 삭제됐습니다.`);
    setTimeout(() => {
      this.show("all");
    }, 1000);
  };

  updateData(id, status) {
    let name;

    todos.forEach((element) =>{
      if(element.id === id){
        element.status = status;
        name = element.name;
      }
    });
    
    setTimeout(() => {
      console.log(`${name}이(가) ${status}로 상태가 변경됐습니다.`)
      setTimeout(() => {
        this.show("all");
      }, 1000);
    }, 3000);
  }
}

// const myTodo = new TodoList();
// myTodo.show("all");
// myTodo.show("todo");
// myTodo.show("doing");
// myTodo.show("done");
// myTodo.show("too");