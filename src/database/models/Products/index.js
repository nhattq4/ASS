const Sequelize = require('./node_modules/sequelize');
const schema = require('./schema');
const tableName = 'products';
const modelName = 'products';
var _ = require('./node_modules/lodash');
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