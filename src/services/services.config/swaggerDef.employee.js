/**
 * @typedef EmployeeData
 * @property {string} id.required
 * @property {string} companyId.required
 * @property {string} employeeCode.required
 * @property {string} password
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
 * @typedef GetEmployeeByEmail
 * @property {string} email
 */

/**
 * @typedef getEmployee
 * @property {string} employeeId
 * @property {string} employeeName
 */

/**
 * @typedef UpdateEmployeeByEmail
 * @property {string} email
 * @property {string} employeeId
 * @property {string} employeeName
 */

/**
 * @typedef EmployeeSearchParam
 * @property {Array.<SearchData>} search
 * @property {Array.<FilterData>} filter
 * @property {integer} page
 * @property {integer} limit
 * @property {Array.<Order>} order
 */

/**
 * @typedef CreateEmployeeParam
 * @property {EmployeeData.model} employee
 * @property {Array.<RoleData>} roles
 */

/**
 * @typedef UpdateEmployeeParam
 * @property {EmployeeData.model} employee
 * @property {Array.<CompanyData>} employeeParentCompanies
 * @property {Array.<RoleData>} roles
 */

/**
 * @typedef EmployeeSearchData
 * @property {Array.<EmployeeData>} rows
 * @property {integer} count
 * @property {integer} page
 * @property {integer} limit
 * @property {Array.<Order>} order
 */

/**
 * @typedef CreateEmployeeData
 * @property {integer} code
 * @property {string} message
 * @property {CreateUserParam.model} payload
 */

/**
 * @typedef UpdateEmployeeData
 * @property {integer} code
 * @property {string} message
 * @property {UpdateUserParam.model} payload
 */
