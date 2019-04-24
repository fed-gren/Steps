//파일 시스템 관련 관리
const fs = require("fs");
const localPath = `${__dirname}/local`;
const remotePath = `${__dirname}/remote`;

//필요한 기능 : 파일 생성, 폴더 검색해서 문자열 리턴

module.exports = FM = {
  initRepo(repo) {
    const repoStr = `\n${JSON.stringify(repo)}\n`;
    fs.open(`${localPath}/${repo.name}.json`, "a", "666", (err, id) => {
      if (err) {
        console.log(`file open err`);
        console.log(err);
      } else {
        fs.write(id, repoStr, null, "utf8", err => {
          if (err) console.log(err);
          else console.log("The repository has been created!");
        });
      }
    });
  }
};
