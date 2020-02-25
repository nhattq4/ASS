/**
 * @typedef CompanyData
 * @property {integer} id.required
 * @property {integer} userId.required
 * @property {integer} parentCompanyId.required
 * @property {boolean} isDefaultCompany
 * @property {boolean} isDefaultLoginCompany
 * @property {boolean} isActive
 * @property {string} createdBy
 * @property {string} createdAt
 * @property {string} updatedBy
 * @property {string} updatedAt
 * @property {enum} status - status - eg: ADDED, REMOVED
 */

/**
 * @typedef GetCompanyByUserId
 * @property {integer} userId.required
 */

/**
 * @typedef GetCompanyByUsername
 * @property {string} username.required
 */
