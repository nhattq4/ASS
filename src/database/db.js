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
                //Companies
                EmployeeCompanies: require('./models/employeeCompanies').init(sequelize),
                Company: require('./models/company').init(sequelize),

                //employee
                Roles: require('./models/roles').init(sequelize),
                EmployeeRoles: require('./models/employeeRoles').init(sequelize),
                Employees: require('./models/employees').init(sequelize),

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
