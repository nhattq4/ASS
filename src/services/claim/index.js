const express = require('express');
const router = express.Router();
const functions = require('./functions');

/**
 * Get permissions (claims) data by username.
 *
 * @route POST /claim/get-by-username
 * @operationId getByUsername
 * @group Claim - Operations about claim
 * @param {GetClaimByUsername.model} requestModel.body.required - The username
 * @returns {RoleClaimListData.model} 200 - successful operation
 * @returns {Error.model} 400 - Bad request
 */
router.post('/get-by-username', (req, res, next) => functions.getByUsername(req, res, next).catch(error => next(error)));

module.exports = router;
