/**
 * @typedef ClaimData
 * @property {integer} id.required
 * @property {string} name
 * @property {string} description
 * @property {boolean} isActive
 * @property {string} createdBy
 * @property {string} createdAt
 * @property {string} updatedBy
 * @property {string} updatedAt
 * @property {enum} status - status - eg: ADDED, REMOVED
 */

/**
 * @typedef ShortClaimData
 * @property {integer} id.required
 * @property {string} name
 * @property {string} description
 * @property {boolean} isActive
 */

 /**
 * @typedef ShortClaimAddEditData
 * @property {integer} id.required
 * @property {string} name
 * @property {string} description
 * @property {boolean} isActive
 * @property {enum} status - status - eg: ADDED, REMOVED
 */

/**
 * @typedef GetClaimByUsername
 * @property {string} username
 */
