const express = require('express');
const router = express.Router();
const functions = require('./functions');

/**
 * This can be done by the anonymous user.
 *
 * @route GET /company/get-by-userId/{userId}
 * @operationId getByUserId
 * @group Company - Operations about company
 * @param {integer} userId.path.required - The user id
 * @returns {Array.<CompanyData>} 200 - successful operation
 * @returns {Error.model} 404 - Parent company not found error message
 */
router.param('userId', functions.validateUserId);
router.get('/get-by-userId/:userId', (req, res, next) => functions.getByUserId(req, res, next).catch(error => next(error)));

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

module.exports = router;
