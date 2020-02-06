const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'companies';
const modelName = 'companies';
var _ = require('lodash');
module.exports = class Companies extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize,
            timestamps: false
        });
    }

    static get(where) {
        return this.findOne({
            where
        });
    }

    static getCompanies(pagination, order, where, attributes, include) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order,
            attributes,
            include
        });
    }

    static async updateCompanies(data, where, transaction) {
        return await this.update(data, {
            where,
            transaction
        }).then(() => {
            return this.get({ ...where, ...data });
        });
    }
};
