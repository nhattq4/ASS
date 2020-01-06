const Sequelize = require('sequelize');
const fs = require('fs');

const db = require('../../database/db');

const packageJsonPath = `${process.cwd()}\\package.json`;
const packageInfo = fs.existsSync(packageJsonPath) ? require(packageJsonPath) : {};

class Functions {
    static checkHealth() {
        return db
            .query('SELECT version() AS version;', {
                type: Sequelize.QueryTypes.SELECT,
                logging: false
            })
            .then(result => {
                return {
                    Database: result,
                    Application: {
                        name: packageInfo.name || '',
                        version: packageInfo.version || ''
                    },
                    Dependencies: process.versions
                };
            });
    }
}

module.exports = Functions;
