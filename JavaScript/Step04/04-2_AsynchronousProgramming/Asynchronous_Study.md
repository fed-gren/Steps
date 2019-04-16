## 비동기 프로그래밍

**자바스크립트에서 비동기가 갖는 의미**

- 싱글스레드로 동작하는 자바스크립트의 한계를 해결해준다.
- DB, file에 접근하거나 네트워크 통신이 필요한 경우 등의 작업이 필요할 때, 비동기 처리를 통해 blocking 하지 않고 효과적으로 처리할 수 있다.

**중요 포인트**

- 동기/비동기의 차이를 이해
- 비동기 프로그래밍에서의 디버깅

### 동기 (Synchronous)

동기적 일처리 방식 : 순차적으로 일을 끝내는 방식

동기적인 흐름은 순서대로 실행된다는 의미이다.

    const baseData = [1,2,3,4,5,6,100];
    
    baseData.forEach((v,i) => {
        console.log("sync ", i);
    });
    
    baseData.forEach((v,i) => {
        console.log("sync 2", i);
    });

위 코드를 실행하면 baseData 배열을 순회하며 출력을 순서대로(sync → sync2) 진행한다.

### 참고

- [초보몽키의 개발공부로그 - 동기와 비동기 프로그래밍](https://wayhome25.github.io/nodejs/2017/02/18/nodejs-06-Asynchronous-synchronous/)

---
<br>

### C**all stack**

    const baseData = [1,2,3,4,5,6,100];
    
    function foo() {
      baseData.forEach((v,i) => {
        console.log("sync ", i);
        bar();
      });
    }
    
    function bar() {
      baseData.forEach((v,i) => {
        console.log("sync 2", i);
      });
    }

![](http://g.recordit.co/3rIzic2w2J.gif)

**새로 공부한 것!**

콜백 큐에 있는 함수들은 콜백 스택에 들어갈 자리만 있으면 바로 들어간다고 생각했는데 그게 아니었음!

JS 환경에서 콜 스택이 비어져 있을 때 이벤트 루프에 대기 중인 항목이 있는지 점검하고, 대기 중인 항목이 있으면 첫 번째 항목을 실행하기 위해 콜 스택으로 이동한다.

### 참고

- [Regular Event Loop](https://gist.github.com/jesstelford/9a35d20a2aa044df8bf241e00d7bc2d0)

---
<br>

### setTimeout과 비동기

setTimeout이 동기적으로 실행된다면 어떻게 될까?

setTimeout의 callback 함수는 함수의 인자로 들어가서 즉시, 혹은 나중에 실행된다.

**setTimeout(function, milliseconds)**

1. function
    - function이 타이머 만료 후 실행된다.
2. milliseconds(optional)
    - 타이머가 지정된 함수나 코드를 실행시키기 전에 기다려야 할 ms 단위의 시간. 이 매개변수를 생략하면 0으로 설정된다. 실제 지연시간은 더 길어질 수 있다.
3. 반환 값
    - 반환되는 timeoutID는 숫자이고, setTimeout()을 호출하여 만들어진 타이머를 식별할 수 있는 0이 아닌 값이다. 이 값은 타이머를 취소시키기 위해 WindowTimers.clearTimeout()에 전달할 수 있다.
4. 주의 사항
    - IE9 이하에서 function에 추가적인 매개변수를 전달하는 기능 동작 안함.
    - setTimeout()과 setInterval()은 같은 ID 공간으 ㄹ공유한다. 따라서 clearTimeout()과 clearInterval() 둘 중 어느 것을 사용해도 기술적으로 동일하게 동작한다. 하지만 명확성을 위해 일치시켜서 코딩해야 한다.

    setTimeout( ()=>console.log(10), 10000);

위 코드는 10초 뒤에 console.log(10)을 출력하는 코드이다.

setTimeout 함수가 동기적으로 동작한다면?

- 인자로 넘겨준 함수를 setTimeout 함수 내부 코드를 수정하여 실행하지 않는 이상 실행하지 않는다.
- 아니면.. delay를 기다리는 동안 다른 코드가 동작할 수 없다!!

### 참고

- [MDN - WindowTimers.setTimeout()](https://developer.mozilla.org/ko/docs/Web/API/WindowTimers/setTimeout)

---
<br>

### Call stack & Callback queue

싱글 스레드 런타임을 가지고 있는   자바스크립트. 이는 곧 `한 번에 하나의 싱글 콜스택만을 가지고 있다`는 의미이다.

이벤트 루프와 callback queue는 브라우저에 있다.

event loop를 통해 callback queue에 callback 함수가 stack으로 올라간다.

    let parent = () => {
      test(0);
      console.log("parent end");
    }
    
    
    let test = (cnt) => {
      if(cnt > 5) {
        return 1;
      }
      if(cnt == 2) {
        setTimeout(() => {
          console.log("callback execute");
        }, 0);
      }
      console.log(`cnt : ${cnt}`);
      test(cnt + 1);
    }
    
    parent();

위 코드를 실행해보면 call stack이 비워져있을 때 setTimeout의 콜백함수가 실행된다는 것을 확인할 수 있다.

---
<br>

### 동기 - 비동기 순서 이해 예제

    function plus() {
      let a = 1;
      setTimeout( ()=>console.log(++a), 1000);
      return a;
    }
    
    const result = plus();
    console.log('result :', result);  //?

---
<br>

### 비동기 상황 예시

    const baseData = [1,2,3,4,5,6,100];
    
    const asyncRun = (arr, fn) => {
     for(var i=0; i<arr.length; i++) {
       setTimeout( () => fn(i), 1000);
     }
    }
    
    asyncRun(baseData, idx =>console.log(idx));

- 결과 분석
    1. 위와 같은 코드에서 이미 for문이 다 실행 되어 있고, i는 7이 되어있다.
    2. 그 상황에서 타이머가 끝나고 i를 출력하기 때문에 모두 7로 출력되는 것이다.
    3. for문이 빠르게 돌면서 1000의 딜레이를 주었으므로 거의 동시에 출력된다.

<br>

**비동기 상황 예시 forEach로 변경!**

    const baseData = [1,2,3,4,5,6,100];
    
    const asyncRun = (arr, fn) => {
       arr.forEach((v,i) => {
         setTimeout( () => fn(i), 1000);
       });
    }
    asyncRun(baseData, idx =>console.log(idx))

- 결과 분석

    forEach함수에서 콜백함수의 두번째 인자인 i는 현재 요소의 index이다. 그러므로 i에 해당 index가 입력되어 0,1,2,3,4,5,6이 출력될 수 있다.

<br>

**비동기 상황 예시 - 동기 + 비동기 + 동기**

    const baseData = [1,2,3,4,5,6,100];
    
    function sync() {
      baseData.forEach((v,i) => {
        console.log("sync ", i);
      });
    }
    
    const asyncRun = (arr, fn) => {
       arr.forEach((v,i) => {
         setTimeout( () => fn(i), 1000);
       });
    }
    
    function sync2() {
      baseData.forEach((v,i) => {
        console.log("sync 2 ", i);
      });
    }
    
    asyncRun(baseData, idx =>console.log(idx));
    sync();
    sync2();

- 결과 분석
    1. 제일 먼저 비동기 함수를 실행시킨다. 여기서는 setTimeout을 이용해 1초 뒤에 함수를 실행 시키도록 등록하고 함수 종료.
    2. sync 함수, sync2 함수가 동기적으로 실행된다.
    3. 1번에서 이벤트 루프에 넣어놨던 함수들이 타이머가 다 되면 실행된다.

<br>

**비동기 상황 예시 - 비동기 + 비동기**

순서 예상해보자!

    const baseData = [1,2,3,4,5,6,100];
    
    const asyncRun = (arr, fn) => {
       arr.forEach((v,i) => {
         setTimeout(() => {
           setTimeout(() => {
             console.log("cb 2");
             fn(i)
            },1000);
           console.log("cb 1");
         }, 1000);
       });
    }
    
    asyncRun(baseData, idx =>console.log(idx))

- 결과 분석
    1. forEach를 돌면서 바깥쪽 setTimeout으로 등록.(6번)
    2. 1초 뒤에 안쪽 setTimeout을 바깥쪽이 실행될 때 등록.
    3. 그래서 1초 뒤에 바깥쪽 setTimeout이 등록해뒀던 함수가 실행되면서 cb 1이 여섯 번 찍히고 , 다시 1초 뒤에 안쪽 setTimeout이 등록했던 함수가 실행되면서 cb 2와 배열 인덱스를 같이 여섯 번 출력한다.