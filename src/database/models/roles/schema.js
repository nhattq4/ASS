const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING(250),
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(50)
        },
        description: {
            type: Sequelize.STRING(100)
        },
        isActive: {
            type: Sequelize.TINYINT(1),
            defaultValue: 1
        },
        isDeleted: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        createdBy: {
            type: Sequelize.STRING(20)
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedBy: {
            type: Sequelize.STRING(20)
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    };
};
