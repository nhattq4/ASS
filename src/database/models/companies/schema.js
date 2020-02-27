const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING(250),
            primaryKey: true,
        },
        code: {
            type: Sequelize.STRING(15)
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
        addressId: {
            type: Sequelize.INTEGER(11),
        },
        officeTel1: {
            type: Sequelize.STRING(25)
        },
        officeTel2: {
            type: Sequelize.STRING(25)
        },
        email: {
            type: Sequelize.STRING(45)
        },
        isReactivate: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        inactiveDatetime: {
            type: Sequelize.DATE
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
