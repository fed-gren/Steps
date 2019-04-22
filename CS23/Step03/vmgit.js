//* 가상 깃 개발
const printMessage = console.log;
const idList = [];
const repoList = []; //? 저장소 객체를 담을 배열
const remoteRepoList = []; //? remote 저장소 객체 담을 배열
const FILE_STATUS = {
  Untracked: "Untracked",
  Modified: "Modified",
  Unmodified: "Unmodified",
  Staged: "Staged"
};

const generateRandomID = () => {
  let id;
  while (true) {
    id = Math.floor(Math.random() * 10000) + 1;
    if (idList.indexOf(id) === -1) {
      idList.push(id);
      break;
    }
  }
  return id;
};

const getCurrentDate = () => {
  const date = new Date(Date.now());
  return `${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const searchRepo = repoName => {
  //? 전체 저장소 배열(repoList) 내에서 repoName과 name 프로퍼티가 동일한 객체 찾아서 있으면 해당 객체 리턴. 없으면 false 리턴
  //* filter 함수 사용하면 될듯하다.
  return repoList.filter(repo => repo.name === repoName);
};

const printRepoList = () => {
  //? searchRepo()에서 false 반환한 경우, 전체 저장소 목록(name)을 출력하는 함수.
  //* 배열 순회하며 객체 내 이름만으로 구성된 새로운 배열 필요! map과 forEach 사용하면 될듯
  const baseRepoListStr = "저장소 목록 : ";
  const repoListStr = repoList
    .map(repoObj => repoObj.name)
    .reduce((accumulator, repoName) => {
      if (accumulator === baseRepoListStr) return accumulator + repoName;
      else return accumulator + ", " + repoName;
    }, baseRepoListStr);
  printMessage(repoListStr);
};

const allRepoUnselect = () => {
  //? checkout 시, 하나의 저장소만 선택, 혹은 전부 선택되지 않게 하기 위해 전체 저장소의 isSelected 속성을 false로 만드는 함수
  //* repoList 배열을 모두 순회하며 객체 내 isSelected 속성을 false로 만든다.
  repoList.forEach(repo => (repo.isSelected = false));
};

const getSelectedRepo = () => {
  //? checkout 명령어로 선택된 저장소 객체
  return repoList.filter(repo => repo.isSelected === true)[0];
};

const printRepoFiles = repo => {
  //? 인자로 받은 저장소의 파일들을 각 영역을 구분지어 출력한다.
  let repoFileListStr = "";
  repoFileListStr += "---Working Directory/\n";

  repoFileListStr = repo.files.workingDirectory.reduce((acc, file) => {
    return acc + `${file.name}\t${file.updatedTime}\n`;
  }, repoFileListStr);
  repoFileListStr += "\n---Staging Area/\n";
  repoFileListStr = repo.files.stagingArea.reduce((acc, file) => {
    return acc + `${file.name}\t${file.updatedTime}\n`;
  }, repoFileListStr);
  repoFileListStr += "\n---Git Repository/\n";
  repoFileListStr = repo.files.gitRepository.reduce((acc, file) => {
    return acc + `${file.name}\t${file.updatedTime}\n`;
  }, repoFileListStr);
  printMessage(repoFileListStr);
};

const checkFileExist = (repo, newFileName) => {
  //? repo 객체 내 파일 목록에 newFileName과 동일한 이름을 가진 파일이 있으면 true, 없으면 false 출력
  let duplicateFlag = false;
  const repoFiles = repo.files;
  for (fileArea in repoFiles) {
    duplicateFlag = repoFiles[fileArea].some(file => newFileName === file.name);
    if (duplicateFlag) {
      break;
    }
  }
  return duplicateFlag;
};

const getRepoOnRemote = repoName => {
  //? repoName과 동일한 저장소명을 가진 저장소가 remote에 있는지 확인해서 있으면 해당 저장소 객체를 반환
  return remoteRepoList.filter(remoteRepo => remoteRepo.name === repoName)[0];
};

module.exports = class VMGit {
  init(repoName) {
    //? 생성할 저장소 명을 입력받아 저장소 객체 생성해서 전체 저장소 배열에 추가한다.
    //* 객체 구조 -> name(저장소명), id, fileList(저장소 내 파일리스트)
    const searchedRepo = searchRepo(repoName);
    if (searchedRepo.length > 0) {
      printMessage(`동일한 저장소명(${repoName})이(가) 존재합니다.`);
      return;
    }
    const repoId = generateRandomID();
    const currentDate = getCurrentDate();
    const repoObj = {
      name: repoName,
      id: repoId,
      files: {
        workingDirectory: [],
        stagingArea: [],
        gitRepository: []
      },
      isSelected: false,
      commitLogs: []
    };
    repoList.push(repoObj);
    printMessage(`created ${repoName} repository.`);
  }

  status(repoLocation, repoName) {
    //? 파일 내부를 확인하고 싶은 저장소명을 입력받아 전체 저장소 배열 내 저장소 중에 있는지 확인하고 있으면 파일 리스트 출력, 없으면 전체 저장소 목록 출력
    //* 전체 저장소 목록 출력하는 함수가 필요함.
    //* 전체 저장소 순회하면서 저장소 찾는 함수 따로 구현하기.
    if (!!!repoLocation || !!!repoName) {
      const selectedRepo = getSelectedRepo();
      if (selectedRepo === undefined) {
        printRepoList();
        printMessage(
          "warning : 'status local <repo name>'를 입력하거나 'checkout <repo name>'로 저장소를 선택한 후에 'status' 명령어를 입력하세요."
        );
      } else printRepoFiles(selectedRepo);
      return;
    }
    if (repoLocation === "local") {
      const localRepo = searchRepo(repoName)[0];
      if (localRepo === undefined) {
        printRepoList();
        printMessage(`저장소 <${repoName}>은(는) 존재하지 않습니다.`);
      } else {
        printRepoFiles(localRepo);
      }
    }
  }

  checkout(repoName) {
    //? 이동할 저장소 명 입력받아서 해당 저장소가 있으면 이동한다.
    //* searchRepo를 재사용해서 검색한다.
    //* 저장소 객체를 return 받으면 name을 뽑아서 prompt 문자열에 붙여준다!
    //* 저장소 없는 경우 다른 행동은 하지 않는다.
    const repoObj = searchRepo(repoName);
    allRepoUnselect();
    if (repoObj[0] !== undefined) {
      repoObj[0].isSelected = true;
      return repoObj[0].name;
    } else {
      return "";
    }
  }

  printRepoList() {
    printMessage(repoList);
  }

  newFile(fileName) {
    //TODO: checkout으로 저장소 선택한 후에 new <file_name> 명령을 사용하면 해당 working directory에 파일을 생성한 것으로 기록한다. 처음 생성한 파일 상태는 Untracked 상태
    //? 현재 선택되어 있는 저장소에 파일을 추가한다.
    //* 파일 객체 생성해서 현재 선택된 저장소 객체 내 프로퍼티로 추가한다.
    //* 파일 객체에 상태가 있어야 한다. Untracked, Unmodified, Modified, Staged
    const selectedRepo = getSelectedRepo();
    if (selectedRepo === undefined) {
      printMessage(
        `현재 선택된 저장소가 없습니다. 저장소 선택 후 파일 생성 명령어를 입력하세요.\n저장소 선택 : checkout <repo name>`
      );
    } else {
      const fileObj = {
        name: fileName,
        status: FILE_STATUS.Untracked,
        updatedTime: getCurrentDate()
      };
      if (!checkFileExist(selectedRepo, fileName)) {
        selectedRepo.files.workingDirectory.push(fileObj);
      } else {
        printMessage("동일한 파일명이 존재합니다.");
      }
    }
  }

  add(fileName) {
    const selectedRepo = getSelectedRepo();
    if (selectedRepo === undefined) {
      printMessage(
        `현재 선택된 저장소가 없습니다. 저장소 선택 후 add 명령어를 입력하세요.\n저장소 선택 : checkout <repo name>`
      );
    } else {
      if (checkFileExist(selectedRepo, fileName)) {
        let fileIdx = -1;
        selectedRepo.files.workingDirectory.forEach((file, idx) => {
          if (file.name === fileName) fileIdx = idx;
        });
        if (fileIdx === -1) return;
        const fileObj = selectedRepo.files.workingDirectory[fileIdx];
        selectedRepo.files.workingDirectory.splice(fileIdx, 1);
        selectedRepo.files.stagingArea.push(fileObj);
        fileObj.updatedTime = getCurrentDate();
      } else {
        printMessage(`저장소에 ${fileName} 파일이 존재하지 않습니다.`);
      }
    }
  }

  commit(...commitLog) {
    //? 해당 저장소 staging area에 존재하는 파일들을 git repository로 이동 후 커밋 목록 출력
    const selectedRepo = getSelectedRepo();
    if (selectedRepo === undefined) {
      printMessage(
        `현재 선택된 저장소가 없습니다. 저장소 선택 후 commit 명령어를 입력하세요.\n저장소 선택 : checkout <repo name>`
      );
      return;
    }
    const commitFileList = [];
    selectedRepo.files.stagingArea.forEach(file => {
      file.status = FILE_STATUS.Unmodified;
      selectedRepo.files.gitRepository.push(file);
      commitFileList.push(file);
    });
    selectedRepo.files.stagingArea = [];
    printMessage("---commit files/");
    commitFileList.forEach((file) => {
      printMessage(`${file.name}\t${file.updatedTime}`);
    });

    const commitLogStr = `commit : "${commitLog.join(" ")}"`;
    const commitLogObj = {
      commitLog: commitLogStr,
      commitFiles: commitFileList
    };
    selectedRepo.commitLogs.push(commitLogObj);
  }

  touch(fileName) {
    //? 커밋된 파일을 working directory로 이동하고 file status를 Modified로 수정
    //TODO: 리팩토링 시 add 메서드와 겹치는 로직 함수화 하기(파일 영역 이동)
    const selectedRepo = getSelectedRepo();
    if (selectedRepo === undefined) {
      printMessage(
        `현재 선택된 저장소가 없습니다. 저장소 선택 후 touch 명령어를 입력하세요.\n저장소 선택 : checkout <repo name>`
      );
      return;
    }
    if (checkFileExist(selectedRepo, fileName)) {
      let fileIdx = -1;
      selectedRepo.files.gitRepository.forEach((file, idx) => {
        if (file.name === fileName) fileIdx = idx;
      });
      if (fileIdx === -1) return;
      const fileObj = selectedRepo.files.gitRepository[fileIdx];
      selectedRepo.files.gitRepository.splice(fileIdx, 1);
      selectedRepo.files.workingDirectory.push(fileObj);
      fileObj.updatedTime = getCurrentDate();
      fileObj.status = FILE_STATUS.Modified;
    } else {
      printMessage(`저장소에 ${fileName} 파일이 존재하지 않습니다.`);
    }
  }

  log() {
    //? 커밋로그와 함께 커밋한 파일들 목록 출력
    const selectedRepo = getSelectedRepo();
    if (selectedRepo === undefined) {
      printMessage(
        `현재 선택된 저장소가 없습니다. 저장소 선택 후 log 명령어를 입력하세요.\n저장소 선택 : checkout <repo name>`
      );
      return;
    }

    let commitLogStr = "";
    commitLogStr = selectedRepo.commitLogs.reduce((acc, commitLogObj) => {
      return acc + `${commitLogObj.commitLog}\n${commitLogObj.commitFiles}\n`;
    }, commitLogStr);
    printMessage(commitLogStr);
  }

  push() {
    //? 마지막까지 local에서 commit 한 이력과 Git Repository 파일을 모두 remote로 복사
    //* selectedRepo가 있는 경우에만 진행한다.
    //* git repository에 파일이 있을 경우만 복사한다.
    //* 커밋한 파일들이 push되었다는 안내 메시지를 출력한다.
    //* remote에 현재 저장소 정보가 있다면 commitLogs와 gitRepository만 업데이트한다.
    //* remote에 현재 저장소 정보가 없다면 필요한 저장소 객체를 모두 업데이트한다.
    const selectedRepo = getSelectedRepo();
    if (selectedRepo === undefined) {
      printMessage(
        `현재 선택된 저장소가 없습니다. 저장소 선택 후 push 명령어를 입력하세요.\n저장소 선택 : checkout <repo name>`
      );
      return;
    }
    let remoteRepo = getRepoOnRemote(selectedRepo.name);
    if (remoteRepo === undefined) {
      const repoObj = {
        name: selectedRepo.name,
        id: selectedRepo.id,
        files: {
          gitRepository: [...selectedRepo.files.gitRepository]
        },
        commitLogs: [...selectedRepo.commitLogs]
      };
      remoteRepoList.push(repoObj);
      remoteRepo = getRepoOnRemote(selectedRepo.name);
    } else {
      if (
        selectedRepo.files.gitRepository[
          selectedRepo.files.gitRepository.length - 1
        ] ===
        remoteRepo.files.gitRepository[
          remoteRepo.files.gitRepository.length - 1
        ]
      ) {
        printMessage(`Everything up-to-date`);
        return;
      }
      remoteRepo.files.gitRepository = [...selectedRepo.files.gitRepository];
      remoteRepo.commitLogs = [
        ...remoteRepo.commitLogs,
        ...selectedRepo.commitLogs
      ];
    }
    printMessage(`push some commits...`);
    remoteRepo.commitLogs.forEach(log => {
      printMessage(`${log.commitLog} pushed.`);
    });
  }
};
