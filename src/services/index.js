const employee = require('./employee');
const role = require('./role');
const company = require('./company');
const ROOT_ROUTE = '/api';

class ServicesIndex {
    constructor(app) {
        this.app = app;
    }

    registerServices() {
        this.app.use(ROOT_ROUTE + '/employee', employee);
        this.app.use(ROOT_ROUTE + '/role', role);
        this.app.use(ROOT_ROUTE + '/company', company);
    }
}

module.exports = app => {
    return new ServicesIndex(app).registerServices();
};
