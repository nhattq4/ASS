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
        orderId: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT(11),
            allowNull: false
        },
        quantity: {
            type: Sequelize.FLOAT(11),
            allowNull: false
        }
    };
};
