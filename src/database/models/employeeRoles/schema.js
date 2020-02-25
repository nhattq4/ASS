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
        roleId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        }
    };
};
