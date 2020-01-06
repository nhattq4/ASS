const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        parentCompanyId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        parentCompanyName: {
            type: Sequelize.STRING(100)
        },
        companyId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            unique: true
        },
        companyName: {
            type: Sequelize.STRING(100)
        },
        isDefaultCompany: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        isDefaultLoginCompany: {
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
