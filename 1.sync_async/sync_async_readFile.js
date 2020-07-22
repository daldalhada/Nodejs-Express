const fs = require('fs');

// 동기적 방식
const data = fs.readFileSync('data.txt', 'utf8'); 

console.log(data);


// 비동기적 방식

fs.readFile('data.txt', 'utf8', function(err, data){
    console.log(data);
})