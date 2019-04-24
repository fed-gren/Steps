const repo = {
  name: ""
};

const process = {
  init(repoName) {
    repo.name = repoName;
    //make repo
  },

  status(location, repoName) {
    if (location === "local") {
      //local 폴더 파일 목록 출력.
    }
  },

  checkout(repoName) {
    //local 폴더 검색. repoName과 동일한거 있으면 프롬프트 이름 바꾸기.
  }
};
