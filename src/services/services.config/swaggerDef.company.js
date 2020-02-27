/**
 * @typedef CompanyData
 * @property {string} id.required
 * @property {string} code.required
 * @property {string} name.required
 * @property {string} letterhead
 * @property {string} imgPath
 * @property {integer} addressId.required
 * @property {string} officeTel1
 * @property {string} officeTel2
 * @property {string} email
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
