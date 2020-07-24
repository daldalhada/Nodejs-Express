const models = require('../models');

module.exports = () => {
    return models.sequelize.sync({force: true}); // 새로 만든다는 의미
}