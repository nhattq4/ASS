const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'Products';
const modelName = 'Products';
var _= require('lodash');
module.exports = class Roles extends Sequelize.Model{
    static init(sequelize){
        return super.init(schema(),{
            tableName,
            modelName,
            sequelize,
            timestamps : false
        });
    }
    static associate(models) {
        this.belongsTo(models.parentProducts, {foreignKey: 'id', targetKey: 'parentProductsID'});
    }
};