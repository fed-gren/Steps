## Node.js

- NodeJS를 통해서 JavaScript를 브라우저 이외의 공간에서 실행할 수 있음. NodeJS는 v8엔진을 통해서 동작됨.
- ECMAScript 문법에 따라서 구현가능. (ECMAScript는 JavaScript문법에 대한 명세)
- NodeJS를 통해서 JavaScript코드를 CLI를 통해서 실행할 수 있음.

### What is Node.js?

- Node.js는 서버사이드 자바스크립트 런타임 환경이다.
- Google의 V8 엔진, libuv(multi-platform support library), core library를 포함하며 오픈소스이다.
- Node.js는 브라우저안에서 실행되지 않기 때문에, 전역 "window" 객체를 노출시키지 않는다.

### What is Node.js used for?

- Node.jssms 싱글 스레드 특성 때문에 non-blocking(비동기), event-driven 서버에 사용된다.

### Is Node.js a framework?

- Node.js는 환경(environment)이며 Node.js안에서 백엔드 프레임워크가 운영된다.
- HTTP 서버와 Socket을 위한 Express.js와 WebSocket 서버를 위한 IO가 인기가 많다.

### Why is Node.js popular?

- 오픈소스이며 JavaScript 기반의 생태계를 가지고 있다.
- 버전 간 호환성을 잘 유지한다.

### Why is Node.js bad?

- 싱글 스레드 방식인 Node.js는 한 작업이 시간이 많이 걸리면 전체 시스템의 성능이 급격하게 떨어진다.
- 따라서 가벼운 작업 위주로 개발이 되어야 한다.

### 참고

- [Why Use Node.js?](https://www.toptal.com/nodejs/why-the-hell-would-i-use-node-js)