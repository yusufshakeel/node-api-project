const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const authUser = require('../middleware/authUser');
const {
    User, 
    validate,
    validateUserLogin,
    validateUserUpdate,
} = require('../models/user');
const {
    successResponseJSON, 
    errorResponseJSON,
    getPageLimitAndOffset,
    isValid_id,
} = require('../helper/helper');

/**
 * fetch self
 */
router.get('/me', authUser, async(req, res) => {

    const user = await User.findOne({ _id: req.userAuthData._id });
    res.status(200).send(successResponseJSON(
        200, 
        _.pick(user, ['_id', 'first_name', 'last_name', 'email'])
    ));

});

/**
 * fetch all users page wise
 */
router.get('/', async (req, res) => {

    const { limit, offset } = getPageLimitAndOffset(
        req.query.page,
        req.query.limit,
        20
    );

    // fetch data
    let users = await User.find().select({
        "_id": 1,
        "first_name": 1,
        "last_name": 1,
    }).sort({ "_id": 1 })
        .skip(offset)
        .limit(limit);

    // response
    res.status(200)
        .send(successResponseJSON(200, users));
});

/**
 * fetch user by id
 */
router.get('/:id', async (req, res) => {

    const id = req.params.id;

    // validate id
    if (!isValid_id(id)) return res.status(400).send(errorResponseJSON(400, 'Invalid Id.'));

    // fetch user
    const user = await User.findOne({ _id: id }).select({
        "_id": 1,
        "first_name": 1,
        "last_name": 1
    });
    if (!user) return res.status(404).send(errorResponseJSON(404, 'User not found.'));

    // response
    res.status(200).send(successResponseJSON(
        200,
        user
    ));

});

/**
 * create a new user
 * anyone can sign up
 */
router.post('/', async (req, res) => {

    // validate data
    const { error } = validate(req.body);
    if (error) return res.status(400).send(errorResponseJSON(400, error.details[0].message));

    // check if user exists with the given email
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send(errorResponseJSON(400, 'User email already registered.'));

    // insert data
    user = new User(_.pick(req.body, [
        'first_name', 
        'last_name', 
        'email', 
        'password'
    ]));

    // hash password
    user.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

    // save data in db
    user.save();

    // send response
    res.status(200)
        .send(successResponseJSON(
            200,
            _.pick(user, [
                '_id',
                'first_name',
                'last_name',
                'email'
            ])
        ));
});

/**
 * login user
 */
router.post('/login', async (req, res) => {

    // validate data
    const { error } = validateUserLogin(req.body);
    if (error) return res.status(400).send(errorResponseJSON(400, error.details[0].message));

    // check if user exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(errorResponseJSON(400, 'Invalid email or password.'));

    // valid password
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send(errorResponseJSON(400, 'Invalid email or password.'));

    // get token
    const token = user.generateAuthToken();

    res.status(200)
        .header('x-auth-token', token)
        .send(successResponseJSON(
            200,
            _.pick(user, [
                "_id",
                "first_name",
                "last_name",
                "email"
            ])
        ));
});

/**
 * update user data
 */
router.put('/', authUser, async(req, res) => {

    // validate data
    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).send(errorResponseJSON(400, error.details[0].message));

    // if updating password
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    }

    // if updating email
    if (req.body.email) {
        const email = await User.findOne({ email: req.body.email });
        if (email) return res.status(400).send(errorResponseJSON(400, 'Email not available.'));
    }

    // set modified_at date time
    req.body.modified_at = new Date().toISOString();

    // find and update
    const user = await User.findByIdAndUpdate(
        { _id: req.userAuthData._id },
        {
            $set: _.pick(req.body, ['first_name', 'last_name', 'email', 'password', 'modified_at'])
        },
        { new: true }
    );

    res.status(200).send(successResponseJSON(
        200,
        _.pick(user, ['_id', 'first_name', 'last_name', 'email'])
    ));

});

module.exports = router;