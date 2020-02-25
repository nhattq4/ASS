const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING(250),
            primaryKey: true,
        },
        sku: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT(50),
            allowNull: false
        },
        discountPrice: {
            type: Sequelize.FLOAT(50)
        },
        imageUrl: {
            type: Sequelize.STRING(255)
        },
        imageList: {
            type: Sequelize.STRING(255)
        },
        viewCount: {
            type: Sequelize.BIGINT(50),
        },
        rateTotal: {
            type: Sequelize.INTEGER(50),
        },
        rateCount: {
            type: Sequelize.BIGINT(50),
        },
        isActive: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        createdBy: {
            type: Sequelize.STRING(20)
        },
        updatedBy: {
            type: Sequelize.STRING(20)
        },
    };
};
