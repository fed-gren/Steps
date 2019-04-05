### MDN 문서(레퍼런스) 읽는 법

**영어를 잘하면 된다. 끝 🤷🏻‍♂️**

은 아니고 평소 MDN을 참고하며 잘 몰랐던 부분에 대해 알아보았다.

JavaScript의 Array 내장 함수인 reduce에 대해 검색해 보았고, MDN에 들어가보니 Syntax에서 아래와 같이 설명이 나온다.

    arr.reduce(callback[, initialValue])

매개변수가 뭔가 이상하다. ***calback[, initialValue]***

???????

이 의미를 알기 위해 적당히 아는 단어를 조합해서(콩글리쉬) 다음과 같이 검색을 했다.

***what mean mdn syntax [,***

검색결과 제일 상단에 Syntax sections - The MDN project | MDN 가 나왔다.

들어가보면 API reference syntax에 대한 설명이 있고 내가 원하는 답은 Constructors and methods 섹션에서 찾을 수 있었다.

*대괄호는 내부에 있는 매개변수가 선택적(Optional)임을 의미한다.*
위 예시에서는 initialValue라는 매개변수가 선택사항임을 알 수 있다.

### 참고

- [Syntax sections - The MDN project | MDN](https://developer.mozilla.org/en-US/docs/MDN/Contribute/Structures/Syntax_sections)