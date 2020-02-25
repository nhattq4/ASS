const fs = require('fs');
const packageJsonPath = `${process.cwd()}\\package.json`;
const packageInfo = fs.existsSync(packageJsonPath) ? require(packageJsonPath) : {};

let options = {
    swaggerDefinition: {
        info: {
            title: packageInfo.name || '',
            version: packageInfo.version || '',
            description: packageInfo.description || '',
            license: packageInfo.license || ''
        },
        produces: ['application/json'],
        consumes: ['application/json'],
        basePath: '/api',
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: ''
            }
        }
    },
    basedir: process.cwd(),
    files: ['./src/services/**/index.js', './src/services/services.config/swaggerDef*.js'] // Path to the API handlers folder
};

module.exports = options;
