const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'parentProducts';
const modelName = 'parentProducts';
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
        this.hasMany(models.Products, {foreignKey: 'id', sourceKey: 'parentProductsID'});
    }

    static get(where) {
        return this.findOne({
            where
        });
    }
};