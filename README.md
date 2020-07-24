# Node.js란?
  Node.js는 확장성 있는 네트워크 애플리케이션(특히 서버 사이드) 개발에 사용되는 소프트웨어 플랫폼이다. 작성 언어로 자바스크립트를 활용하며 Non-blocking I/O와 단일 스레드 이벤트 루프를 통한 높은 처리 성능을 가지고 있다. 내장 HTTP 서버 라이브러리를 포함하고 있어 웹 서버에서 아파치 등의 별도의 소프트웨어 없이 동작하는 것이 가능하며 이를 통해 웹 서버의 동작에 있어 더 많은 통제를 가능케 한다.

* Node.js 특징
    - 브라우저 밖에서 자바스크립트 코드를 실행할 수 있다.
    - 크롬에서 사용하는 V8 엔진을 사용한다.(자바스크립트 코드를 해석해주는 해석기)
    - 이벤트 기반의 비동기 I/O 프레임워크이다. 
    - CommonJS를 구현한 모듈 시스템이 있다. 
        
* 이벤트 기반의 비동기 I/O 프레임워크(Node.JS Processing Model) <br><br>
    **이벤트 기반**
    - 클라이언트쪽에서 서버쪽으로 요청을 보내면 Event 객체로 만들어서 Event Queue에다가 차곡차곡 쌓는다. 
    - Event Loop는 Event Queue에 있는 Event 객체 하나를 가져와 작업을 한다. <br>
      (Event Loop는 Single Thread로 이루어져 있다.)
    - 작업이 완료되면 클라이언트쪽에 응답을 해준다. 

    **비동기 I/O**
    - Event Loop가 클라이언트 쪽에 바로 응답을 해줄 수 있는 Event의 경우에는 문제가 없다.
    - 하지만, 바로 응답할 수 없고 많은 시간이 걸리는 Event의 경우에는 문제가 발생한다. <br>
      (예를 들어, 디스크에 있는 파일을 읽는 Event, 외부 네트워크 통신을 해야하는 Event)
    - 따라서, 이런 것들은 Event Loop에서 처리하지 않고 Non-blocking Worker에서 처리한다. <br>
      (다른 쓰레드에게 Event를 위임한다.)
    - Non-blocking Worker에서 처리한 결과 Event를 다시 Event Queue에 다시 넘겨주고 <br> 
      Event Loop는 Queue에 있는 Event를 실행을 한다. 실행이 완료되면 다시 클라리언트에게 응답

<br>

# Contents of Node.js
1. 모듈 시스템
    - 브라우저에서는 윈도우 컨텍스트를 사용하거나, RequireJS같은 의존성 로더를 사용한다. <br>
      (window 전역 객체를 사용하기, http가 내장되어 있는 Node에서 모듈을 불러오기 위한 require 함수 등)
    - 노드는 파일형태로 모듈을 관리할 수 있는 CommonJS로 구현 <br>
      (웹 브라우저는 파일 접근을 할 수 없다. 하지만, Node.js는 서버에서 돌아가기 때문에 파일에 접근할 수 있다. ) 
        * 기본 모듈
        * 써드 파티 모듈(프로그래밍을 도와주는 Plug_in이나 library 등을 만드는 제 3자 회사)
        * 사용자 정의 모듈 
2. 비동기 
    - Node는 기본적으로 비동기로 동작함
    - readFile() vs readFileSync()
    - 비동기적인가 동기적인가의 차이
    - 비동기적으로 실행하게 되면 파일을 읽을 때까지 기다리진 않고 그 다음 명령줄로 넘어감 
    - 파일을 다 읽었다라고 Event가 발생하면 그제서야 콜백함수가 실행됨

<br>

# Express.js는 왜 필요할까? 

* 기존(프레임워크 사용 전)
  - http의 createServer 메서드 안에 모든 API를 분기문으로 처리해야하므로 비효율적이다. 
  - 분기문들은 길어질 것이고 파일의 크기는 커지며 중복되는 코드들이 많아질 것이다. <br><br>
* Express.js
  - node.js로 만들어진 웹 프레임워크 
  - 설치: npm install express 
  <br><br>
* Express.js에서 제공하는 기능들 <br>
  1. __어플리케이션__
      - Express 인스턴스를 어플리케이션이라한다. 
      - 서버에 필요한 기능인 미들웨어를 어플리케이션에 추가한다.
      - 라우팅 설정을 할 수 있다.
      - 서버를 요청 대기 상태로 만들 수 있다. 

  2. **미들웨어**(Express.js에 기능을 추가하고 싶을 때마다 기능을 추가)
      - 미들웨어는 함수들의 연속이다. 
      - 종류: 로깅 미들웨어, 써드파티 미들웨어, 일반 미들웨어, 에러(404, 500 등) 미들웨어
      - 미들웨어는 파라미터로 req, res, next를 가져야 한다.
      - next()는 다음 로직을 수행할 수 있도록 해주는 것이다.
        (선언하지 않으면 다음 미들웨어를 실행하지 않음)
      - 사용법: app.use(함수명)을 선언한다. 
      - 예) 
      
      ```
        function logger(req, res, next) {
        console.log('logger');
        next();
        }

        app.use(logger)
      ```

  3. **라우팅**
      - 요청 url에 대해 적절한 핸들러 함수로 연결해 주는 기능이다. 
      - 어플리케이션의 get(), post() 메소드로 구현할 수 있다. 
      - 라우팅을 위한 전용 Router 클래스를 사용할 수도 있다. 

  4. **요청객체**
      - 클라이언트 요청 정보를 담은 객체를 요청(Request)객체라고 한다. 
      - http 모듈의 request 객체를 래핑한 것이다. 
      - req.params(), req.query(), req.body() 메소드를 주로 사용한다.

  5. **응답객체**
      - 클라이언트 응답 정보를 담은 객체를 응답(Response)객체라고 한다. 
      - http 모듈의 response 객체를 래핑한 것이다. 
      - res.send(), res.status(), res.json() 메소드를 주로 사용힌디.

<br>

# NPM이란?
  - Node Packaged Manager의 약자로 Node.js로 만들어진 pakage(module)을 관리해주는 툴이다.
  - 쉽게 말해, Node.js로 만들어진 모듈을 웹에서 받아 설치하고 관리해주는 프로그램이다. 
  - 게다가, 이 모듈들을 활용했다면 이후에 그 모듈을 만든 개발자가 업데이트를 할 경우 체크를 해서 알려준다. <br> 
    (즉, 버전관리가 쉬워진다.)

  
* npm init
  - 모듈의 의존성을 한꺼번에 관리하는 방법 ==> json 파일을 만들어 그 안에 기록을 통해 관리 <br>
    (package.json 생성)
    - "script" : run 명령어를 통해서 실행할 것들을 적어두는 것
    - "dependencies" : 설치할 모듈을 의미

* npm install
  - package.json 파일이 정리되면 배포를 해야 할 때 node_modules 폴더에 담긴 파일들은 같이 배포되지 않는다. 이 때, 배포할 때 해당 프로그램 개발에 사용되었던 모듈을 그래도 install 할 수 있다. 

* npm run build
  - webpack을 통해서 bundling을 하기 위한 webpack.config.js를 실행시키기 

<br>

# REST API란?
  REST란 "Representational State Transfer"라는 용어의 약자로 웹(HTTP) 설계의 우수성에 비해 제대로 사용되어지지 못하는 모습에 안타까워하며 HTTP기반으로 필요한 자원에 접근하는 방식(url 형식)을 정해놓아 웹의 장점을 최대한 활용할 수 있는 아키텍처이다. 

  여기서의 자원은 저장된 데이터(DBMS)는 물론, 이미지/동영상/문서와 같은 파일, 서비스(이메일 전송, 푸쉬 메시지 등)를 모두 포함한다.
  
  * **요청 형식**
    - HTTP 메서드 : 서버 자원에 대한 행동을 나타낸다. (동사로 표현)
      1. GET: 자원을 조회
      2. POST: 자원을 생성
      3. PUT: 자원을 갱신
      4. DELETE: 자원을 삭제

    - 이는 Express 어플리케이션의 메소드로 구현되어 있다. <br>

  * **응답 형식**
    - HTTP 상태코드
      1. 2XX 
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp; 200: 성공(success), GET, PUT
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp; 201: 작성됨(created), POST
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp; 204: 내용 없음(No Content), DELETE 
      <br><br>

      2. 4XX (클라이언트, 상대방의 문제)
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp; 400: 잘못된 요청(Bad Request)
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp; 401: 권한 없음(Unauthorized)
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp; 404: 잘못된 요청(Not found)
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp; 409: 잘못된 요청(Conflict) <br>
      <br><br>

      3. 5XX (서버, 나의 문제)
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp; 500: 서버 에러(Interel server error)


<br>


# 테스트 주도 개발(TDD)이란?
  - Test Driven Development : 테스트가 개발을 이끌어 나간다. 
  - 개발을 할 때 바로 소스코드를 작성하지 않고 테스트 코드를 먼저 작성하는 것
  - 테스트 코드를 먼저 만든 다음에 테스트를 하나하나 통과해 나가면서 코드를 만드는 개발 방법
  - TDD를 사용하면 개발 기간이 오래걸리긴 함, 하지만 유지보수 기간이 줄어드는 효과를 가짐 
  - mocha, should, superTest

  1. mocha
    - https://mochajs.org

    - 모카는 테스트 코드를 돌려주는 테스트 러너
    - 테스트 수트: 테스트 환경으로 모카에서는 describe()으로 구현한다.
    - 테스트 케이스: 실제 테스트를 말하며 모카에서는 it()으로 구현한다. 

    - 보통 파일 이름에 spec.js가 있으면 테스트 코드라고 보면 됨

    - 설치: npm install mocha --save-dev
      (개발환경으로 설치, package.json의 devDependencies에 생김)

    - 확인: node_modules/.bin/mocha [파일명]
      예) node_modules/.bin/mocha utils.spec.js

      describe('utils.js모듈의 capitaliza() 함수는', () => {
        it('문자열의 첫번째 문자를 대문자로 변환한다', () => {
          const result = utils.cap('hello');
          assert.equal(result, 'Hello');
        })
      })

    - assert 메서드는 유닛 테스트를 위해서 Node.js에서 사용할 수 있는 테스트 모듈이다. 

<br>

  2. should
    - https://shouldjs.github.io
    - https://github.com/tj/should.js

    - "노드 assert 말고 서드파티 라이브러리를 사용하라"
    - 슈드(should)는 검증 라이브러리이다.
    - 가독성 높은 테스트 코드를 만들 수 있다. 

<br>

  3. superTest
    - 단위 테스트: 함수의 기능 테스트 ==> mocha와 should
    - 통합 테스트: API의 기능 테스트
    - 슈퍼 테스트는 Express용 통합 테스트 라이브러리이다. 

    - 설치: npm install superset
    - 확인: node_modules/.bin/mocha [파일명]
        (express 앱 자체를 export ==> module.exports = app;)


<br>

# API 테스트 코드 만들기 
  - 


# 데이터베이스

1. SQL
  - 테이블 형식의 데이터베이스
  - MySQL, PostgreSQL, Aurora, Sqlite(파일 형태)
2. NoSQL
  - Document 형식의 데이터베이스(JSON)
  - MongoDB, DynamoDB
3. In Memory DB
  - Redis, Memcashed

# ORM
  - Object Relational Mapping
  - 데이터베이스를 객체로 추상화해 놓은 것
  - 쿼리를 직접 작성하는 대신 ORM 메소드로 데이터를 관리할 수 있는 것이 장점
  - 노드에서 SQL ORM은 시퀄라이저(Sequelize)가 있다. 

# 시퀄라이저
  - https://sequelize.org/master/

  - 모델: 데이터베이스 테이블을 ORM으로 추상화한 것을 모델이라고 한다.
  - sequelize.define(): 모델 정의
  - sequelize.sync(): 데이터베이스 연동 

  - 



  - 비교 
   예) 

  1. 
  SQL문: insert users ('name') values ('alice'); <br>
  시퀄라이저: USer.create({name: 'alice'})

  2. 
  SQL문: select * from users; <br>
  시퀄라이저: User.findAll();

  3. 
  SQL문: update users set name = 'bek' where id=1; <br>
  시퀄라이저: User.update({name: 'bek'}, {where: {id:1}});

  4. 
  SQL문: delete from users where id = 1;  <br>
  시퀄라이저: User.destroy({where: {id:1}});