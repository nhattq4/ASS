const express = require('express');
const router = express.Router();
const functions = require('./functions');

/**
 * This can be done by the anonymous user.
 *
 * @route GET /parentCompany/get-all-parent-companies
 * @operationId get-all-parent-companies
 * @group Parent Company - Operations about Parent company
 * @returns {ParentCompanyData.model} 200 - successful operation
 * @returns {Error.model} 404 - Parent company not found error message
 */
router.get('/get-all-parent-companies', (req, res, next) => functions.getParentCompanies(req, res, next).catch(error => next(error)));

module.exports = router;
