## 프로그래밍 언어와 JavaScript

JavaScript는 인터프리터 언어이다! 컴파일 언어와의 차이점을 알기 위해 정리했다.

### Compiled 와 Interpretered의 차이점?

- Compiled language

    컴파일 언어는 인터프리터가 아닌, 컴파일러에 의해 실행되는 프로그래밍 언어이다.

    컴파일러 : Source code로부터 machine code를 발생시키는 번역기

    인터프리터 : pre-runtime에서 변환이 수행되지 않는 source code의 단계별 실행기

- Compile language의 장점

    컴파일 시 native code로 컴파일 된 프로그램은 tanslation 프로세스의 오버헤드 때문에 런타임에 변환된 프로그램 보다 빠른 경향이 있다.

- Compiled languages
    - C / C++ / Objective-C / Swift
    - C#
    - Java
    - etc..

- Interpreted language

    인터프리터 언어는 프로그램을 기계어로 번역하지 않고 대부분의 실행이 직접, 그리고 자유롭게 명령을 실행하는 프로그래밍 언어의 한 유형이다. 인터프리터는 프로그램을 직접 실행하여 각 구문을 하나 이상의 서브루틴 순서로 번역한 다음 다른 언어(보통 machine code)로 변환한다.

- Interpreted language의 장점

    인터프리터 언어는 컴파일 언어보다 유연하다. 컴파일러에서보다 인터프리터에서 구현하기 쉬운 특징은 다음과 같다.

    - 플랫폼에 제한적이지 않다.(다양한 컴퓨팅 플랫폼에서 실행)
    - 동적 타이핑(변수, 함수, 모듈 등)
    - 동적 스코핑

    동적 타이핑이나 동적 스코핑은 장점이자 단점이 될 수 있다. 

    컴파일러에 의해 수행되는 정적 타입 체크가 없으면 프로그램 신뢰성이 떨어질 수 있기 때문이다.

- Interpreted languages
    - JavaScript
    - Mathematica / MATLAB
    - PHP
    - etc..

### 참고

- [Wiki - Compiled language](https://en.wikipedia.org/wiki/Compiled_language)
- [Wiki - Interpreted language](https://en.wikipedia.org/wiki/Interpreted_language)
- [Stack overflow - What is the difference between native code, machine code and assembly code?](https://stackoverflow.com/questions/3434202/what-is-the-difference-between-native-code-machine-code-and-assembly-code)