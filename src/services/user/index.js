const express = require('express');
const router = express.Router();
const functions = require('./functions');

/**
 * This can be done by the anonymous user.
 *
 * @route POST /user/search
 * @operationId search
 * @group User - Operations about user
 * @param {UserSearchParam.model} requestModel.body.required - The search condition object
 * @returns {UserSearchData.model} 200 - successful operation with search response object
 * @returns {Error.model} 400 - Bad request
 */
router.post('/search', (req, res, next) => functions.search(req, res, next).catch(error => next(error)));

/**
 * Created user object.
 *
 * @route POST /user/create
 * @operationId create
 * @group User - Operations about user
 * @param {CreateUserParam.model} requestModel.body.required - Created user object
 * @returns {CreateUserData.model} 200 - successful with newly created entity, in payload object
 * @returns {Error.model} 400 - Bad request
 */
router.post('/create', (req, res, next) => functions.create(req, res, next).catch(error =>next(error)));

/**
 * Updated user object.
 *
 * @route Put /user/update
 * @operationId update
 * @group User - Operations about user
 * @param {UpdateUserParam.model} requestModel.body.required - Update user object
 * @returns {UpdateUserData.model} 200 - successful with updatly entity, in payload object
 * @returns {Error.model} 400 - Bad request
 */
router.put('/update', (req, res, next) => functions.update(req, res, next).catch(error => next(error)));

/**
 * This can be done by the anonymous user.
 *
 * @route POST /user/get-by-email
 * @operationId getByEmail
 * @group User - Operations about user
 * @param {GetUserByEmail.model} email.body.required - The email of employee
 * @returns {UserData.model} 200 - successful operation
 * @returns {Error.model} 400 - User not found error message
 */
router.post('/get-by-email', (req, res, next) => functions.getByEmail(req, res, next).catch(error => next(error)));

/**
 * This can be done by the anonymous user.
 *
 * @route POST /user/get-by-employee
 * @operationId getByEmployee
 * @group User - Operations about user
 * @param {getUserByEmployee.model} requestModel.body.required - The employee with email object
 * @returns {UserData.model} 200 - successful operation
 * @returns {Error.model} 400 - User not found error message
 */
router.post('/get-by-employee', (req, res, next) => functions.getByEmployee(req, res, next).catch(error => next(error)));

/**
 * This can be done by the anonymous user.
 *
 * @route PUT /user/update-email-by-employee
 * @operationId updateByEmail
 * @group User - Operations about user
 * @param {UpdateUserByEmailAndEmployee.model} requestModel.body.required - Update user object
 * @returns {UserData.model} 200 - successful operation with user updated object
 * @returns {Error.model} 400 - Bad Request
 */
router.put('/update-email-by-employee', (req, res, next) => functions.updateEmailByEmployee(req, res, next).catch(error => next(error)));

module.exports = router;
