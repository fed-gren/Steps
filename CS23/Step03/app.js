const { log } = console;
const readline = require("readline");
const VMGit = require("./vmgit");
const vmgit = new VMGit();

const app = () => {
  const vmgitFunctions = {
    init: vmgit.init,
    status: vmgit.status,
    checkout: vmgit.checkout
  };
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function executePrompt() {
    rl.question("/> ", function(command) {
      if (command === "quit") return rl.close();
      try {
        vmgitFunctions[command]();
      } catch (error) {
        log(`입력한 명령어 ${command}는 지원하지 않습니다.`);
      }
      executePrompt(); //Calling this function again to new command
    });
  }

  executePrompt();
};

app();
