const app = require('../index');
const syncDb = require('./sync-db');

syncDb().then(_=> {           // _=>  인자를 사용하지 않겠다(빈괄호 ()와 같음)
    console.log('Sync database!');
    app.listen(3000, ()=> {
        console.log('Server is running on 3000 port');
    })
})
