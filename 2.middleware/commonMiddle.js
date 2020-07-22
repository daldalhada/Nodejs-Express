const express = require('express');
const app = express();

// 일반 미들웨어
function commonmw(req, res, next) {
    console.log('commonmw');
    next(new Error('error ouccered'));
}

// 에러 미들웨어 - 전달받은 에러를 처리하거나 처리를 하지 못하면 다음 미들웨어에게 err를 넘겨줌
function errormw(err, req, res, next) {
    console.log(err.message);
    // next(err); 에러를 처리하지 못한 경우 
    next();
}

app.use(commonmw);
app.use(errormw);

app.listen(3000, function(){
    console.log('Server is running');
})