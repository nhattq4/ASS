const Sequelize = require('sequelize');
const config = require('config');
const _ = require('lodash');
const dbConfig = JSON.parse(process.env.databaseAccount);
var sequelize = null;

class Db {
    constructor() {
        if (!sequelize) {
            sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.options);

            // Init models
            const models = {
                Claims: require('./models/claims').init(sequelize),
                RoleClaims: require('./models/roleClaims').init(sequelize),
                Roles: require('./models/roles').init(sequelize),
                UserRoles: require('./models/userRoles').init(sequelize),
                Users: require('./models/users').init(sequelize),
                UserParentCompanies: require('./models/userParentCompanies').init(sequelize),
                ParentCompany: require('./models/parentCompany').init(sequelize),
                Company: require('./models/company').init(sequelize),
                UsersNew: require('./models/users_new').init(sequelize),
                Products: require('./models/products').init(sequelize),
                ParentProducts: require('./models/parentProduct').init(sequelize),
            };

            // Create relationships in the ORM
            Object.values(models)
                .filter(model => typeof model.associate === 'function')
                .forEach(model => model.associate(models));
        }
    }

    getSequelize() {
        return sequelize;
    }

    getTransaction(transaction, whereClause) {
        if (!whereClause) {
            whereClause = {};
        }
        if (transaction) {
            whereClause['transaction'] = transaction;
        }
        return whereClause;
    }

    connect() {
        let connectPromise = sequelize
            .authenticate()
            .then(() => {
                return sequelize.sync({ force: config.recreateDB }).then(() => {
                    return sequelize;
                });
            })
            .catch(error => {
                throw error;
            });
        return connectPromise;
    }

    rawQuery(sql, whereClause) {
        return sequelize.query(sql, whereClause).then(result => {
            return result;
        });
    }
}

module.exports = new Db();
