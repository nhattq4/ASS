const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'user_roles';
const modelName = 'user_roles';
var _ = require('lodash');
module.exports = class UserRoles extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize,
            timestamps: false
        });
    }
};
