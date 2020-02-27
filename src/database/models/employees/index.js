const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'employees';
const modelName = 'employees';
var _ = require('lodash');
module.exports = class Employees extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.Companies, { foreignKey: 'companyId', targetKey: 'id' });

        this.belongsToMany(models.Roles, {
            through: models.EmployeeRoles,
            as: 'roles',
            foreignKey: 'employeeId'
        });
    }

    static get(where) {
        return this.findOne({
            where
        });
    }

    static async updateEmployee(data, where, transaction) {
        return await this.update(data, {
            where,
            transaction
        }).then(() => {
            return this.get({ ...where, ...data });
        });
    }

    static getEmployees(pagination, order, where, attributes) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order,
            attributes
        });
    }
};
