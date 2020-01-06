const ParentCompanies = require('../../database/models/parentCompany');

const _ = require('lodash');
const attributes = require('../../utils/attributes');

getParentCompanies = async (req, res, next) => {
    const parentCompanies = await ParentCompanies.getAllParentCompanies(attributes.PARENTCOMPANY);
    console.log(parentCompanies);
    res.json(parentCompanies);
};

module.exports = {
    getParentCompanies
};
