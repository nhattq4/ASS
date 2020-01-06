/**
 * @typedef ParentCompanyData
 * @property {integer} id.required
 * @property {string} name.required
 * @property {string} letterhead
 * @property {string} imgPath
 * @property {boolean} isDeleted
 * @property {boolean} isActive
 * @property {string} createdBy
 * @property {string} createdAt
 * @property {string} updatedBy
 * @property {string} updatedAt
 * @property {enum} status - status - eg: ADDED, REMOVED
 */


/**
 * @typedef ParentCompanyListData
 * @property {Array.<ParentCompanyData>} roles
 */
