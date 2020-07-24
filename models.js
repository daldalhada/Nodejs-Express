const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
});

const User = sequelize.define('User', {    //id는 자동으로 생성해줌
    name: Sequelize.STRING // varhcer(255)
});

module.exports = {Sequelize, sequelize, User}