const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'users';
const modelName = 'users';
var _ = require('lodash');
module.exports = class Users extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize
        });
    }

    static associate(models) {
        this.belongsToMany(models.Roles, {
            through: models.UserRoles,
            as: 'roles',
            foreignKey: 'userId'
        });
    }

    static get(where) {
        return this.findOne({
            where
        });
    }

    static async updateUser(data, where, transaction) {
        // data['updatedBy'] = updatedBy
        // data['updatedAt'] = updatedAt
        return await this.update(data, {
            where,
            transaction
        }).then(() => {
            return this.get({ ...where, ...data });
        });
    }

    static getUsers(pagination, order, where, attributes) {
        return this.findAndCountAll({
            where,
            ...pagination,
            order,
            attributes
        });
    }
};
