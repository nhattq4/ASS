const express = require('express');
const router = express.Router();
const functions = require('./functions');

/**
 * This can be done by the anonymous employee.
 *
 * @route POST /employee/search
 * @operationId search
 * @group Employee - Operations about employee
 * @param {EmployeeSearchParam.model} requestModel.body.required - The search condition object
 * @returns {EmployeeSearchData.model} 200 - successful operation with search response object
 * @returns {Error.model} 400 - Bad request
 */
router.post('/search', (req, res, next) => functions.search(req, res, next).catch(error => next(error)));

/**
 * Created employee object.
 *
 * @route POST /employee/create
 * @operationId create
 * @group Employee - Operations about employee
 * @param {CreateEmployeeParam.model} requestModel.body.required - Created employee object
 * @returns {CreateEmployeeData.model} 200 - successful with newly created entity, in payload object
 * @returns {Error.model} 400 - Bad request
 */
router.post('/create', (req, res, next) => functions.create(req, res, next).catch(error => next(error)));

/**
 * Updated employee object.
 *
 * @route Put /employee/update
 * @operationId update
 * @group Employee - Operations about employee
 * @param {UpdateEmployeeParam.model} requestModel.body.required - Update employee object
 * @returns {UpdateEmployeeData.model} 200 - successful with updatly entity, in payload object
 * @returns {Error.model} 400 - Bad request
 */
router.put('/update', (req, res, next) => functions.update(req, res, next).catch(error => next(error)));

/**
 * This can be done by the anonymous employee.
 *
 * @route POST /employee/get-by-email
 * @operationId getByEmail
 * @group Employee - Operations about employee
 * @param {GetEmployeeByEmail.model} email.body.required - The email of employee
 * @returns {EmployeeData.model} 200 - successful operation
 * @returns {Error.model} 400 - employee not found error message
 */
router.post('/get-by-email', (req, res, next) => functions.getByEmail(req, res, next).catch(error => next(error)));

/**
 * This can be done by the anonymous employee.
 *
 * @route POST /employee/get-by-employee
 * @operationId getByEmployee
 * @group Employee - Operations about employee
 * @param {getEmployee.model} requestModel.body.required - The employee with email object
 * @returns {EmployeeData.model} 200 - successful operation
 * @returns {Error.model} 400 - employee not found error message
 */
router.post('/get-by-employee', (req, res, next) => functions.getByEmployee(req, res, next).catch(error => next(error)));

/**
 * This can be done by the anonymous employee.
 *
 * @route PUT /employee/update-email-by-employee
 * @operationId updateByEmail
 * @group Employee - Operations about employee
 * @param {UpdateEmployeeByEmail.model} requestModel.body.required - Update employee object
 * @returns {EmployeeData.model} 200 - successful operation with employee updated object
 * @returns {Error.model} 400 - Bad Request
 */
router.put('/update-email-by-employee', (req, res, next) => functions.updateEmailByEmployee(req, res, next).catch(error => next(error)));

module.exports = router;
