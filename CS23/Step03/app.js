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

  const getParsedCommand = command => {
    //? 명령어를 입력받아 파싱한 후에 배열 형태로 반환한다.
    const parsedCommand = command.split(" ");
    return parsedCommand;
  };

  const executePrompt = () => {
    rl.question("/> ", function(command) {
      if (command === "quit") {
        log("vmgit을 종료합니다.");
        return rl.close();
      }
      const parsedCommand = getParsedCommand(command);
      log(parsedCommand);
      const execCommand = parsedCommand[0];
      const parameter = parsedCommand[1];
      try {
        vmgitFunctions[execCommand](parameter);
      } catch (error) {
        log(error);
      }
      executePrompt(); //Calling this function again to new command
    });
  };

  executePrompt();
};

app();