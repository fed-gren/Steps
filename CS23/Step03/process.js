const make = require("./makeRepo");

//repo process
const process = {
  repo: {
    name: "",
    workingDirectory: {},
    stagingArea: {},
    gitRepository: {}
  },
  init(repoName) {
    this.repo.name = repoName;
    make(this.repo);
  }
};
