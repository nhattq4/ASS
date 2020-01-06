const environment = require('./utils/environment');
const express = require('express');
const { exec } = require('child_process');
const app = express();

var registerMiddleware = app => {
    const middlewares = require('./middlewares');

    console.info('Init - Register middlewares.');

    for (const middleware of middlewares) {
        middleware.register(app);

        console.info(`Init - Register middleware '${middleware.name}' successfully.`);
    }

    return;
};

var initService = () => {
    const services = require('./services');
    const logger = require('./utils/logger');
    const swaggerOptions = require('./utils/swaggerOptions');
    const expressSwagger = require('express-swagger-generator')(app);

    console.info('Init - Request Logging.');
    logger.initRequestLogging(app);
    console.info('Init - Request Logging successfully.');

    console.info('Init - Register services.');
    services(app);
    console.info(`Init - Register services '${services.name}' successfully.`);

    console.info('Init - Error Logging.');
    logger.initErrorLogging(app);
    console.info('Init - Error Logging successfully.');

    console.info('Init - Swagger Applying.');
    expressSwagger(swaggerOptions);
    console.info('Init - Swagger Applying successfully.');

    return;
};

var initSequelize = () => {
    const db = require('./database/db');

    console.info('Init - Establish connection.');

    return db
        .connect()
        .then(() => {
            console.info('Init - Establish connection successfully.');
            return true;
        })
        .catch(err => {
            console.error('Init - Establish connection fail:', err);
            return false;
        });
};

var migrateSequelize = async () => {
    return await new Promise((resolve, reject) => {
        console.info('Init - Migrate sequelize');
        const migrate = exec('npm run sequelize db:migrate', {}, err => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
        // Forward stdout+stderr to this process
        migrate.stdout.pipe(process.stdout);
        migrate.stderr.pipe(process.stderr);
    });
};

var startServer = response => {
    const env = process.env.NODE_ENV || 'development';
    const port = process.env.PORT || 8081;

    if (!response) return;

    app.listen(port, () => {
        console.info(`Init - server started on environment: ${env} and listening on port: ${port}`);
    });
};

environment
    .getEnvironmentSetting()
    .then(registerMiddleware.bind(this, app))
    .then(initService.bind(this))
    .then(initSequelize.bind(this))
    .then(migrateSequelize.bind(this))
    .then(startServer.bind(this))
    .catch(error => {
        console.error('Startup Error: ', error);
    });

module.exports = app;
