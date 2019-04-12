//type이 sk인, name으로 구성된 배열만 출력
//데이터 : https://git.io/vQukL

const data = [
  {
    id: 1,
    name: "Yong",
    phone: "010-0000-0000",
    type: "sk",
    childnode: [
      {
        id: 11,
        name: "echo",
        phone: "010-0000-1111",
        type: "kt",
        childnode: [
          {
            id: 115,
            name: "hary",
            phone: "211-1111-0000",
            type: "sk",
            childnode: [
              {
                id: 1159,
                name: "pobi",
                phone: "010-444-000",
                type: "kt",
                childnode: [
                  {
                    id: 11592,
                    name: "cherry",
                    phone: "111-222-0000",
                    type: "lg",
                    childnode: []
                  },
                  {
                    id: 11595,
                    name: "solvin",
                    phone: "010-000-3333",
                    type: "sk",
                    childnode: []
                  }
                ]
              }
            ]
          },
          {
            id: 116,
            name: "kim",
            phone: "444-111-0200",
            type: "kt",
            childnode: [
              {
                id: 1168,
                name: "hani",
                phone: "010-222-0000",
                type: "sk",
                childnode: [
                  {
                    id: 11689,
                    name: "ho",
                    phone: "010-000-0000",
                    type: "kt",
                    childnode: [
                      {
                        id: 116890,
                        name: "wonsuk",
                        phone: "010-000-0000",
                        type: "kt",
                        childnode: []
                      },
                      {
                        id: 1168901,
                        name: "chulsu",
                        phone: "010-0000-0000",
                        type: "sk",
                        childnode: []
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 117,
            name: "hong",
            phone: "010-0000-0000",
            type: "lg",
            childnode: []
          }
        ]
      }
    ]
  }
];

const skMembers = [];

let getSKMembers = data => {
  //배열 순회하면서 객체가 있는지 확인
  for (userData of data) {
    if (typeof userData === "object") {
      //객체라면, 객체 순회를 통해서 type이 sk인지 확인하고 맞다면 name을 push
      let skName = "";
      for (key in userData) {
        if (key === "name") skName = userData[key];      //name 저장
        else if (userData[key] === "sk") skMembers.push(skName);     //sk인 사람 push
        else if (Array.isArray(userData[key])) {     //childnode 처리
          getSKMembers(userData[key]);
        }
      }
    }
  }
};

getSKMembers(data);
console.log(skMembers);