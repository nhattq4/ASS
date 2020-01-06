const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'claims';
const modelName = 'claims';

var _ = require('lodash');
module.exports = class Claims extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize,
            timestamps: false
        });
    }

    static associate(models) {
        this.belongsToMany(models.Roles, {
            through: models.RoleClaims,
            as: 'roles',
            foreignKey: 'claimId'
        });
    }
};
