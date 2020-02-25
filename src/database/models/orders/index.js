const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'orders';
const modelName = 'orders';
var _ = require('lodash');
module.exports = class Orders extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize
        });
    }

    static associate(models) {
        this.belongsToMany(models.Products, {
            through: models.OrderDetail,
            as: 'products',
            foreignKey: 'orderId'
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
