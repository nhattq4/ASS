const express = require('express');
const router = express.Router();
const functions = require('./functions');

/**
 * This can be done by the anonymous user.
 *
 * @route GET /company/get-by-employeeId/{employeeId}
 * @operationId getByemployeeId
 * @group Company - Operations about company
 * @param {integer} employeeId.path.required - The employee id
 * @returns {Array.<CompanyData>} 200 - successful operation
 * @returns {Error.model} 404 - Parent company not found error message
 */
router.param('employeeId', functions.validateEmployeeId);
router.get('/get-by-employeeId/:employeeId', (req, res, next) => functions.getByEmployeeId(req, res, next).catch(error => next(error)));

/**
 * Get parent company data by username
 *
 * @route POST /company/get-by-username
 * @operationId getByUsername
 * @group Company - Operations about company
 * @param {GetCompanyByUsername.model} username.body.required - The email of user
 * @returns {Array.<CompanyData>} 200 - successful operation
 * @returns {Error.model} 400 - Parent company not found error message
 */
router.post('/get-by-username', (req, res, next) => functions.getByUsername(req, res, next).catch(error => next(error)));

/**
 * Create company data
 *
 * @route POST /company/create-company
 * @operationId createCompany
 * @group Company - Operations about company
 * @param {CompanyData.model} requestModel.body.required - Created role object
 * @returns {CompanyData.model} 200 - successful with newly created entity, in payload object
 * @returns {Error.model} 400 - Bad request
 */
router.post('/create-company', (req, res, next) => functions.createCompany(req, res, next).catch(error => next(error)
));

module.exports = router;

// post ->  create
// put -> update
// get -> get
// delete -> delete
// callback function (javascript)
// req -> require
// res -> response