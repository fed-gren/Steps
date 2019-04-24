const fs = require("fs");

const path = "./Step03/local.json";

const makeRepo = repoData => {
  const repoDataStr = `\n${JSON.stringify(repoData)}\n`;
  fs.open(path, "a", "666", (err, id) => {
    if (err) {
      console.log(`file open err`);
      console.log(err);
    } else {
      fs.write(id, repoDataStr, null, "utf8", err => {
        if (err) console.log(err);
        else console.log("file was saved.");
      });
    }
  });
};
