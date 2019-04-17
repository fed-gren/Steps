const VMGit = require("./vmgit");

const vmgit = new VMGit();

const procCommandTest = () => {
  vmgit.procCommand();
};

const vmgitTest = () => {
  procCommandTest();
};

vmgitTest();
