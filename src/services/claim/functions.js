const Users = require('../../database/models/users');
const Roles = require('../../database/models/roles');
const Claims = require('../../database/models/claims');

const _ = require('lodash');
const errorHandler = require('../../utils/errorHandler');
const attributes = require('../../utils/attributes');

getByUsername = async (req, res, next) => {
    let { username } = req.body;

    const { data, error } = await Users.findOne({
        where: { username },
        attributes: [],
        include: {
            model: Roles,
            as: 'roles',
            attributes: attributes.SHORT_ROLE,
            through: {
                attributes: []
            },
            include: {
                model: Claims,
                as: 'claims',
                attributes: attributes.ROLE_CLAIM,
                through: {
                    attributes: []
                }
            }
        }
    })
    .then(data => ({ data }))
    .catch(error => ({ error }));

    if (error) {
        return res.status(400).send(errorHandler.INVALID_PARAMETER);
    }

    res.json(data.roles);
};

module.exports = {
    getByUsername
};
