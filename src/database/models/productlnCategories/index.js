const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'productlnCategories';
const modelName = 'productlnCategories';
var _ = require('lodash');
module.exports = class ProductlnCategories extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize,
            timestamps: false
        });
    }
};
