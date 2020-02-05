const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'parentProducts';
const modelName = 'parentProducts';
var _ = require('lodash');
module.exports = class ParentProducts extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize,
            timestamps: false
        });
    }
    static associate(models) {
        // this.hasMany(models.products, { foreignKey: 'id', sourceKey: 'parentProductdId' });
    }

    static get(where) {
        return this.findOne({
            where
        });
    }
};