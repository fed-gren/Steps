//파일 시스템 관련 관리
const fs = require("fs");
const localPath = `${__dirname}/local`;
const remotePath = `${__dirname}/remote`;

let repoList = fs.readdirSync(localPath);

let selectedRepoPath = null;

//필요한 기능 : 파일 생성, 폴더 검색해서 문자열 리턴

const checkExistRepo = (location, repoName) => {
  let repoExsitFlag = false;
  if (location === "local") {
    repoList = fs.readdirSync(localPath);
  } else if (location === "remote") {
    repoList = fs.readdirSync(remotePath);
  }
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
    const repoExsitFlag = checkExistRepo("local", repoName);
    if (repoExsitFlag) {
      console.log("저장소가 이미 존재합니다.");
      return;
    }
    const repoPath = `${localPath}/${repoName}`;
    const workingDirPath = `${repoPath}/Working Directory`;
    const untrackedPath = `${workingDirPath}/Untracked`;
    const modifiedPath = `${workingDirPath}/Modified`;
    const stagingAreaPath = `${repoPath}/Staging Area`;
    const gitRepoPath = `${repoPath}/Git Repository`;
    fs.mkdirSync(repoPath);
    fs.mkdirSync(workingDirPath);
    fs.mkdirSync(untrackedPath);
    fs.mkdirSync(modifiedPath);
    fs.mkdirSync(stagingAreaPath);
    fs.mkdirSync(gitRepoPath);
    console.log("저장소 생성");
  },

  printLocalRepoFiles(repoName) {
    const repoExsitFlag = checkExistRepo("local", repoName);
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
      console.log(`${file}\t${fs.statSync(`${untrackedPath}/${file}`).mtime}`);
    });
    modifiedFiles.forEach(file => {
      console.log(`${file}\t${fs.statSync(`${modifiedPath}/${file}`).mtime}`);
    });
    console.log(`---Staging Area`);
    stagingAreaFiles.forEach(file => {
      console.log(
        `${file}\t${fs.statSync(`${stagingAreaPath}/${file}`).mtime}`
      );
    });
    console.log(`---Git Repository`);
    gitRepoFiles.forEach(file => {
      console.log(`${file}\t${fs.statSync(`${gitRepoPath}/${file}`).mtime}`);
    });
  },

  printRemoteRepoFiles(repoName) {
    if (repoName === undefined) {
      repoName = selectedRepoPath.replace(`${localPath}/`, "");
    }
    const repoExsitFlag = checkExistRepo("remote", repoName);
    if (!repoExsitFlag) {
      console.log(`${repoName} 저장소가 존재하지 않습니다.`);
      return;
    }
    const repoPath = `${remotePath}/${repoName}`;
    const gitRepoPath = `${repoPath}/Git Repository`;
    const gitRepoFiles = fs.readdirSync(gitRepoPath);

    console.log(`---Git Repository`);
    gitRepoFiles.forEach(file => {
      console.log(`${file}\t${fs.statSync(`${gitRepoPath}/${file}`).mtime}`);
    });
  },

  checkoutRepo(repoName) {
    //저장소 이동
    const repoExsitFlag = checkExistRepo("local", repoName);
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
    if (selectedRepoPath === null) {
      console.log(`현재 선택된 저장소가 없습니다.`);
      return;
    }
    fs.writeFileSync(
      `${selectedRepoPath}/Working Directory/Untracked/${fileName}.txt`,
      "init",
      "utf8"
    );
  },

  printRepoFilesInfo() {
    if (selectedRepoPath === null) {
      console.log(
        `현재 선택된 저장소가 없습니다. status local <repo name>으로 확인 가능합니다.`
      );
      return;
    }

    const workingDirPath = `${selectedRepoPath}/Working Directory`;
    const untrackedPath = `${workingDirPath}/Untracked`;
    const modifiedPath = `${workingDirPath}/Modified`;
    const stagingAreaPath = `${selectedRepoPath}/Staging Area`;
    const gitRepoPath = `${selectedRepoPath}/Git Repository`;

    const untrackedFiles = fs.readdirSync(untrackedPath);
    const modifiedFiles = fs.readdirSync(modifiedPath);
    const stagingAreaFiles = fs.readdirSync(stagingAreaPath);
    const gitRepoFiles = fs.readdirSync(gitRepoPath);

    console.log(`---Working Directory`);
    untrackedFiles.forEach(file => {
      console.log(`${file}\t${fs.statSync(`${untrackedPath}/${file}`).mtime}`);
    });
    modifiedFiles.forEach(file => {
      console.log(`${file}\t${fs.statSync(`${modifiedPath}/${file}`).mtime}`);
    });
    console.log(`---Staging Area`);
    stagingAreaFiles.forEach(file => {
      console.log(
        `${file}\t${fs.statSync(`${stagingAreaFiles}/${file}`).mtime}`
      );
    });
    console.log(`---Git Repository`);
    gitRepoFiles.forEach(file => {
      console.log(`${file}\t${fs.statSync(`${gitRepoFiles}/${file}`).mtime}`);
    });
  },

  moveToStagingArea(fileName) {
    //fileName이라는 이름을 가진 파일이 현재 레포 Working Directory 안에 있으면,
    //Staging area로 이동
    if (selectedRepoPath === null) {
      console.log(`현재 선택된 저장소가 없습니다.`);
      return;
    }

    const workingDirPath = `${selectedRepoPath}/Working Directory`;
    const untrackedPath = `${workingDirPath}/Untracked`;
    const modifiedPath = `${workingDirPath}/Modified`;
    const stagingAreaPath = `${selectedRepoPath}/Staging Area`;

    const untrackedFiles = fs.readdirSync(untrackedPath);
    const modifiedFiles = fs.readdirSync(modifiedPath);

    console.log(untrackedFiles);

    let fileExistFlag = false;
    fileExistFlag =
      fileExistFlag || untrackedFiles.some(file => file === fileName);

    if (fileExistFlag) {
      let oldFilePath = `${untrackedPath}/${fileName}`;
      let newFilePath = `${stagingAreaPath}/${fileName}`;
      fs.renameSync(oldFilePath, newFilePath);
      return;
    }

    fileExistFlag =
      fileExistFlag || modifiedFiles.some(file => file === fileName);
    if (fileExistFlag) {
      let oldFilePath = `${modifiedPath}/${fileName}`;
      let newFilePath = `${stagingAreaPath}/${fileName}`;
      fs.renameSync(oldFilePath, newFilePath);
      return;
    }

    if (!fileExistFlag) {
      console.log("그런 파일 또 없습니다.");
      return;
    }
  },

  moveToGitRepo() {
    //commit 시, staging area에서 git repo로 모두 옮기기.
    if (selectedRepoPath === null) {
      console.log(`현재 선택된 저장소가 없습니다.`);
      return;
    }
    const stagingAreaPath = `${selectedRepoPath}/Staging Area`;
    const gitRepoPath = `${selectedRepoPath}/Git Repository`;

    const stagingAreaFiles = fs.readdirSync(stagingAreaPath);
    // const gitRepoFiles = fs.readdirSync(gitRepoPath);

    let oldFilePath, newFilePath;
    stagingAreaFiles.forEach(file => {
      oldFilePath = `${stagingAreaPath}/${file}`;
      newFilePath = `${gitRepoPath}/${file}`;
      fs.renameSync(oldFilePath, newFilePath);
    });
  },

  moveToModified(fileName) {
    //commit 해서 Git Repository에 있는 파일 Working Directory/Modified로 이동
    if (selectedRepoPath === null) {
      console.log(`현재 선택된 저장소가 없습니다.`);
      return;
    }
    const gitRepoPath = `${selectedRepoPath}/Git Repository`;
    const workingDirPath = `${selectedRepoPath}/Working Directory`;
    const modifiedPath = `${workingDirPath}/Modified`;
    const gitRepoFiles = fs.readdirSync(gitRepoPath);

    let fileExistFlag = false;
    fileExistFlag =
      fileExistFlag || gitRepoFiles.some(file => file === fileName);
    if (fileExistFlag) {
      let oldFilePath = `${gitRepoPath}/${fileName}`;
      let newFilePath = `${modifiedPath}/${fileName}`;
      fs.renameSync(oldFilePath, newFilePath);
      return;
    }

    if (!fileExistFlag) {
      console.log("그런 파일 또 없습니다.");
      return;
    }
  },

  makeCommitLogFile(commitLog) {
    //현재 선택된 저장소 폴더 경로에 log.json 파일 생성.
    // key가 커밋 메시지, values가 그 때 커밋된 파일명, 시간 객체.
    if (selectedRepoPath === null) {
      console.log(`현재 선택된 저장소가 없습니다.`);
      return;
    }

    const gitRepoPath = `${selectedRepoPath}/Git Repository`;
    const gitRepoFiles = fs.readdirSync(gitRepoPath);

    const filesObj = {};

    gitRepoFiles.forEach(file => {
      filesObj[file] = fs.statSync(`${gitRepoPath}/${file}`).mtime;
    });
    const options = { encoding: "utf-8", flag: "a+" };
    let data = fs.readFileSync(`${selectedRepoPath}/log.json`, options);
    let id = fs.openSync(`${selectedRepoPath}/log.json`, "w+", "666");
    fs.writeSync(id, data, "utf8");
  },

  moveToRemote() {
    //push 명령 시, 현재 저장소와 동일한 이름의 저장소, 그 아래 Git Repository 폴더 복사해가기.
    //나중에 commit log 파일도 가져가야함.
    if (selectedRepoPath === null) {
      console.log(`현재 선택된 저장소가 없습니다.`);
      return;
    }
    const remotePath = selectedRepoPath.replace("local", "remote");
    const remoteGitRepoPath = `${remotePath}/Git Repository`;
    const flag = fs.existsSync(remotePath);
    if (!flag) {
      fs.mkdirSync(remotePath);
      fs.mkdirSync(remoteGitRepoPath);
    }
    const localGitRepoPath = `${selectedRepoPath}/Git Repository`;
    const localGitRepoFiles = fs.readdirSync(localGitRepoPath);

    localGitRepoFiles.forEach(file => {
      if (!fs.existsSync(`${remoteGitRepoPath}/${file}`)) {
        fs.copyFileSync(
          `${localGitRepoPath}/${file}`,
          `${remoteGitRepoPath}/${file}`
        );
      }
    });
  }
};
