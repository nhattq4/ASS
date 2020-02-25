const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING(250),
            primaryKey: true,
        },
        employeeCode: {
            type: Sequelize.STRING(50)
        },
        password: {
            type: Sequelize.STRING(50)
        },
        fullName: {
            type: Sequelize.STRING(150)
        },
        email: {
            type: Sequelize.STRING(50)
        },
        contactNo: {
            type: Sequelize.STRING(50)
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
