const Sequelize = require('sequelize');
const schema = require('./schema');
const tableName = 'role_claims';
const modelName = 'role_claims';
module.exports = class RoleClaims extends Sequelize.Model {
    static init(sequelize) {
        return super.init(schema(), {
            tableName,
            modelName,
            sequelize,
            timestamps: false
        });
    }
};
