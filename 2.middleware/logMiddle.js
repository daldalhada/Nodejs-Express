const express = require('./node_modules/express');
const morgan = require('./node_modules/morgan');
const app = express();

// 로그를 찍는 기능을 하는 미들웨어
function logger(req, res, next){
    console.log('i am logger');
    next();
    // next()를 쓰지 않으면 logger2 미들웨어는 호출되지 않음
}

function logger2(req, res, next){
    console.log('i am logger2');
    next();
}

app.use(logger);
app.use(logger2);

// 써드 파티 미들웨어
app.use(morgan('dev'));


app.listen(3000, function(){
    console.log('Server is running');
})