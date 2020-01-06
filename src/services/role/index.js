const express = require('express');
const router = express.Router();
const functions = require('./functions');

/**
 * This can be done by the anonymous user.
 *
 * @route POST /role/search
 * @operationId search
 * @group Role - Operations about role
 * @param {RoleSearchParam.model} requestModel.body.required - The search condition object
 * @returns {RoleSearchData.model} 200 - successful operation with search response object
 * @returns {Error.model} 400 - Bad request
 */
router.post('/search', (req, res, next) => functions.search(req, res, next).catch(error => next(error)));

/**
 * Created role object.
 *
 * @route POST /role/create
 * @operationId create
 * @group Role
 * @param {CreateRoleParam.model} requestModel.body.required - Created role object
 * @returns {CreateRoleData.model} 200 - successful with newly created entity, in payload object
 * @returns {Error.model} 400 - Bad request
 */
router.post('/create', (req, res, next) => functions.create(req, res, next).catch(error => next(error)));

/**
 * Updated role object.
 *
 * @route Put /role/update
 * @operationId update
 * @group Role
 * @param {UpdateRoleParam.model} requestModel.body.required - Update role object
 * @returns {UpdateRoleData.model} 200 - successful with updatly entity, in payload object
 * @returns {Error.model} 400 - Bad request
 */
router.put('/update', (req, res, next) => functions.update(req, res, next).catch(error => next(error)));

/**
 * Updated role status.
 *
 * @route Put /role/update-status
 * @operationId updateStatus
 * @group Role
 * @param {UpdateRoleStatusParam.model} requestModel.body.required - Update role status
 * @returns {UpdateRoleStatusData.model} 200 - successful with updated entity, in payload object
 * @returns {Error.model} 400 - Bad request
 */
router.put('/update-status', (req, res, next) => functions.updateStatus(req, res, next).catch(error => next(error)));

module.exports = router;
