const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'user_parent_companies';
const modelName = 'user_parent_companies';
var _ = require('lodash');
module.exports = class UserParentCompanies extends Sequelize.Model {
    static init(sequelize) {
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
