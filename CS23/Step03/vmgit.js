//* 가상 깃 개발
//TODO: init part 구현
const { log } = console;
const idList = [];

const generateRandomID = () => {
  let id;
  while (true) {
    id = Math.floor(Math.random() * 10000) + 1;
    if (idList.indexOf(id) === -1) {
      idList.push(id);
      break;
    }
  }
};

module.exports = class VMGit {
  constructor() {
    this.repoList = []; //? 저장소 객체를 담을 배열
  }

  init(repoName) {
    //TODO: init - init() 함수 구현
    //? 생성할 저장소 명을 입력받아 저장소 객체 생성해서 전체 저장소 배열에 추가한다.
    //* 객체 구조 -> name(저장소명), id, updated(최종 갱신 날짜), fileList(저장소 내 파일리스트)
    console.log(`init() executed. repo name : ${repoName}`);
    generateRandomID();
    log(`id List : ${idList}`);
  }

  status() {
    //TODO: init - status() 함수 구현
    //? 파일 내부를 확인하고 싶은 저장소명을 입력받아 전체 저장소 배열 내 저장소 중에 있는지 확인하고 있으면 파일 리스트 출력, 없으면 전체 저장소 목록 출력
    //* 전체 저장소 목록 출력하는 함수가 필요함.
    //* 전체 저장소 순회하면서 저장소 찾는 함수 따로 구현하기.
    console.log("status() executed!");
  }

  checkout() {
    //TODO: init - checkout 명령어 구현
    //? 이동할 저장소 명 입력받아서 해당 저장소가 있으면 이동한다.
    //* searchRepo를 재사용해서 검색한다.
    //* 저장소 객체를 return 받으면 name을 뽑아서 prompt 문자열에 붙여준다!
    //* 저장소 없는 경우 다른 행동은 하지 않는다.
    console.log("checkout() executed!");
  }

  searchRepo(repoName) {
    //TODO: status - searchRepo(repoName)
    //? 전체 저장소 배열(repoList) 내에서 repoName과 name 프로퍼티가 동일한 객체 찾아서 있으면 해당 객체 리턴. 없으면 false 리턴
    //* filter 함수 사용하면 될듯하다.
    console.log("searchRepo() executed!");
  }

  printRepoList() {
    //TODO: status - printRepoList()
    //? searchRepo()에서 false 반환한 경우, 전체 저장소 목록(name)을 출력하는 함수.
    //* 배열 순회하며 객체 내 이름만으로 구성된 새로운 배열 필요! map과 forEach 사용하면 될듯
    console.log("printRepoList() executed!");
  }
};
