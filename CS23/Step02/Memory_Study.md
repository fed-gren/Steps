## 메모리 역할

메모리는 실행할 프로그램을 저장하고 있다.

### 폰 노이만 구조

![](https://upload.wikimedia.org/wikipedia/ko/a/a1/Von_Neumann_architecture_kor.png)

- 내장 메모리 순차 처리 방식으로서, 데이터 메모리와 프로그램 메모리가 구분되어 있지 않고 하나의 버스를 가지고 있는 컴퓨터 아키텍처
- Control Unit, ALU, Memory Unit, Registers, I/Os로 구성된다.
- 명령 데이터와 프로그램 데이터가 동일한 메모리에 저장되는 stored-program computer concept을 기반으로 한다.(오늘날에도 대부분의 컴퓨터에서 사용됨)
- 폰 노이만 병목(Von-Neumann Bottleneck)현상은 일반적으로 자료 경로의 병목현상 또는 기억 장소(메모리)의 지연 현상을 말한다. 이는 나열된 명령을 순차적으로 수행하고, 그 명령은 일정한 메모리의 값을 변경하는 작업으로 구성되는 폰 노이만 구조에서 기인한다.

### 하버드 구조

![](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Harvard_architecture.svg/440px-Harvard_architecture.svg.png)

- 명령(프로그램)용 버스와 데이터용 버스로 물리적으로 분할한 컴퓨터 아키텍쳐
- 명령을 메모리로부터 읽는 것과 데이터를 메모리로부터 읽는 것을 동시에 할 수 있다.
- 명령을 처리하자마자 다음 명령을 읽어들일 수 있기 때문에 더 빠른 속도를 낼 수 있다고 할 수 있다.(처리속도 높이려면 많은 전기회로 필요)
- 프로그램 메모리와 데이터 메모리가 분리되어 있으므로 각자 다른 비트수를 사용할 수 있다. AVR 프로세서의 경우 명령어는 대부분 16비트 1워드. 데이터는 모두 8비트로 처리
- 프로그램 중에 데이터가 함께 혼합된 경우, 예를 들어 폰트 데이터나 표시할 문장 데이터, 메뉴 데이터 등은 프로그램과 함께 존재해야 하는데, 프로세서가 이러한 데이터를 읽어들이려고 시도하면 엄연히 '데이터'를 읽으려 하므로 데이터 메모리에서 이 내용을 찾으려 한다. 그런데 이 데이터들은 명령(프로그램) 메모리에 존재하기 때문에 명령(프로그램) 메모리로부터 데이터를 읽을 수 있는 특수 상황의 명령어가 필요하다.
- 명령(프로그램) 메모리와 데이터 메모리의 비트 수가 다른 경우 주소를 변환하는 과정을 거쳐야 한다.

### 폰 노이만 

- stored-program 컴퓨터 컨셉
- 명령과 데이터의 물리적인 메모리 주소가 동일하다.
- 프로세서는 명령을 수행하기 위해 2 cycle이 필요하다.
- 제어 유닛 설계가 간단하고 개발이 더 빠르고 비용이 저렴하다.
- 데이터 전송과 명령 fetch가 동시에 이뤄질 수 없다.
- 개인 컴퓨터, 노트북, 워크스테이션 등에 활용된다.

### 하버드

- 하버드 마크 I(Harvard Mark I) 기반 컴퓨터 모델
- 명령 메모리와 데이터 메모리의 주소가 분리되어 있다.
- 프로세서가 명령을 수행하기 위해 1 cycle이 필요하다.
- 제어 유닛이 좀 더 복잡하다.(2개 버스) 개발 비용이 더 추가된다.
- 데이터 전송과 명령 fetch가 동시에 이뤄질 수 있다.
- 마이크로컨트롤러와 신호 처리에 사용된다.

### 참고

- [Von Neumann Architecture](https://www.computerscience.gcse.guru/theory/von-neumann-architecture)
- [Wiki - 폰 노이만](https://ko.wikipedia.org/wiki/%ED%8F%B0_%EB%85%B8%EC%9D%B4%EB%A7%8C_%EA%B5%AC%EC%A1%B0)
- [Wiki - 하버드 아키텍쳐](https://ko.wikipedia.org/wiki/%ED%95%98%EB%B2%84%EB%93%9C_%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98)
- [What is the difference between the Von Neumann architecture and the Harvard architecture?](https://www.quora.com/What-is-the-difference-between-the-Von-Neumann-architecture-and-the-Harvard-architecture)