//파일 시스템 관련 관리
const fs = require("fs");
const localPath = `${__dirname}/local`;
const remotePath = `${__dirname}/remote`;

const repoList = fs.readdirSync(localPath);

//필요한 기능 : 파일 생성, 폴더 검색해서 문자열 리턴

const checkExistRepo = repoName => {
  let repoExsitFlag = false;
  repoExsitFlag = repoList.some(repo => {
    return repo === repoName;
  });
  return repoExsitFlag;
};

module.exports = FM = {
  initRepo(repoName) {
    const repoExsitFlag = checkExistRepo(repoName);
    if (repoExsitFlag) {
      console.log("저장소가 이미 존재합니다.");
      return;
    }
    const repoPath = `${localPath}/${repoName}`;
    const workingDirPath = `${repoPath}/Working Directory`;
    const stagingAreaPath = `${repoPath}/Staging Area`;
    const gitRepoPath = `${repoPath}/Git Repository`;
    fs.mkdirSync(repoPath);
    fs.mkdirSync(workingDirPath);
    fs.mkdirSync(stagingAreaPath);
    fs.mkdirSync(gitRepoPath);
  },

  printLocalRepoFiles(repoName) {
    const repoExsitFlag = checkExistRepo(repoName);
    if (!repoExsitFlag) {
      console.log(`${repoName} 저장소가 존재하지 않습니다.`);
      return;
    }
    const repoPath = `${localPath}/${repoName}`;
    const workingDirPath = `${repoPath}/Working Directory`;
    const stagingAreaPath = `${repoPath}/Staging Area`;
    const gitRepoPath = `${repoPath}/Git Repository`;

    const workingDirFiles = fs.readdirSync(workingDirPath);
    const stagingAreaFiles = fs.readdirSync(stagingAreaPath);
    const gitRepoFiles = fs.readdirSync(gitRepoPath);

    console.log(`---Working Directory`);
    workingDirFiles.forEach(file => {
      console.log(file);
    });
    console.log(`---Staging Area`);
    stagingAreaFiles.forEach(file => {
      console.log(file);
    });
    console.log(`---Git Repository`);
    gitRepoFiles.forEach(file => {
      console.log(file);
    });
  }
};
