//파일 시스템 관련 관리
const fs = require("fs");
const localPath = `${__dirname}/local`;
const remotePath = `${__dirname}/remote`;

//필요한 기능 : 파일 생성, 폴더 검색해서 문자열 리턴

module.exports = FM = {
  initRepo(repoName) {
    const repoList = fs.readdirSync(localPath);
    let repoExsitFlag = false;
    repoExsitFlag = repoList.some(repo => {
      return repo === repoName;
    });
    if (repoExsitFlag) {
      console.log("저장소가 이미 존재합니다.");
      return;
    }
    fs.mkdirSync(`${localPath}/${repoName}`);
  }
};
