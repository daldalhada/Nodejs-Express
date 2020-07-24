var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var user = require('./api/user/index');

if(process.env.NODE_ENV !== 'test'){  //로그 숨기기 
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', user)


// app.listen(3000, function(){
//     console.log('server running(3000port)')
// });


module.exports = app;