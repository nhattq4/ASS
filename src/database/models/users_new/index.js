const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'users_new';
const modelName = 'users_new';
var _ = require('lodash');
module.exports = class Roles extends Sequelize.Model{
    static init(sequelize){
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize,
            timestamps: false
        });
    }
    static associate(models) {}

    static get(where) {
        return this.findOne({
            where
        });
    }

    static getByUserId(where, attributes) {
        return this.findAll({
            where,
            attributes
        });
    }
};
