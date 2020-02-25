const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING(250),
            primaryKey: true,
        },
        code: {
            type: Sequelize.STRING(255),
        },
        name: {
            type: Sequelize.STRING(255)
        },
        sortOrder: {
            type: Sequelize.INTEGER(255)
        },
        backendType: {
            type: Sequelize.STRING(50)
        },
        isActive: {
            type: Sequelize.TINYINT(1),
            defaultValue: 1
        },
    };
};
