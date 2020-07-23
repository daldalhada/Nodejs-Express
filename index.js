var express = require('express');
var app = express();
var morgan = require('morgan');

var users = [
    {
        id: 1, 
        name: 'alice',
    },
    {
        id: 2, 
        name: 'bek',
    },
    {
        id: 3, 
        name: 'chris',
    },
]

app.use(morgan('dev'));

app.get('/users', function(req, res){
    // const limit = req.query.limit;   // "2"(들어오는 값이 문자열임)
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10); // 10진법
    if (Number.isNaN(limit)){
        return res.status(400).end()    // 기본으로는 200이 설정임
    }
    res.json(users.slice(0, limit));
})

app.listen(3000, function(){
    console.log('server running(3000port)')
});


module.exports = app;