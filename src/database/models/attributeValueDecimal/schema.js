const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING(250),
            primaryKey: true,
        },
        attributeId: {
            type: Sequelize.STRING(250),
        },
        value: {
            type: Sequelize.FLOAT(11)
        },
        productId: {
            type: Sequelize.STRING(250)
        },
        languageId: {
            type: Sequelize.STRING(250),
            allowNull: false
        },
    };
};
