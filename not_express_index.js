const http = require('http');

// hostName은 내 컴퓨터 주소를 할당 
const hostName = '127.0.0.1';
const port = 3000;

// arrow function(ES6 문법)
const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plane');
        res.end('Hello World\n');        
    } else if (req.url === '/users') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plane');
        res.end('User list\n');  
    } else {
        res.statusCode = 404;
        res.end('Not Found\n');
    }

});


/*
서버를 요청 대기 상태로 만들어주는 함수
(서버가 클라이언트의 요청을 받기 위해 종료하지 않고 대기하고 있는 상태)

템플릿 문자열
*/
server.listen(port, hostName, () => {
    console.log(`server running at http://${hostName}:${port}/`);
});



/* 

1. node index.js
2. curl -X GET 'localhost:3000'
               '127.0.0.1:3000'
(주소창에 입력하는 것이랑 똑같음)

3. 2번의 부가적인 옵션을 확인을 하고 싶으면 뒤에 -v를 붙인다. 

*/