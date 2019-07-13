const jwt = require('jsonwebtoken');
const config = require('config');
const {
    errorResponseJSON,
} = require('../helper/helper');

module.exports = function(req, res, next) {

    // get token from the header
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send(errorResponseJSON(401, 'Access denied.'));

    try {
        // verify token
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.userAuthData = decoded;
        next();
    }
    catch(ex) {
        res.status(400).send(errorResponseJSON(400, 'Invalid token.'));
    }
    
}