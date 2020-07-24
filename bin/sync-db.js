const models = require('../models');

module.exports = () => {
    const options = {
        force: process.env.NODE_ENV == 'test' ? true : false
    }

    return models.sequelize.sync(options); // 기존에 있는 데이터베이스를 날리고 새로 만든다는 의미
}