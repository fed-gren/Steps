module.exports = historyQueue = {
  historyList: [],
  maxLength: 4,
  pointer: 0,
  recordTodo: function(todoList) {
    this.historyList[this.pointer] = {
      todoList: JSON.parse(JSON.stringify([...todoList]))
    };
    if (this.pointer === this.maxLength - 1) {
      this.historyList.shift();
    } else {
      this.pointer++;
    }
    this.historyList.length = this.pointer;
  },
  undo: function(todoList) {
    if (this.pointer <= 0) {
      throw Error("NO_MORE_UNDO");
    }
    if (this.pointer === this.historyList.length) {
      this.historyList[this.pointer] = {
        todoList: JSON.parse(JSON.stringify([...todoList]))
      };
    }
    this.pointer--;
    return this.historyList[this.pointer];
  },
  redo: function() {
    if (
      this.pointer >= this.maxLength ||
      this.pointer + 1 >= this.historyList.length
    ) {
      throw Error("NO_MORE_REDO");
    }
    this.pointer++;
    return this.historyList[this.pointer];
  }
};
