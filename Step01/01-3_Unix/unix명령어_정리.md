# Linux와 Unix

## 유닉스 명령어

#### pwd
현재 디렉토리 확인
```
❯ pwd
/Users/eblee/Dropbox/Codesquad/01-3_Unix
```

#### ls
디렉토리의 내용을 보여줌(List Directory)
```
❯ ls    
01-2_pair_programming 01-3_Unix

❯ ls -l 
total 0
drwxr-xr-x@ 7 eblee  staff  224  4  1 16:30 01-2_pair_programming
drwxr-xr-x@ 7 eblee  staff  224  4  2 14:10 01-3_Unix

❯ ls -al
total 0
drwxr-xr-x@  4 eblee  staff  128  4  2 10:05 .
drwx------@ 31 eblee  staff  992  4  1 14:32 ..
drwxr-xr-x@  7 eblee  staff  224  4  1 16:30 01-2_pair_programming
drwxr-xr-x@  7 eblee  staff  224  4  2 14:10 01-3_Unix
```

##### ls 옵션

-l : 접근권한 및 최종 수정 날짜 등의 정보를 포함해서 리스트 형태로 보여줌  
-a : 숨긴 파일 및 폴더(.로 시작)을 포함해서 보여준다.

#### tree [디렉토리이름] [-L 깊이]

macOS에서 tree 명령어가 내장되어있지 않아 설치했습니다.  
```
brew install tree
```

디렉토리이름에 입력한 폴더의 구조를 트리형태로 나타냅니다.  
-L 옵션으로 트리형태로 표현할 깊이를 입력합니다.

```
❯ tree / -L 1
/
├── Applications
├── Library
├── Network
├── System
├── Users
├── Volumes
├── bin
├── cores
├── dev
├── etc -> private/etc
├── home
├── installer.failurerequests
├── net
├── private
├── sbin
├── tmp -> private/tmp
├── usr
└── var -> private/var

17 directories, 1 file
```

#### mkdir [디렉토리이름]

[디렉토리이름]으로 새로운 디렉토리를 생성합니다.
```sh
~/Desktop/Study/Unix Prac
❯ mkdir project

~/Desktop/Study/Unix Prac
❯ ls
project
```

#### cd
디렉토리 변경

```sh
~/Desktop/Study
❯ cd .

~/Desktop/Study
❯ cd ..

~/Desktop
❯ cd Study

~/Desktop/Study
❯ cd ./././././
```

#### cat [파일이름]

파일 내용 표시

```sh
❯ cat test.txt
안녕하세요??

cat test입니다.
```

#### less [파일명]

긴 파일의 내용을 끊어서 표시

```sh
❯ less test.txt
```
위 명령어 입력 후, 읽기모드에 진입합니다. 그 안에서 입력할 수 있는 명령어는 아래와 같습니다.  
- q: 종료
- g: 처음으로
- G: 끝으로
- /단어: 문서에서 '단어'를 검색
- space, enter, 화살표, hjkl: 페이지 이동

#### history

명령어 이력 표시
```sh
❯ history
...(생략)
 6765  cat test.txt
 6766  less test.txt
 6767  history
 6768  ls
 6769  cd Desktop
 6770  ls
 6771  cd Study
 6772  ls
 6773  cd Unix\ Prac
 6774  ls

❯ history !6774

~/Desktop/Study/Unix Prac
❯ history ls
```

위 예시처럼 `history !명령어번호` 를 입력하면 자동으로 해당 명령어를 추가해서 `history ls` 가 입력됩니다.

#### cp [복사할 파일명] [생성할 파일명]

파일복사

```sh
~/Desktop/Study/Unix Prac
❯ ls       
project  test.txt

~/Desktop/Study/Unix Prac
❯ cp test.txt test2.txt 

~/Desktop/Study/Unix Prac
❯ ls
project   test.txt  test2.txt
```

#### mv 

파일명 변경

```sh
mv [filename] [new filename]
```
예시

```sh
~/Desktop/Study/Unix Prac
❯ mv test.txt test_rename.txt               

~/Desktop/Study/Unix Prac
❯ ls
project         test2.txt       test_rename.txt
```

폴더 이동

```sh
mv [filename] [directory name]
```
예시
```sh
~/Desktop/Study/Unix Prac
❯ ls
project         test2.txt
test            test_rename.txt

~/Desktop/Study/Unix Prac
❯ mv test_rename.txt test    

~/Desktop/Study/Unix Prac
❯ ls
project   test      test2.txt

~/Desktop/Study/Unix Prac
❯ cd test/             

~/Desktop/Study/Unix Prac/test
❯ ls
test_rename.txt

```

#### rm

파일 삭제

```sh
~/Desktop/Study/Unix Prac/test
❯ ls           
test_rename.txt

~/Desktop/Study/Unix Prac/test
❯ rm test_rename.txt 

~/Desktop/Study/Unix Prac/test
❯ ls
```

디렉토리 삭제  
-r : 하위 디렉토리를 포함해 모든 파일 삭제
```sh
~/Desktop/Study/Unix Prac
❯ ls
project   test      test2.txt

~/Desktop/Study/Unix Prac
❯ rm -r test        

~/Desktop/Study/Unix Prac
❯ ls
project   test2.txt
```

-f : force의 약어. 강제로 파일이나 디렉토리를 삭제합니다.

#### find [디렉토리] -name "파일이름"

지정한 디렉토리와 하위 디렉토리에서 해당 파일을 검색합니다.

```sh
~/Desktop/Study/Unix Prac
❯ find project -name "projeda"

~/Desktop/Study/Unix Prac
❯ find project -name "project"
project
```

조건에 부합하는 파일이 있을 경우 파일명을 출력해서 보여줍니다.  

#### touch [파일이름]

0바이트 파일 생성
```sh
~/Desktop/Study/Unix Prac
❯ touch foo.txt

~/Desktop/Study/Unix Prac
❯ ls
foo.txt   project   test2.txt

~/Desktop/Study/Unix Prac
❯ cat foo.txt 
```

파일 내용 확인 시 아무것도 출력되지 않았습니다.

#### pbcopy, pbpaste

맥 전용 명령어. 클립보드 복사/붙여넣기로 활용

```sh
~/Desktop/Study/Unix Prac
❯ cat test2.txt | pbcopy

~/Desktop/Study/Unix Prac
❯ pbpaste > test_copy.txt

~/Desktop/Study/Unix Prac
❯ cat test_copy.txt     
안녕하세요??

cat test입니다.
```