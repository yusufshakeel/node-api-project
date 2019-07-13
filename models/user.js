const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('Joi');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    last_name: {
        type: String,
        minlength: 1,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
    account_status: {
        type: String,
        default: 'CREATED',
        enum: ['CREATED', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED'],
        trim: true,
        uppercase: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    modified_at: {
        type: Date,
        default: Date.now,
    }
});

/**
 * this method will generate JWT for the user
 */
userSchema.methods.generateAuthToken = function() {
    // token valid till 3600 sec (1 hour)
    const token = jwt.sign({
        _id: this._id, 
        isUser: true, 
        exp: parseInt((new Date().getTime()/1000) + 3600) 
    }, config.get('jwtPrivateKey'));
    
    return token;
};

const User = mongoose.model('User', userSchema);

const validateUser = function(user) {
    const schema = {
        first_name: Joi.string().min(1).max(255).required(),
        last_name: Joi.string().min(1).max(255),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required(),
        account_status: Joi.string(),
    };

    return Joi.validate(user, schema);
};

const validateUserLogin = function(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(64).required(),
    };

    return Joi.validate(user, schema);
}

const validateUserUpdate = function(user) {
    const schema = {
        first_name: Joi.string().min(1).max(255),
        last_name: Joi.string().min(1).max(255),
        password: Joi.string().min(8).max(1024),
        email: Joi.string().min(5).max(255).email(),
        account_status: Joi.string(),
    };

    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;
module.exports.validateUserLogin = validateUserLogin;
module.exports.validateUserUpdate = validateUserUpdate;
