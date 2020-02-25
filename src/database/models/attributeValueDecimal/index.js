const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'attributeValueDecimal';
const modelName = 'attributeValueDecimal';
var _ = require('lodash');
module.exports = class AttributeValueDecimal extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.Products, { foreignKey: 'productId', targetKey: 'id' });
        this.belongsTo(models.Attributes, { foreignKey: 'attributeId', targetKey: 'id' });
    }
};
