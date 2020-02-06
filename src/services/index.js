const monitor = require('./monitor');
const user = require('./user');
const role = require('./role');
const company = require('./company');
const parentCompany = require('./parentCompany');
const ROOT_ROUTE = '/api/auth';

class ServicesIndex {
    constructor(app) {
        this.app = app;
    }

    registerServices() {
        this.app.use(ROOT_ROUTE + '/user', user);
        this.app.use(ROOT_ROUTE + '/role', role);
        this.app.use(ROOT_ROUTE + '/company', company);
        this.app.use(ROOT_ROUTE + '/parentCompany', parentCompany);
    }
}

module.exports = app => {
    return new ServicesIndex(app).registerServices();
};
