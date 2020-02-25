const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'employee_roles';
const modelName = 'employee_roles';
var _ = require('lodash');
module.exports = class EmployeeRoles extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize,
            timestamps: false
        });
    }
};
