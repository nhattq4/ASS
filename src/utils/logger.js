const winston = require('winston');
const expressWinston = require('express-winston');

class Logger {
    // log the whole request and response body
    static setup() {
        expressWinston.requestWhitelist.push('body');
        expressWinston.responseWhitelist.push('body');
    }

    static initRequestLogging(app) {
        this.setup();

        app.use(
            expressWinston.logger({
                transports: [new winston.transports.Console()],
                format: winston.format.combine(winston.format.colorize(), winston.format.json()),
                ignoreRoute: function(req, res) {
                    return req.url == '/favicon.ico' || req.url.includes('/api-docs/');
                }
            })
        );
    }

    static initErrorLogging(app) {
        this.setup();

        app.use(
            expressWinston.errorLogger({
                transports: [new winston.transports.Console()],
                format: winston.format.combine(winston.format.json())
            })
        );
    }
}

module.exports = Logger;
