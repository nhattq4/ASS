const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING(250),
            primaryKey: true,
        },
        customerId: {
            type: Sequelize.INTEGER(50),
            allowNull: false
        },
        customerName: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        customerAddress: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        customerEmail: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        customerPhone: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        customerNote: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        status: {
            type: Sequelize.INTEGER(1),
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    };
};
