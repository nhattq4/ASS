/**
 * @typedef RoleData
 * @property {integer} id.required
 * @property {string} name
 * @property {string} description
 * @property {boolean} bypassClaim
 * @property {boolean} isActive
 * @property {string} createdBy
 * @property {string} createdAt
 * @property {string} updatedBy
 * @property {string} updatedAt
 * @property {enum} status - status - eg: ADDED, REMOVED
 */

/**
 * @typedef RoleClaimData
 * @property {integer} id.required
 * @property {string} name
 * @property {string} description
 * @property {boolean} bypassClaim
 * @property {boolean} isActive
 * @property {string} createdBy
 * @property {string} createdAt
 * @property {string} updatedBy
 * @property {string} updatedAt
 * @property {enum} status - status - eg: ADDED, REMOVED
 * @property {Array.<ShortClaimData>} claims
 */

/**
 * @typedef RoleClaimListData
 * @property {Array.<RoleClaimData>} roles
 */

/**
 * @typedef RoleSearchParam
 * @property {Array.<SearchData>} search
 * @property {Array.<FilterData>} filter
 * @property {integer} page
 * @property {integer} limit
 * @property {Array.<Order>} order
 */

/**
 * @typedef CreateRoleParam
 * @property {RoleData.model} role
 * @property {Array.<ShortClaimAddEditData>} claims
 */

/**
 * @typedef UpdateRoleParam
 * @property {RoleData.model} role
 * @property {Array.<ShortClaimAddEditData>} claims
 */

 /**
 * @typedef UpdateRoleStatusParam
 * @property {integer} id.required
 * @property {boolean} isActive
 */

/**
 * @typedef RoleSearchData
 * @property {Array.<RoleClaimData>} rows
 * @property {integer} count
 * @property {integer} page
 * @property {integer} limit
 * @property {Array.<Order>} order
 */

/**
 * @typedef CreateRoleData
 * @property {integer} code
 * @property {string} message
 * @property {CreateRoleParam.model} payload
 */

/**
 * @typedef UpdateRoleData
 * @property {integer} code
 * @property {string} message
 * @property {UpdateRoleParam.model} payload
 */

 /**
 * @typedef UpdateRoleStatusData
 * @property {integer} code
 * @property {string} message
 * @property {UpdateRoleStatusParam.model} payload
 */
