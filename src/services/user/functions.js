const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Db = require('../../database/db');
const Users = require('../../database/models/users');
const UserParentCompanies = require('../../database/models/userParentCompanies');
const UserRoles = require('../../database/models/userRoles');

const _ = require('lodash');
const utils = require('../../utils/utils');
const errorHandler = require('../../utils/errorHandler');
const attributes = require('../../utils/attributes');

const STATUS = {
    ADDED: 'ADDED',
    UPDATED: 'UPDATED',
    DELETED: 'DELETED'
};

search = async (req, res, next) => {
    let { page, limit, pagination, order, search, filter } = req.body;
    let whereConditions = [...utils.generateSearchQuery(search), ...utils.generateFilterQuery(filter)];
    let where;
    if (whereConditions.length) {
        where = {
            [Op.or]: whereConditions
        };
    }

    const { users, error } = await Users.getUsers(pagination, order, where, attributes.USER)
        .then(users => ({ users }))
        .catch(error => ({ error }));

    if (error) {
        return res.status(errorHandler.INVALID_PARAMETER.status).send(errorHandler.INVALID_PARAMETER);
    }

    users.page = page;
    users.limit = limit;
    users.order = order;
    res.json(users);
};

create = async (req, res, next) => {
    // data transform
    let { user, userParentCompanies = [], roles = [] } = req.body;
    let userPayload = {
        employeeId: user.employeeId,
        fullName: user.fullName,
        email: user.email,
        isActive: user.isActive
    };

    // validation
    let error = validate('create', req.body);
    if (error) {
        return res.status(error.status).send(error);
    }

    // Process
    return await Users.sequelize
        .transaction(async t => {
            let createdUser = await Users.create(userPayload, { transaction: t });
            let userParentCompaniesPayload = userParentCompanies.map(company => {
                return {
                    userId: createdUser.id,
                    parentCompanyId: company.parentCompanyId,
                    parentCompanyName: company.parentCompanyName,
                    companyId: company.companyId,
                    companyName: company.companyName,
                    isDefaultCompany: company.isDefaultCompany ? 1 : 0,
                    isDefaultLoginCompany: company.isDefaultLoginCompany ? 1 : 0,
                    isActive: 1
                };
            });
            let userRolesPayload = roles.map(role => {
                return {
                    userId: createdUser.id,
                    roleId: role.id
                };
            });
            await UserParentCompanies.bulkCreate(userParentCompaniesPayload, { transaction: t });
            await UserRoles.bulkCreate(userRolesPayload, { transaction: t });

            return { user, userParentCompanies, roles };
        })
        .then(payload => res.json({ code: 200, message: 'successfully', payload }))
        .catch(() => res.status(errorHandler.CREATE_FAILED.status).send(errorHandler.CREATE_FAILED));
};

update = async (req, res, next) => {
    let { user, userParentCompanies = [], roles = [] } = req.body;
    let userPayload = {
        id: user.id,
        employeeId: user.employeeId,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        isActive: user.isActive
    };

    let error = validate('update', req.body);
    if (error) {
        return res.status(error.status).send(error);
    }

    return await Users.sequelize
        .transaction(async t => {

            let listPromiseUserParentCompanies = userParentCompanies.map(company => {
                if (company.status == STATUS.ADDED) {
                    return UserParentCompanies.create(
                        {
                            ...company,
                            userId: userPayload.id
                        },
                        {
                            where: {
                                userId: userPayload.id,
                                companyId: company.companyId
                            },
                            transaction: t
                        });
                } 
                
                if (company.status == STATUS.UPDATED) {
                    return UserParentCompanies.update(
                        {
                            isDefaultCompany: company.isDefaultCompany ? 1 : 0,
                            isDefaultLoginCompany: company.isDefaultLoginCompany ? 1 : 0
                        },
                        {
                            where: {
                                userId: userPayload.id,
                                companyId: company.companyId
                            },
                            transaction: t
                        });
                } 
                
                if (company.status == STATUS.DELETED) {
                    return UserParentCompanies.destroy({
                        where: {
                            userId: userPayload.id,
                            companyId: company.companyId
                        },
                        transaction: t
                    });
                }
            });

            let listPromiseRoles = roles.map(role => {
                if (role.status == STATUS.ADDED) {
                    return UserRoles.create(
                        {
                            userId: userPayload.id,
                            roleId: role.id
                        },
                        { transaction: t }
                    );
                } 
                
                if (role.status == STATUS.DELETED) {
                    return UserRoles.destroy(
                        {
                            where: {
                                userId: userPayload.id,
                                roleId: role.id
                            }
                        },
                        { transaction: t }
                    );
                }
            });

            await Users.updateUser(userPayload, { employeeId: user.employeeId }, t);
            await Promise.all(listPromiseUserParentCompanies);
            await Promise.all(listPromiseRoles);

            return { user, userParentCompanies, roles };
        })
        .then(payload => res.json({ code: 200, message: 'successfully', payload }))
        .catch(() => res.status(errorHandler.UPDATE_FAILED.status).send(errorHandler.UPDATE_FAILED));
};

getByEmail = async (req, res, next) => {
    const { email } = req.body;

    let validationResult = errorHandler.validate([email]);
    if (validationResult) {
        return res.status(validationResult.status).send(validationResult);
    }

    const user = await Users.get({ username: email });
    if (!user) {
        return res.status(errorHandler.USER_NOT_FOUND.status).send(errorHandler.USER_NOT_FOUND);
    }

    res.json(_.pick(user, attributes.USER));
};

getByEmployee = async (req, res, next) => {
    const { employeeId, employeeName } = req.body;

    let validationResult = errorHandler.validate([employeeId, employeeName]);
    if (validationResult) {
        return res.status(validationResult.status).send(validationResult);
    }

    const user = await Users.get({ employeeId, fullName: employeeName });
    if (!user) {
        return res.status(errorHandler.USER_NOT_FOUND.status).send(errorHandler.USER_NOT_FOUND);
    }

    res.json(_.pick(user, attributes.USER));
};

updateEmailByEmployee = async (req, res, next) => {
    const { employeeId, employeeName, email } = req.body;
    const data = { username: email };
    const where = {
        employeeId,
        fullName: employeeName,
        username: { [Op.or]: ['', null] }
    };
    
    const updatedUser = await Users.updateUser(data, where, null);
    if (!updatedUser) {
        return res.status(errorHandler.UPDATE_FAILED.status).send(errorHandler.UPDATE_FAILED);
    }

    res.json(_.pick(updatedUser, attributes.USER));
};

validate = async (type, data) => {
    let fields = [
        data.user.employeeId,
        data.user.fullName,
        data.user.email,
        data.user.isActive
    ];
    
    let validationResult = errorHandler.validate(fields);
    if (validationResult) {
        return errorHandler.INVALID_PARAMETER;
    }

    if (!Array.isArray(data.userParentCompanies) || !Array.isArray(data.roles)) {
        throw errorHandler.INVALID_PARAMETER;
    }

    if (type === 'create') {
        let isExistedEmployee = await Users.get({ employeeId: data.user.employeeId });
        if (isExistedEmployee) {
            return errorHandler.USER_WAS_EXISTED;
        }
    }
    
    if (type === 'update') {
        let isExistedEmployee = await Users.get({ employeeId: data.user.employeeId });
        if (!isExistedEmployee) {
            return errorHandler.USER_NOT_EXISTS;
        }
    }

    return null;
};

module.exports = {
    search,
    create,
    update,
    getByEmail,
    getByEmployee,
    updateEmailByEmployee
};
