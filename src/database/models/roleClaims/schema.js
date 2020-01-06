const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        roleId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        claimId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        }
    };
};
