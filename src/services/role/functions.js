const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Db = require('../../database/db');
const Roles = require('../../database/models/roles');

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

    let include = [{
        model: Claims,
        as: 'claims',
        attributes: attributes.ROLE_CLAIM,
        through: {
            attributes: []
        }
    }];

    const { roles, error } = await Roles.getRoles(pagination, order, where, attributes.ROLE, include)
        .then(roles => ({ roles }))
        .catch(error => ({ error }));

    if (error) {
        return res.status(errorHandler.INVALID_PARAMETER.status).send(errorHandler.INVALID_PARAMETER);
    }

    roles.page = page;
    roles.limit = limit;
    roles.order = order;
    res.json(roles);
};

create = async (req, res, next) => {
    // data transform
    let { role, claims = [] } = req.body;
    let rolePayload = {
        name: role.name,
        description: role.description,
        bypassClaim: role.bypassClaim,
        isActive: role.isActive
    };

    // validation
    let error = validate('create', req.body);
    if (error) {
        return res.status(error.status).send(error);
    }

    // Process
    return await Roles.sequelize
        .transaction(async t => {
            let createdRole = await Roles.create(rolePayload, { transaction: t });
            let roleClaimsPayload = claims.map(claim => {
                return {
                    roleId: createdRole.id,
                    claimId: claim.id
                };
            });
            await RoleClaims.bulkCreate(roleClaimsPayload, { transaction: t });

            return { role, claims };
        })
        .then(payload => res.json({ code: 200, message: 'successfully', payload }))
        .catch(() => res.status(errorHandler.CREATE_FAILED.status).send(errorHandler.CREATE_FAILED));
};

update = async (req, res, next) => {
    let { role, claims = [] } = req.body;
    let rolePayload = {
        id: role.id,
        name: role.name,
        description: role.description,
        bypassClaim: role.bypassClaim,
        isActive: role.isActive
    };

    // validation
    let error = validate('update', req.body);
    if (error) {
        return res.status(error.status).send(error);
    }

    return await Roles.sequelize
        .transaction(async t => {

            let promises = claims.map(claim => {
                if (claim.status == STATUS.ADDED) {
                    return RoleClaims.create({ roleId: rolePayload.id, claimId: claim.id }, { transaction: t });
                } else if (role.status == STATUS.DELETED) {
                    return RoleClaims.destroy({ where: { roleId: rolePayload.id, claimId: claim.id } }, { transaction: t });
                }
            });

            await Roles.updateRole(rolePayload, { id: role.id }, t);
            await Promise.all(promises);

            return { role, claims };
        })
        .then(payload => res.json({ code: 200, message: 'successfully', payload }))
        .catch(() => res.status(errorHandler.UPDATE_FAILED.status).send(errorHandler.UPDATE_FAILED));
};

updateStatus = async (req, res, next) => {
    const data = { isActive: req.body.isActive };
    const where = { id: req.body.id };

    const updatedRole = await Roles.updateRole(data, where, null);
    if (!updatedRole) {
        return res.status(errorHandler.UPDATE_FAILED.status).send(errorHandler.UPDATE_FAILED);
    }

    res.json({ code: 200, message: 'successfully', payload: updatedRole });
};

validate = async (type, data) => {
    var fields = [
        data.role.name,
        data.role.description,
        data.role.bypassClaim,
        data.role.isActive,
    ];

    let validationResult = errorHandler.validate(fields);
    if (validationResult) {
        return errorHandler.INVALID_PARAMETER;
    }

    if (!Array.isArray(data.claims)) {
        return errorHandler.INVALID_PARAMETER;
    }

    if (type === 'create') {
        let isExistedRole = await Roles.get({ name: data.role.name });
        if (isExistedRole) {
            return errorHandler.ROLE_WAS_EXISTED;
        }
    }

    if (type === 'update') {
        let isExistedRole = await Roles.get({ id: data.role.id });
        if (!isExistedRole) {
            return errorHandler.ROLE_NOT_EXISTED;
        }
    }

    return null;
};

module.exports = {
    search,
    create,
    update,
    updateStatus
};
