const { log } = console;
const readline = require("readline");
const VMGit = require("./vmgit");
const vmgit = new VMGit();

const app = () => {
  const promptStr = "/> ";
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
    rl.setPrompt(promptStr);
    rl.prompt();
    rl.on("line", function(command) {
      if (command === "quit") {
        log("vmgit을 종료합니다.");
        return rl.close();
      }
      const parsedCommand = getParsedCommand(command);
      const execCommand = parsedCommand[0];
      parsedCommand.shift();
      const parameters = [...parsedCommand];
      try {
        vmgitFunctions[execCommand](...parameters);
      } catch (error) {
        log(error);
      }
      rl.prompt();
    }).on("close", function() {
      process.exit();
    });
  };

  executePrompt();
};

app();
