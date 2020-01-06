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
        roleId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        }
    };
};
