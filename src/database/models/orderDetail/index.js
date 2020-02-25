const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'orderDetail';
const modelName = 'orderDetail';
var _ = require('lodash');
module.exports = class OrderDetail extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize,
            timestamps: false
        });
    }
};
