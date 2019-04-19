//* 가상 깃 개발
const { log } = console;
const idList = [];
const repoList = []; //? 저장소 객체를 담을 배열
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

const formatDate = date => {
  return `${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
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
  log(repoListStr);
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

module.exports = class VMGit {
  init(repoName) {
    //? 생성할 저장소 명을 입력받아 저장소 객체 생성해서 전체 저장소 배열에 추가한다.
    //* 객체 구조 -> name(저장소명), id, updated(최종 갱신 날짜), fileList(저장소 내 파일리스트)
    const searchedRepo = searchRepo(repoName);
    if (searchedRepo.length > 0) {
      log(`동일한 저장소명(${repoName})이(가) 존재합니다.`);
      return;
    }
    const repoId = generateRandomID();
    const currentDate = formatDate(new Date(Date.now()));
    const repoObj = {
      name: repoName,
      id: repoId,
      updated: currentDate,
      files: {
        workingDirectory: [],
        stagingArea: [],
        gitRepository: []
      },
      isSelected: false
    };
    repoList.push(repoObj);
  }

  status(repoLocation, repoName) {
    //? 파일 내부를 확인하고 싶은 저장소명을 입력받아 전체 저장소 배열 내 저장소 중에 있는지 확인하고 있으면 파일 리스트 출력, 없으면 전체 저장소 목록 출력
    //* 전체 저장소 목록 출력하는 함수가 필요함.
    //* 전체 저장소 순회하면서 저장소 찾는 함수 따로 구현하기.
    if (!!!repoLocation || !!!repoName) {
      log("명령어 형식이 잘못 되었습니다.");
      return;
    }
    if (repoLocation === "local") {
      const localRepo = searchRepo(repoName)[0];
      if (localRepo === undefined) {
        printRepoList();
      } else {
        log(localRepo.files);
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
    log(repoList);
  }

  newFile(fileName) {
    //TODO: checkout으로 저장소 선택한 후에 new <file_name> 명령을 사용하면 해당 working directory에 파일을 생성한 것으로 기록한다. 처음 생성한 파일 상태는 Untracked 상태
    //? 현재 선택되어 있는 저장소에 파일을 추가한다.
    //* 파일 객체 생성해서 현재 선택된 저장소 객체 내 프로퍼티로 추가한다.
    //* 파일 객체에 상태가 있어야 한다. Untracked, Unmodified, Modified, Staged
    const fileObj = {
      name: fileName,
      status: FILE_STATUS.Untracked,
      updated: formatDate(new Date(Date.now()))
    };
    getSelectedRepo().files.workingDirectory.push(fileObj);
  }
};
