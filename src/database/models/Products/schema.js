const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(50),
        },
        description: {
            type: Sequelize.STRING(100),
        },
        isActive: {
            type: Sequelize.TINYINT(1),
            defaultValue: 1
        },
        createdBy: {
            type: Sequelize.STRING(20),
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedBy: {
            type: Sequelize.STRING(20),
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    };
};