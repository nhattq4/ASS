const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'roles';
const modelName = 'roles';
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
        this.belongsToMany(models.Users, { through: models.UserRoles, as: 'users', foreignKey: 'roleId' });
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
