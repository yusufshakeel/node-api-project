const config = require('config');

module.exports = function() {
    /**
     * get the jwtPrivateKey
     */
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
}