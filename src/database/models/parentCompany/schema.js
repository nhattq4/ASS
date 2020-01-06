const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING(100)
        },
        letterhead: {
            type: Sequelize.STRING(25)
        },
        imgPath: {
            type: Sequelize.STRING(150),
        },
        isDeleted: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        isActive: {
            type: Sequelize.TINYINT(1),
            defaultValue: 1
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