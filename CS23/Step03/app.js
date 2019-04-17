const { log } = console;
const readline = require("readline");
const VMGit = require("./vmgit");
const vmgit = new VMGit();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function executePrompt() {
  rl.question("/> ", function(command) {
    if (command === "quit") return rl.close();
    log('Got it! Your command was: "', command, '"');
    if (command === "init") vmgit.init();
    executePrompt(); //Calling this function again to new command
  });
}

const app = () => {
  executePrompt();
};

app();
