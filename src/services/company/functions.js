const EmployeeCompanies = require('../../database/models/EmployeeCompanies');
const Employees = require('../../database/models/Employees');

const _ = require('lodash');
const utils = require('../../utils/utils');
const errorHandler = require('../../utils/errorHandler');
const attributes = require('../../utils/attributes');

validateEmployeeId = async (req, res, next, employeeId) => {
    const where = {
        employeeId
    };
    const company = await EmployeeCompanies.get(where);

    if (!company) {
        return res.status(404).send(errorHandler.COMPANY_NOT_FOUND);
    }

    req._company = company;
    next();
};

getByEmployeeId = async (req, res, next) => {
    const where = {
        employeeId: req.params.employeeId
    };

    const companies = await EmployeeCompanies.getByEmployeeId(where, attributes.COMPANY);

    res.json(companies);
};

getByUsername = async (req, res, next) => {
    let where = {
        username: req.body.username
    };

    const employee = await Employees.findOne({
        where
    });

    if (!employee) {
        return res.status(404).send(errorHandler.USER_NOT_FOUND);
    }

    where = {
        employeeId: employee.id
    };

    const companies = await EmployeeCompanies.getByUserId(where, attributes.COMPANY);

    res.json(companies);
};

module.exports = {
    validateEmployeeId,
    getByEmployeeId,
    getByUsername
};
