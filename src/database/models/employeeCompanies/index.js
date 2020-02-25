const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'employee_companies';
const modelName = 'employee_companies';
var _ = require('lodash');
module.exports = class EmployeeCompanies extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize,
            timestamps: false
        });
    }

    static associate(models) { }

    static get(where) {
        return this.findOne({
            where
        });
    }

    static getByEmployeeId(where, attributes) {
        return this.findAll({
            where,
            attributes
        });
    }
};
