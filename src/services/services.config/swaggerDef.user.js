/**
 * @typedef UserData
 * @property {integer} id.required
 * @property {string} employeeId
 * @property {string} username
 * @property {string} fullName
 * @property {string} email
 * @property {string} contactNo
 * @property {boolean} isActive
 * @property {string} createdBy
 * @property {string} createdAt
 * @property {string} updatedBy
 * @property {string} updatedAt
 * @property {enum} status - status - eg: ADDED, REMOVED
 */

/**
 * @typedef GetUserByEmail
 * @property {string} email
 */

/**
 * @typedef getUserByEmployee
 * @property {string} employeeId
 * @property {string} employeeName
 */

/**
 * @typedef UpdateUserByEmailAndEmployee
 * @property {string} email
 * @property {string} employeeId
 * @property {string} employeeName
 */

/**
 * @typedef UserSearchParam
 * @property {Array.<SearchData>} search
 * @property {Array.<FilterData>} filter
 * @property {integer} page
 * @property {integer} limit
 * @property {Array.<Order>} order
 */

/**
 * @typedef CreateUserParam
 * @property {UserData.model} user
 * @property {Array.<CompanyData>} userParentCompanies
 * @property {Array.<RoleData>} roles
 */

/**
 * @typedef UpdateUserParam
 * @property {UserData.model} user
 * @property {Array.<CompanyData>} userParentCompanies
 * @property {Array.<RoleData>} roles
 */

/**
 * @typedef UserSearchData
 * @property {Array.<UserData>} rows
 * @property {integer} count
 * @property {integer} page
 * @property {integer} limit
 * @property {Array.<Order>} order
 */

/**
 * @typedef CreateUserData
 * @property {integer} code
 * @property {string} message
 * @property {CreateUserParam.model} payload
 */

/**
 * @typedef UpdateUserData
 * @property {integer} code
 * @property {string} message
 * @property {UpdateUserParam.model} payload
 */
