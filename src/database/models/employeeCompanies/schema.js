const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING(250),
            primaryKey: true,
        },
        employeeId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        parentCompanyId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        companyId: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            unique: true
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
        isDelete: {
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
