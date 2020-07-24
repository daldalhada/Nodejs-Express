const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false   // 지저분한 로그 안찍히게 
});

const User = sequelize.define('User', {    //id는 자동으로 생성해줌
    name: {
        type: Sequelize.STRING, // varhcer(255)
        unique: true
    }
});

module.exports = {Sequelize, sequelize, User}