const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'parentCompanies';
const modelName = 'parentCompanies';
var _ = require('lodash');
module.exports = class Roles extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize,
            timestamps: false
        });
    }

    static associate(models) {
        // this.belongsToMany(models.Companies, { through: models.Companies, as: 'companies', foreignKey: 'parentCompanyId' });
    }

    static get(where) {
        return this.findOne({
            where
        });
    }

    static getAllParentCompanies() {
        return this.findAll();
    }

    static getParentCompanies(pagination, order, where, attributes, include) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order,
            attributes,
            include
        });
    }

    static async updateParentCompanies(data, where, transaction) {
        return await this.update(data, {
            where,
            transaction
        }).then(() => {
            return this.get({ ...where, ...data });
        });
    }
};
