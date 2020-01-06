const express = require('express');
const router = express.Router();
const functions = require('./functions');

var healthCheck = (req, res, next) => {
    functions
        .checkHealth()
        .then(result => {
            return res.send({
                code: 'OK',
                message: result
            });
        })
        .catch(reason => {
            return res.status(400).send(reason);
        });
};

/**
 * Api to check the status of service
 *
 * @route GET /monitor/health - Check health of service
 * @operationId getHealth
 * @group Monitor - API testing checker
 * @returns 200 - OK
 * @returns 400 - Bad Request
 */
router.get('/health', healthCheck.bind(this));

router.post('/health', healthCheck.bind(this));

module.exports = router;
