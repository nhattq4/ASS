const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'products';
const modelName = 'products';
var _ = require('lodash');
module.exports = class Products extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize,
            timestamps: false
        });
    }
    static associate(models) {
        this.belongsTo(models.ParentProducts, { foreignKey: 'parentProductId', targetKey: 'id' });
    }
};