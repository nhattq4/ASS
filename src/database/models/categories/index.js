const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'categories';
const modelName = 'categories';
var _ = require('lodash');
module.exports = class Categories extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize
        });
    }

    static associate(models) {
        this.belongsToMany(models.Products, {
            through: models.ProductlnCategories,
            as: 'products',
            foreignKey: 'categoryId'
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
