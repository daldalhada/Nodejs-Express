// api 로직 

const models = require('../../models');

const index = function(req, res){
    // const limit = req.query.limit;   // "2"(들어오는 값이 문자열임)
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10); // 10진법
    if (Number.isNaN(limit)){
        return res.status(400).end()    // 기본으로는 200이 설정임
    }

    models.User
        .findAll({
            limit: limit
        })
        .then(users => {
            res.json(users);
        })

    //res.json(users.slice(0, limit));
}

const show = function(req, res){
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const user = users.filter((user) => {      // filter 메소드는 특정 조건에 해당하는 값을 새로운 어레이로 반환
        return user.id === id
    })[0];

    if(!user) return res.status(404).end();
    res.json(user);
}

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    users = users.filter(user => user.id !== id);
    res.status(204).end();
}

const create = (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).end();

    const isConfilc = users.filter(user => user.name === name).length
    if(isConfilc) return res.status(409).end();

    const id = Date.now();
    const user = {id, name};
    users.push(user);
    res.status(201).json(user);
}

const update = (req,res) => {
    const id = parseInt(req.params.id);
    if(Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if(!name) return res.status(400).end();
    
    const isConfilict = users.filter(user => user.name === name).length
    if(isConfilict) return res.status(409).end();

    const user = users.filter(user => user.id === id)[0];
    if(!user) return res.status(404).end();

    user.name = name;

    res.json(user);
}

module.exports = {
    index,
    show,
    destroy,
    create,
    update
};

