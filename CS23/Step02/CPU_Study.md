## CPU 역할

즉 CPU는 특정 명령에 따라 기본적인 산술, 논리, 제어, 입출력 작업을 수행함으로 써 컴퓨터 프로그램의 명령을 수행한다.

프로그램이 메모리에 저장되어 있으니까 아래와 같은 과정을 거쳐서 실행한다.

CPU는 메모리에 저장된 프로그램을 차례대로 fetch해서 해당 명령어를 분류decode한 뒤 실행execute하는 역할을 담당한다.

### Instruction cycle (fetch - decode - execute)

명령을 처리하기 위해 컴퓨터가 부팅 후 종료될 때까지 CPU에서 실행되는 cycle이다.

요즘 대부분의 CPU에서 Instruction cycle은 Instruction pipeline을 통해 동시 혹은 병렬로 실행된다. 다음 명령이 완료되기 전에 처리되기 시작하며, 주기가 별도의 단계로 나누어져 있기 때문에 가능하다.

**Instruction pipeline?**

![](https://simplecore-ger.intel.com/techdecoded/wp-content/uploads/sites/11/figure-1-5.png)

Figure 1 – Sequential instruction processing at one step per clock cycle

![](https://simplecore-ger.intel.com/techdecoded/wp-content/uploads/sites/11/figure-2-3.png)

Figure 2 – Pipelined instruction processing

### 참고

- [Wiki - Central processing unit](https://en.wikipedia.org/wiki/Central_processing_unit#Operation)
- [Intel - Understanding the Instruction Pipeline](https://techdecoded.intel.io/resources/understanding-the-instruction-pipeline/)


---


### Program Execution in the CPU

1. A sequence of instructions is stored in memory.

    → 메모리에 명령어들이 순차적으로 저장되어 있다.

2. The memory address where the first instruction is located is copied to the program counter.

    → 첫 번째 명령이 있는 메모리 주소는 PC에 복사된다.

3. The CPU sends the address in the program counter to memory via the address bus.

    → CPU는 주소버스를 통해 PC에 있는 주소를 메모리로 보낸다.

4. Memory responds by sending a copy of the state of the bits at that memory location on the data bus, which the CPU then copies into its instruction register.

    → 메모리는 데이터 버스의 해당 메모리 위치에 있는 비트의 상태 사본을 전송하여 응답하며, CPU는 이를 명령 레지스터(IR)에 복사한다.

5. The instruction pointer is automatically incremented to contain the address of the next instruction in memory.

    → 명령 포인터는 메모리에 다음 명령의 주소를 포함하도록 자동 증가된다.

6. The CPU executes the instruction in the instruction register.

    → CPU는 명령 레지스터의 명령을 실행한다.

7. Go to step 3

Steps 3,4,5는 instruction fetch라고 한다.

### 참고

- [8.4 Program Execution in the CPU](https://bob.cs.sonoma.edu/IntroCompOrg-RPi/sec-progexec.html)