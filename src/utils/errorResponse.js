module.exports = {
    TENANT_NOT_FOUND: {
        status: 400,
        code: 'TENANT_NOT_FOUND',
        message: 'Tenant does not exist'
    },
    TAG_NOT_FOUND: {
        status: 400,
        code: 'TAG_NOT_FOUND',
        message: 'Tag does not exist'
    },
    USER_NOT_FOUND: {
        status: 404,
        code: 'USER_NOT_FOUND',
        message: 'User does not exist'
    },
    USER_WAS_EXISTED: {
        status: 400,
        code: 'USER_WAS_EXISTED',
        message: 'User was existed'
    },
    USER_NOT_EXISTS: {
        status: 400,
        code: 'USER_NOT_EXISTS',
        message: 'User not exists'
    },
    UPDATE_FAILED: {
        status: 400,
        code: 'UPDATE_FAILED',
        message: 'Failed to update record'
    },
    ROLE_WAS_EXISTED: {
        status: 400,
        code: 'ROLE_WAS_EXISTED',
        message: 'Role was existed'
    },
    ROLE_NOT_EXISTED: {
        status: 400,
        code: 'ROLE_NOT_EXISTED',
        message: 'Role not existed'
    },
    CREATE_FAILED: {
        status: 400,
        code: 'CREATE_FAILED',
        message: 'Failed to create record'
    },
    INVALID_PARAMETER: {
        status: 400,
        code: 'INVALID_PARAMETER',
        message: 'Parameters given are either missing or invalid'
    },
    TOKEN_EXPIRED: {
        status: 401,
        code: 'TOKEN_EXPIRED',
        message: 'Token session has expired'
    },
    INVALID_USERINFO: {
        status: 400,
        code: 'INVALID_USERINFO',
        message: 'Userinfo from token has expired or invalid'
    },
    NOT_UNIQUE: {
        status: 400,
        code: 'NOT_UNIQUE',
        message: 'Record is not unique.'
    },
    RECORD_NOT_FOUND: {
        status: 400,
        code: 'RECORD_NOT_FOUND',
        message: 'Record with given id does not exist.'
    },
    RECORD_IS_ACTIVE: {
        status: 400,
        code: 'RECORD_IS_ACTIVE',
        message: 'Record with given id is currently active.'
    },
    NOT_FOUND: {
        status: 400,
        code: 'NOT_FOUND',
        message: 'URL does not exist'
    },
    DATABASE_ISSUE: {
        status: 400,
        code: 'DATABASE_ISSUE',
        message: 'Database issue or invalid query execution.'
    },
    INVALID_OPTION: {
        status: 400,
        code: 'INVALID_OPTION',
        message: 'Option parameter is invalid.'
    },
    DUPLICATE_EMAIL: {
        status: 400,
        code: 'DUPLICATE_EMAIL',
        message: 'Email is not unique.'
    },
    COMPANY_NOT_FOUND: {
        status: 404,
        code: 'COMPANY_NOT_FOUND',
        message: 'Company does not exist'
    }
};
