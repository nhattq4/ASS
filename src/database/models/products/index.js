const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'products';
const modelName = 'products';
var _ = require('lodash');
module.exports = class Products extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize
        });
    }

    static associate(models) {
        this.belongsToMany(models.Orders, { through: models.OrderDetail, as: 'orders', foreignKey: 'productId' });
        this.belongsToMany(models.Categories, { through: models.ProductlnCategories, as: 'categories', foreignKey: 'productId' });
    }

    static get(where) {
        return this.findOne({
            where
        });
    }

    static getRoles(pagination, order, where, attributes, include) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order,
            attributes,
            include
        });
    }

    static async updateRole(data, where, transaction) {
        // data['updatedBy'] = updatedBy
        // data['updatedAt'] = updatedAt
        return await this.update(data, {
            where,
            transaction
        }).then(() => {
            return this.get({ ...where, ...data });
        });
    }
};
