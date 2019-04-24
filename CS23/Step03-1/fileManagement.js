//파일 시스템 관련 관리
const fs = require("fs");
const localPath = `${__dirname}/local`;
const remotePath = `${__dirname}/remote`;

const repoList = fs.readdirSync(localPath);

let selectedRepoPath;

//필요한 기능 : 파일 생성, 폴더 검색해서 문자열 리턴

const checkExistRepo = repoName => {
  let repoExsitFlag = false;
  repoExsitFlag = repoList.some(repo => {
    return repo === repoName;
  });
  return repoExsitFlag;
};

const printAllLocalRepo = () => {
  const repoList = fs.readdirSync(localPath);
  for (repo of repoList) {
    console.log(`${repo}/`);
  }
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
      console.log(
        `${repoName} 저장소가 존재하지 않습니다. 로컬 저장소 목록 : `
      );
      printAllLocalRepo();
      return;
    }
    const repoPath = `${localPath}/${repoName}`;
    const workingDirPath = `${repoPath}/Working Directory`;
    const untrackedPath = `${workingDirPath}/Untracked`;
    const modifiedPath = `${workingDirPath}/Modified`;
    const stagingAreaPath = `${repoPath}/Staging Area`;
    const gitRepoPath = `${repoPath}/Git Repository`;

    const untrackedFiles = fs.readdirSync(untrackedPath);
    const modifiedFiles = fs.readdirSync(modifiedPath);
    const stagingAreaFiles = fs.readdirSync(stagingAreaPath);
    const gitRepoFiles = fs.readdirSync(gitRepoPath);

    console.log(`---Working Directory`);
    untrackedFiles.forEach(file => {
      console.log(file);
    });
    modifiedFiles.forEach(file => {
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
  },

  checkoutRepo(repoName) {
    //저장소 이동
    const repoExsitFlag = checkExistRepo(repoName);
    if (!repoExsitFlag) {
      console.log(
        `${repoName} 저장소가 존재하지 않습니다. 로컬 저장소 목록 : `
      );
      printAllLocalRepo();
      return null;
    }
    selectedRepoPath = `${localPath}/${repoName}`;
    console.log(`선택된 저장소 : ${selectedRepoPath}`);
    return repoName;
  },

  makeFile(fileName) {
    fs.writeFileSync(
      `${selectedRepoPath}/Working Directory/${fileName}.txt`,
      "init",
      "utf8"
    );
  }
};
