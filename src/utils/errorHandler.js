const errorResponse = require('./errorResponse');

validate = params => {
    if (!params || params.length <= 0) {
        return errorResponse.INVALID_PARAMETER;
    }

    for (let t = 0; t < params.length; t++) {
        if (params[t] == null || params[t] == undefined) {
            return errorResponse.INVALID_PARAMETER;
        }
    }

    return null;
}

module.exports = {
    ...errorResponse,
    validate
};
