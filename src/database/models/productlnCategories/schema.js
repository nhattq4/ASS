const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING(250),
            primaryKey: true,
        },
        productId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        categoryId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
    };
};
