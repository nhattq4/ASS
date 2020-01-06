const UserParentCompanies = require('../../database/models/userParentCompanies');
const Users = require('../../database/models/users');

const _ = require('lodash');
const utils = require('../../utils/utils');
const errorHandler = require('../../utils/errorHandler');
const attributes = require('../../utils/attributes');

validateUserId = async (req, res, next, userId) => {
    const where = {
        userId
    };
    const company = await UserParentCompanies.get(where);

    if (!company) {
        return res.status(404).send(errorHandler.COMPANY_NOT_FOUND);
    }

    req._company = company;
    next();
};

getByUserId = async (req, res, next) => {
    const where = {
        userId: req.params.userId
    };

    const companies = await UserParentCompanies.getByUserId(where, attributes.COMPANY);

    res.json(companies);
};

getByUsername = async (req, res, next) => {
    let where = {
        username: req.body.username
    };

    const user = await Users.findOne({
        where
    });

    if (!user) {
        return res.status(404).send(errorHandler.USER_NOT_FOUND);
    }

    where = {
        userId: user.id
    };

    const companies = await UserParentCompanies.getByUserId(where, attributes.COMPANY);

    res.json(companies);
};

module.exports = {
    validateUserId,
    getByUserId,
    getByUsername
};
