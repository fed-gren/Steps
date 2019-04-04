# 2. Git의 기초

Git에서 자주 사용하는 명령어는 모두 2장에 있다.(중요!!)  
학습 내용
- 저장소를 만들고 설정하는 방법 학습
- 파일을 추적하거나 추적을 그만두는 방법 학습
- 변경 내용을 Stage 하고 커밋하는 방법 학습
- 파일이나 파일 패턴을 무시하도록 Git을 설정하는 방법
- 실수를 만회하는 방법
- 프로젝트 히스토리를 조회하고 커밋을 비교하는 방법
- 리모트 저장소에 Push하고 Pull하는 방법
---
<br>

## 2.1 Git 저장소 만들기
Git 저장소를 사용하는 두 가지 방법
1. 아직 버전관리를 하지 않는 로컬 디렉토리를 하나 선택 후 Git 저장소를 적용
2. 다른 어딘가에서 Git 저장소를 Clone 하는 방법

<br>

### 기존 디렉토리를 Git 저장소로 만들기
Git 저장소로 만들고 싶은 디렉토리로 이동 후, 아래 명령을 실행한다.
```sh
❯ git init
```
이 명령은 .git 디렉토리를 생성한다. .git 디렉토리에 저장소에 필요한 뼈대 파일(Skeleton)이 있다. 이 명령만으로는 `아직 프로젝트의 어떤 파일도 관리하지 않는다.`

Git이 파일을 관리하게 하려면 저장소에 파일을 추가하고 커밋해야 한다. git add 명령으로 파일을 추가하고 git commit 명령으로 커밋한다.
```sh
❯ git add practice.txt
❯ git commit -m "First commit

Git 연습용 커밋입니다.
"
```
위에서 commit 뒤에 -m은 커밋 메시지를 작성한다는 의미이다. 이 옵션을 제외하고 commit 명령만 입력하면 vim에디터가 열리고 커밋 메시지를 작성할 수 있다.  

커밋 메시지를 간략하게 요약한 제목과 자세하게 설명한 본문을 나눠서 작성하는 것이 좋다.

<br>

### 기존 저장소를 Clone 하기
다른 프로젝트에 참여하려하거나(Contribute) Git 저장소를 복사하고 싶을 때 git clone 명령을 사용한다. git clone을 하면 프로젝트 히스토리를 전부 받아온다. 실제로 서버의 디스크가 망가져도 클라이언트 저장소 중에서 아무거나 하나 가져다 복구하면 된다.(서버에만 적용했던 설저은 복구하지 못하지만 모든 데이터는 복구된다.)

git clone <url> 명령으로 저장소를 clone 한다.
```sh
❯ git clone https://github.com/libgit2/libgit2
```
위 명령은 "libgit2"라는 디렉토리를 만들고 그 안에 .git 디렉토리를 만든다. 그 후 `저장소의 데이터를 모두 가져와서 자동으로 가장 최신버전을 Checkout` 해 놓는다.
libgit2 디렉토리로 이동하면 Checkout으로 생성한 파일을 볼 수 있고 당장 하고자 하는 일을 시작할 수 있다.

`체크 아웃 (Checkout)` : 작업자의 작업트리를 저장소의 특정 시점과 일치 하도록 변경하는 작업([출처 링크](https://kimseunghyun76.tistory.com/116))

작업할 디렉토리 이름을 수정해서 만드려면 아래 같이 명령을 작성한다. libgit2가 아닌 mylibgit이라는 이름의 디렉토리에 저장소가 Clone 된다.
```sh
❯ git clone https://github.com/libgit2/libgit2 mylibgit
```

Git은 다양한 프로토콜을 지원한다.(자세한 내용은 서버에 Git 설치하기(Chap04)에서 다룬다.)
- https://
- git://
- SSH
---
<br>

## 2.2 수정하고 저장소에 저장하기

### 수정하고 저장소에 저장하기

Git 저장소를 만들었으니 파일을 수정하고 파일의 `스냅샷`을 커밋해보자! 파일을 수정하다가 저장하고 싶으면 스냅샷을 커밋한다.

`스냅샷` : Git은 변화된 파일을 통째로 저장하고 이를 스냅샷이라고 한다.

워킹 디렉토리의 모든 파일은 크게 Tracked(관리대상임)와 Untracked(관리대상 아님)로 나눈다. Tracked 파일은 이미 스냅샷에 포함돼 있던 파일이다. Tracked 파일은 또 Unmodified(수정하지 않음)과 Modified(수정함) 그리고 Staged(커밋으로 저장소에 기록할) 상태 중 하나이다. 간단히 말하자면 Git이 알고 있는 파일이라는 의미이다.

나머지 파일은 모두 Untracked 파일이다. Untracked 파일은 워킹 디렉토리에 있는 파일 중 스냅샷에도 Staging Area에도 포함되지 않은 파일이다. 처음 저장소를 Clone 하면 모든 파일은 Tracked이면서 Unmodified 상태이다. 파일을 Checkout하고나서 아무것도 수정하지 않았기 때문이다.

마지막 커밋 이후 아무것도 수정하지 않은 상태에서 어떤 파일을 수정하면 Git은 그 파일을 Modified 상태로 인식한다. 실제로 커밋을 하기 위해서는 이 수정한 파일을 Staged 상태로 만들고, Staged 상태의 파일을 커밋한다.

아래는 Git 버전관리 라이프 사이클이다.
![Git 버전관리 라이프 사이클](https://git-scm.com/book/en/v2/images/lifecycle.png)

<br>

### 파일의 상태 확인하기

`git status` 명령으로 파일의 상태를 확인한다. `git init`이나 `git clone`으로 저장소를 만든 직 후 파일 상태를 확인해보면 아래와 같은 메시지를 볼 수 있다.
```sh
❯ git status
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
```
맨 마지막을 보면 커밋 할 것이 없고, 워킹 디렉토리가 깨끗(clean)하다고 나온다. 이는 파일을 하나도 수정하지 않았다는 것을 말해준다. Tracked 파일은 하나도 수정되지 않았다는 의미이다. Untracked 파일은 아직 없기 때문에 목록에 나타나지 않는다. 그리고 현재 작업중인 브랜치를 알려주며(On branch master) 서버의 같은 브랜치로부터 진행된 작업이 없는 것을 나타낸다. master가 기본 브랜치 이다.

새롭게 파일을 만들어보고 git status를 실행하면 새롭게 만든 파일이 `Untracked files`에 들어있다.
```sh
❯ echo "My new project" > README    
❯ git status                                                                                      GitPrac
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        README

nothing added to commit but untracked files present (use "git add" to track)
```
README 파일은 `Untracked files`부분에 속해있는데 이것은 README 파일이 Untracked 상태라는 것을 말한다. Git은 Untracked 파일을 아직 스냅샷(커밋)에 넣어지지 않은 파일이라고 본다. 파일이 Tracked 상태가 되기 전까지 Git은 절대 그 파일을 커밋하지 않는다. 그래서 일하면서 생성하는 바이너리 파일 같은 것을 커밋하는 실수는 하지 않게 된다. README 파일을 추가해서 직접 Tracked 상태로 만들자.

<br>

### 파일을 새로 추적하기

git add 명령으로 파일을 새로 추적할 수 있다. 아래 명령을 실행하면 Git은 README 파일을 추적한다.
```sh
❯ git add README
```
git status 명령을 다시 실행하면 README 파일이 Tracked 상태이면서 커밋에 추가 될 Staged 상태라는 것을 확인할 수 있다.
```sh
❯ git status                                                                                      GitPrac
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   README
```
`Changed to be committed`에 들어있는 파일은 Staged 상태라는 것을 의미한다. 커밋하면 git add를 실행한 시점의 파일이 커밋되어 저장소 히스토리에 남는다. git add 명령은 파일 또는 디렉토리의 경로를 argument로 받는다. 디렉토리면 아래에 있는 모든 파일들까지 재귀적으로 추가한다.

<br>

### Modified 상태의 파일을 Stage 하기

이미 Tracked 상태인 파일을 수정하는 법을 알아보자. CONTRIBUTING.md라는 파일을 수정하고 나서 git status 명령을 실행하면 결과는 아래와 같다.
```sh
❯ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    new file:   README

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   CONTRIBUTING.md
```
CONTRIBUTING.md 파일은 `Changes not staged for commit`에 있다. 이는 수정한 파일이 Tracked 상태이지만 아직 Staged 상태는 아니라는 것이다. Staged 상태로 만드려면 git add 명령을 실행해야 한다. git add 명령은 파일을 새로 추적할 때와 수정한 파일을 Staged 상태로 만들 때 사용한다. Merge 할 때 충돌난 상태의 파일을 Resolve 상태로 만들 때도 사용한다. 

`Resolve` : ?

add의 의미는 프로젝트에 파일을 추가한다기 보다는 **다음 커밋에 추가한다고 받아들이는 것이 좋다.** git add 명령을 실행하여 CONTRIBUTING.md 파일을 Staged 상태로 만들고 git status 명령으로 결과를 확인해보면 다음과 같다.
```sh
❯ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    new file:   README
    modified:   CONTRIBUTING.md
```
두 파일 모두 Staged 상태이므로 다음 커밋에 포함된다. 더 수정할 사항이 남았다는 가정하에 CONTRIBUTING.md 파일을 열고 수정한다. 그 뒤 git status 명령을 입력해 파일의 상태를 확인해본 결과는 아래와 같다.
```sh
❯ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    new file:   README
    modified:   CONTRIBUTING.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   CONTRIBUTING.md
```
CONTRIBUTING.md가 Staged 상태이며 동시에 Unstaged 상태로 나온다. git add 명령을 실행하면 Git은 파일을 바로 Staged 상태로 만든다. 지금 이 시점에서 커밋을 하면 git commit 명령을 실행하는 시점의 버전이 커밋되는 것이 아니라, 마지막으로 git add 명령을 실행했을 때 버전이 커밋된다. 그러므로 git add 명령을 실행한 후 파일을 다시 수정하면 git add 명령을 다시 실행해 최신 버전을 Staged 상태로 만들어야 한다.
```sh
❯ git add CONTRIBUTING.md
❯ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    new file:   README
    modified:   CONTRIBUTING.md
```

<br>

### 파일 상태 짤막하게 확인하기

git status 명령으로 확인할 수 있는 내용이 많다. 간단하게 볼 수 있는 옵션이 있다.  
`git status -s` 또는 `git status --short`처럼 옵션을 주면 현재 변경한 상태를 짤막하게 보여준다.
```sh
❯ git status -s
 M README
MM Rakefile
A  lib/git.rb
M  lib/simplegit.rb
?? LICENSE.txt
```
파일명 앞에 `??`나 `M`같은 표시가 붙어있다. 의미는 다음과 같다.  
- `??` : 아직 추적하지 않는 새 파일(Untracked)
- `A` : Staged 상태로 추가한 파일 중 새로 생성한 파일
- `M` : 수정한 파일
왼쪽은 Staging Area에서의 상태를, 오른쪽에는 Working tree에서의 상태를 표시한다.  
README 파일 같은 경우 내용을 변경했지만 아직 Staged 상태로 추가하지 않은 것이다.  
lib/simplegit.rb 파일은 내용을 변경하고 Staged 상태로 추가까지 한 상태이다.  
Rakefile은 변경하고 Staged 상태로 추가한 후 또 내용을 변경해서 Staged 이면서 Unstaged 상태인 파일이다.

<br>

### 파일 무시하기

어떤 파일은 Git이 관리할 필요가 없다.(e.g. 로그 파일, 빌드 시스템이 자동으로 생성한 파일 등등..) 그런 파일을 무시혀려면 .gitignore 파일을 만들고 그 안에 무시할 파일 패턴을 적는다. 아래는 .gitignore 파일의 예시이다.
```sh
$ cat .gitignore
*.[oa]
*~
```

- line 1 : 확장자가 .o 이거나 .a인 파일을 무시. 각각 빌드 시스템이 만들어내는 오브젝트와 아카이브 파일이다.  
- line 2 : ~로 끝나는 모든 파일 무시. 보통 대부분의 텍스트 편집기에서 임시파일로 사용하는 파일 이름이다.

.gitignore 파일은 보통 처음에 만들어두는 것이 편리하다. 그래야 Git 저장소에 커밋하고 싶지 않은 파일을 실수로 커밋하는 일을 방지할 수 있다.

#### .gitignore 파일에 입력하는 패턴 규칙
- 아무것도 없는 라인이나 `#`으로 시작하는 라인은 무시한다.
- 표준 Glob 패턴을 사용한다. 이는 프로젝트 전체에 적용된다.
`표준 Glob 패턴` : 정규표현식을 단순하게 만든 것. 보통 쉘에서 많이 사용한다.
- 슬래시(/)로 시작하면 하위 디렉토리에 적용되지(Recursivity) 않는다.
- 디렉토리는 슬래시(/)를 끝에 사용하는 것으로 표현한다.
- 느낌표(!)로 시작하는 패턴의 파일은 무시하지 않는다.

애스터리스크(*)는 문자가 하나도 없거나 하나 이상을 의미하고, [abc]는 중괄호 안에 있는 문자 중 하나를 의미한다.(a,b,c) 물음표(?)는 문자 하나를 말하고, [0-9] 처럼 중괄호 안의 캐릭터 사이에 하이픈(-)을 사용하면 그 캐릭터 사이에 있는 문자 하나를 말한다. 애스터리스크를 2개 사용하여 디렉토리 안의 디렉토리까지 지정할 수 있다. a/**/z 패턴은 a/z, a/b/z, a/b/c/z 디렉토리에 사용할 수 있다.

아래는 .gitignore 파일의 예시이다.
```sh
# 확장자가 .a인 파일 무시
*.a

# 윗 라인에서 확장자가 .a인 파일은 무시하게 했지만 lib.a는 무시하지 않음
!lib.a

# 현재 디렉토리에 있는 TODO파일은 무시하고 subdir/TODO처럼 하위디렉토리에 있는 파일은 무시하지 않음
/TODO

# build/ 디렉토리에 있는 모든 파일은 무시
build/

# doc/notes.txt 파일은 무시하고 doc/server/arch.txt 파일은 무시하지 않음
doc/*.txt

# doc 디렉토리 아래의 모든 .pdf 파일을 무시
doc/**/*.pdf
```
.gitignore를 사용하는 간단한 방식은 하나의 .gitignore 파일을 최상위 디렉토리에 하나 두고 모든 하위 디렉토리까지 적용시키는 방식. (하위 디렉토리에 따로 생성또한 가능)

<br>

### Staged와 Unstaged 상태의 변경 내용을 보기

파일의 어떤 내용이 변경됐는지 보려면 `git diff` 명령을 사용해야 한다. git diff는 Patch처럼 어떤 라인을 추가했고 삭제했는지가 궁금할 때 사용한다.

README 파일은 수정 후 add로 Staged 상태로 만들고, CONTRIBUTING.md 파일은 수정만 한다. 이 상태에서 git status를 실행하면 아래와 같은 메시지가 출력된다.
```sh
❯ git status                                                                                      GitPrac
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   README

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   CONTRIBUTING.md
```
git diff 명령을 실행하면 수정했지만 아직 staged 상태가 아닌 파일을 비교해볼 수 있다.
```sh
diff --git a/CONTRIBUTING.md b/CONTRIBUTING.md
index 97453a4..9e47ab7 100644
--- a/CONTRIBUTING.md
+++ b/CONTRIBUTING.md
@@ -2,3 +2,4 @@ contributing
 edit 1
 edit 2
 edit 3
+edit
```
이 명령은 워킹 디렉토리에 있는 것과 Staging Area에 있는 것을 비교한다. 그래서 수정하고 아직 Stage하지 않은 것을 보여준다.

만약 커밋하려고 Staging Area에 넣은 파일의 변경 부분을 보려면 `git diff --staged` 옵션을 사용한다. 이 명령은 저장소에 커밋한 것과 Staging Area에 있는 것을 비교한다.
```sh
diff --git a/README b/README
index c669690..b11e3f3 100644
--- a/README
+++ b/README
@@ -1 +1,2 @@
 My new project
+edit
```
- `잊지 말 것` : git diff 명령은 마지막으로 커밋한 후에 수정한 것들 전부를 보여주지 않는다. git diff는 Unstaged 상태인 것들만 보여준다. 수정한 파일을 모두 Staging Area에 넣었다면 git diff 명령은 아무것도 출력하지 않는다.

CONTRIBUTING.md 파일을 Stage 한 후에 다시 수정해도 git diff 명령을 사용할 수 있다. 이 때는 Staged 상태인 것과 Unstaged 상태인 것을 비교한다.
```sh
diff --git a/CONTRIBUTING.md b/CONTRIBUTING.md
index 9e47ab7..4796fcb 100644
--- a/CONTRIBUTING.md
+++ b/CONTRIBUTING.md
@@ -3,3 +3,4 @@ edit 1
 edit 2
 edit 3
 edit
+# test line
```
Staged 상태인 파일은 git diff --cached 옵션으로 확인한다. --staged와 --cached는 같은 옵션이다.
```sh
diff --git a/CONTRIBUTING.md b/CONTRIBUTING.md
index 97453a4..9e47ab7 100644
--- a/CONTRIBUTING.md
+++ b/CONTRIBUTING.md
@@ -2,3 +2,4 @@ contributing
 edit 1
 edit 2
 edit 3
+edit
diff --git a/README b/README
index c669690..b11e3f3 100644
--- a/README
+++ b/README
@@ -1 +1,2 @@
 My new project
+edit
```

<br>

### 변경사항 커밋하기

<br>

### Staging Area 생략하기

<br>

### 파일 삭제하기

<br>

### 파일 이름 변경하기


`참고`  
- [Github .gitignore 예제](https://github.com/github/gitignore)
- [gitignore.io](https://www.gitignore.io/) : 운영체제, 개발환경, 프로그래밍 언어에 따른 gitignore 파일 내용을 자동으로 생성해주는 사이트

---
<br>


## 2.3 커밋 히스토리 조회하기
---
<br>

## 2.4 되돌리기
---
<br>

## 2.5 리모트 저장소
---
<br>

## 2.6 태그
---
<br>

## 2.7 Git Alias
---
<br>

## 2.8 요약
