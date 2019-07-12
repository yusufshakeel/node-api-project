const mongoose = require('mongoose');

/**
 * This will return the HTTP Error.
 * @param {number} code 
 * @return {object}
 */
const HTTPErrorCode = function(code) {
    let msg = '';
    switch (code) {

        case 200:
            msg = 'OK';
            break;

        case 400:
            msg = 'Bad Request';
            break;

        case 401:
            msg = 'Unauthorized';
            break;

        case 403:
            msg = 'Forbidden';
            break;

        case 404:
            msg = 'Not Found';
            break;

        case 405:
            msg = 'Method Not Allowed';
            break;

        case 500:
            msg = 'Internal Server Error';
            break;

        case 502:
            msg = 'Bad Gateway';
            break;

        case 503:
            msg = 'Service Unavailable';
            break;

        default:
            msg = 'Unknown Error';
            break;
    }

    return {
        code: code,
        message: msg
    };
}

/**
 * This function will return success response in JSON format.
 * @param {number} code 
 * @param {*} data
 * @return {object}
 */
const successResponseJSON = function(code = 200, data) {
    return {
        code: code,
        status: 'success',
        data: data
    };
};

/**
 * This function will return error response in JSON format.
 * @param {number} code 
 * @param {string} message 
 * @param {*} error 
 * @return {object}
 */
const errorResponseJSON = function(code = 400, message, error) {
    
    let HttpError = HTTPErrorCode(code);

    error = error || HttpError.message;
    message = message || HttpError.message;
    
    return {
        code: code,
        status: 'error',
        message: message,
        error: error
    };
    
};

/**
 * This will return the page, limit and offset for pagination.
 * @param {number} page 
 * @param {number} limit 
 * @param {number} maxLimit 
 * @return {object}
 */
const getPageLimitAndOffset = function(page = 1, limit = 10, maxLimit = 20) {

    if (page) page = parseInt(page);
    if (limit) limit = parseInt(limit);

    if (limit > maxLimit || limit <= 0) {
        limit = maxLimit;
    }

    if (page == 0) {
        page = 1;
    }

    return {
        page: page,
        limit: limit,
        offset: (page * limit) - limit
    };

}

/**
 * This will check the value of _id and
 * return true if it is valid; false otherwise.
 * 
 * @param {*} _id 
 * @return {object}
 */
const isValid_id = function(_id) {
    if (!mongoose.Types.ObjectId.isValid(_id)) return false;
    return true;
}

module.exports = {
    errorResponseJSON,
    HTTPErrorCode,
    successResponseJSON,
    getPageLimitAndOffset,
    isValid_id,
};