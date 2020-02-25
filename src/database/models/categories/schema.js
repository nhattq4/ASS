const Sequelize = require('sequelize');

module.exports = () => {
    return {
        id: {
            type: Sequelize.STRING(250),
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        seoAlias: {
            type: Sequelize.STRING(255)
        },
        seoTitle: {
            type: Sequelize.STRING(255)
        },
        seoKeyword: {
            type: Sequelize.STRING(255)
        },
        seoDescription: {
            type: Sequelize.STRING(255)
        },
        parentId: {
            type: Sequelize.INTEGER(250),
        },
        sortOrder: {
            type: Sequelize.INTEGER(250),
        },
        isActive: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    };
};
