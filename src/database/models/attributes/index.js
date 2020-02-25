const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'attributes';
const modelName = 'attributes';
var _ = require('lodash');
module.exports = class Attributes extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize
        });
    }
};
